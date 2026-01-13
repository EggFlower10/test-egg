import { HTTPController, HTTPMethod, HTTPMethodEnum, HTTPBody } from 'egg';

// 手动定义入参类型（替代Ajv Schema生成的Type）
interface SyncPackageTask {
    name: string;
    job: string;
}

@HTTPController({ path: '/ajv' })
export default class AjvController {
    @HTTPMethod({
        method
            : HTTPMethodEnum.POST,
        path
            : '/sync-package-task',
    })
    async createsSyncPackageTask(@HTTPBody() task: SyncPackageTask) {
        // 手动验证规则
        const errors: string[] = [];

        // 验证 name
        if (!task.name || task.name.trim().length < 1) {
            errors
                .push('name must have at least 1 character');
        }
        if (task.name && task.name.length > 200) {
            errors
                .push('name must not exceed 200 characters');
        }

        // 验证 job
        if (!task.job || typeof task.job !== 'string') {
            errors
                .push('job is required and must be a string');
        }

        // 返回验证结果
        if (errors.length > 0) {
            return { success: false, errors };
        }
        // 验证通过：执行业务逻辑
        return { success: true, data: task };
    }
}