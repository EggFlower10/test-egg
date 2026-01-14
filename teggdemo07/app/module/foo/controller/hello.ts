import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPContext, type Logger, type Context } from 'egg';
import { FooProducer } from '../service/FooProducer.ts';

@HTTPController({
    path: '/event',
})
export class HelloController {
    @Inject()
    private logger: Logger;

    @Inject() // 注入FooProducer服务
    private fooProducer: FooProducer; // 实际项目可写类型：private fooProducer: FooProducer;

    @HTTPMethod({
        method: HTTPMethodEnum.GET,
        path: '/test',
    })
    async index(@HTTPContext() ctx: Context) {
        this.logger.info('hello egg logger');
        this.fooProducer.triggerHello('测试消息01'); // 触发事件
        // ctx.body = '已触发hello事件，可查看终端日志';
        this.fooProducer.triggerHi('测试消息02'); // 触发事件
        ctx.body = '已触发hello事件，可查看终端日志';
        this.logger.info(ctx);

    }
}
