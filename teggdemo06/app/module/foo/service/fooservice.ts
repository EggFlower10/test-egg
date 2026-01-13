import { SingletonProto, AccessLevel } from 'egg';

// @SingletonProto 是核心：让框架注册该Service为可注入对象
// accessLevel: AccessLevel.PUBLIC 表示允许其他模块注入
@SingletonProto({
    accessLevel: AccessLevel.PUBLIC,
})
export class FooService {
    /**
     * 模拟业务逻辑：比如查询数据、调用接口
     * @param msg 可选参数，用于测试传参
     */
    async call(msg: string = '默认信息') {
        // 模拟异步操作（比如数据库查询、接口请求）
        await new Promise(resolve => setTimeout(resolve, 100));

        // 返回结果（可选，方便上层判断执行结果）
        return {
            code: 0,
            data: `foo处理完成：${msg}`,
            time: new Date().toISOString(),
        };
    }
}