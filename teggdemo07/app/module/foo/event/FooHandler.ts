import { EggLogger, Event, Inject } from 'egg';
// ts 会检查事件是否在 Events 中存在


@Event('hello')
@Event('hi')
export class FooHandler {
    @Inject()
    private logger: EggLogger;

    // ts 会检查函数签名是否与 Events 中对应的事件相同
    async handle(msg: string): Promise<void> {
        this.logger.info(`收到事件参数：${msg}`);
        console.log('msg: ', msg);
    }
}