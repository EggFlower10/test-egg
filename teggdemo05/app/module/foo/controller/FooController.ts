import { HTTPController, HTTPMethod, HTTPMethodEnum, Inject } from 'egg';
import { FooService } from '../service/Hello.ts';

@HTTPController({ path: '/aop' })
export default class FooController {
    @Inject()
    fooService: FooService;

    @HTTPMethod({
        method: HTTPMethodEnum.GET,
        path: '/test',
    })
    async testAop() {
        // 调用带有 AOP 拦截的方法
        const result = await this.fooService.hello();

        return {
            success: true,
            message: 'AOP test completed. Check server logs for: aop,Y,<time>ms',
            result: result
        };
    }

}