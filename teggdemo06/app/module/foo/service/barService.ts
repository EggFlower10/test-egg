import { SingletonProto, AccessLevel } from 'egg';

@SingletonProto({
    accessLevel: AccessLevel.PUBLIC,
})
export class BarService {
    /**
     * 模拟业务逻辑：比如数据同步、发送通知
     * @param id 可选参数，模拟业务ID
     */
    async call(id: number = 1) {
        // 模拟异步操作
        await new Promise(resolve => setTimeout(resolve, 150));

        // 返回结果
        return {
            code: 0,
            data: `bar处理完成，ID：${id}`,
            time: new Date().toISOString(),
        };
    }
}