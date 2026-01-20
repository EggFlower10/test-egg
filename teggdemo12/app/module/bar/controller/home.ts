import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, type Logger } from 'egg';
import { CustomUserInfo } from '../../foo/proto/CustomUserInfo.ts';
import { ContextTimer } from '../../foo/proto/ContextTimer.ts';

@HTTPController({
  path: '/',
})
export class HomeController {
  @Inject()
  private logger: Logger;

  // @Inject()
  // private ctx: Context; // 注入 ctx 对象

  @Inject()
  private customUserInfo: CustomUserInfo;

  @Inject()
  private contextTimer: ContextTimer;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async index() {
    this.logger.info('hello egg logger');

    // 触发 CustomUserInfo 实例化
    // const customUserInfo = await this.ctx.requestContext.getAsync('customUserInfo');
    const contextResult = await this.customUserInfo;
    console.log('用户信息:', contextResult.mobile);

    // 触发 ContextTimer 实例化
    // await this.requestContext.getAsync('contextTimer');
    await this.contextTimer

    return 'hello egg';
  }
}
