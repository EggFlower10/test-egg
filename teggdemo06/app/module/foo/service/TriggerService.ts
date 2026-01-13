import { BackgroundTaskHelper, Inject, SingletonProto, AccessLevel, Logger } from 'egg'; // 导入Logger
import { FooService } from './fooservice.ts';
import { BarService } from './barService.ts';

@SingletonProto({
    accessLevel: AccessLevel.PUBLIC,
})
export class TriggerService {
    @Inject()
    private backgroundTaskHelper: BackgroundTaskHelper;

    @Inject()
    private fooService: FooService;

    @Inject()
    private barService: BarService;

    // 手动注入Logger
    @Inject()
    private logger: Logger;

    async trigger(taskId: string) {
        this.logger.info(`[TriggerService] 准备触发异步任务，taskId=${taskId}`); // 此时可正常使用
        this.backgroundTaskHelper.timeout = 10000;

        this.backgroundTaskHelper.run(async () => {
            try {
                await this.fooService.call(`任务-${taskId}的foo参数`);
                await this.barService.call(Number(taskId));
                this.logger.info(`[TriggerService] 异步任务执行完成，taskId=${taskId}`);
            } catch (error) {
                this.logger.error(`[TriggerService] 异步任务执行失败，taskId=${taskId}`, error);
            }
        });
    }
}