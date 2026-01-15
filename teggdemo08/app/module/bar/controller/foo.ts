// 从 egg 导入所需装饰器、类型
import {
    Inject,
    HTTPController,
    HTTPMethod,
    HTTPMethodEnum,
    type Logger,
    Middleware // 导入中间件装饰器
} from 'egg';

// 导入中间件（注意相对路径：从当前 controller 目录向上找到 app/middleware）
import globalLog from '../../middleware/globalLog.ts';
import methodCount from '../../middleware/methodCount.ts';
import methodCount1 from '../../middleware/methodCOunt1.ts';
import methodCount2 from '../../middleware/methodCount2.ts';
import methodCount3 from '../../middleware/methodCount3.ts';

// 1. @HTTPController 定义控制器根路由
// 2. @Middleware 类装饰器：该控制器所有方法都应用 globalLog 中间件
@HTTPController({
    path: '/foo' // 根路径：最终接口路径会基于这个拼接
})
@Middleware(globalLog)
export class FooController {
    // 注入 logger（保留你现有代码的注入逻辑）
    @Inject()
    private logger: Logger;

    // @HTTPMethod 定义 GET 路由：路径拼接为 /foo/hello
    // @Middleware 方法装饰器：仅该方法应用 methodCount 中间件
    @HTTPMethod({
        method: HTTPMethodEnum.GET,
        path: '/hello'
    })
    @Middleware(methodCount)
    async hello() {
        this.logger.info('【执行】hello 控制器方法');
        return 'Hello, Egg Middleware!';
    }

    // @HTTPMethod 定义 GET 路由：/foo/multiple
    // 多个 @Middleware 装饰器：执行顺序为“装饰器写在后面的先执行”
    @HTTPMethod({
        method: HTTPMethodEnum.GET,
        path: '/multiple'
    })
    @Middleware(methodCount1)
    @Middleware(methodCount2)
    @Middleware(methodCount3)
    async multiple() {
        this.logger.info('【执行】multiple 控制器方法');
        return 'Multiple Middlewares!';
    }

    // @HTTPMethod 定义 GET 路由：/foo/bye
    // 仅应用类级的 globalLog 中间件
    @HTTPMethod({
        method: HTTPMethodEnum.GET,
        path: '/bye'
    })
    async bye() {
        this.logger.info('【执行】bye 控制器方法');
        return 'Bye!';
    }
}