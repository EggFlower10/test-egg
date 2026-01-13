// 示例：Tegg模块下的控制器（app/module/foo/controller/TaskController.ts）
import { HTTPController, HTTPMethod, HTTPMethodEnum, Inject, HTTPQuery } from 'egg';
import { TriggerService } from '../service/TriggerService.ts';

@HTTPController({ path: '/trigger' })
export class TaskController {
    // 注入TriggerService
    @Inject()
    private triggerService: TriggerService;

    @HTTPMethod({
        method: HTTPMethodEnum.GET,
        path: '/test',
    })
    async triggerTask(@HTTPQuery() taskId: string) {
        // 调用TriggerService的trigger方法触发异步任务
        const result = await this.triggerService.trigger(taskId || '默认任务ID');
        return result
    }
}