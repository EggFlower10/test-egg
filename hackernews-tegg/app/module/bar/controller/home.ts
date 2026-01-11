
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, type Logger } from 'egg';
// 引入biz下的HelloService（@SingletonProto单例）
import { HelloService } from '../../biz/HelloService.ts';

@HTTPController({
  path: '/',
})
export class HomeController {
  @Inject()
  private logger: Logger;

  @Inject()
  private helloService: HelloService;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async index() {
    this.logger.info('hello egg logger');
    const helloStr = await this.helloService.hello();
    return `你好，蛋花的egg|单例服务返回: ${helloStr} `;
  }

  @HTTPMethod({
    method: HTTPMethodEnum.GET, // 请求方法：GET
    path: '/news', // 方法对应的路由路径
  })
  async news() {
    this.logger.info('hello egg logger');
    return '你好，egg';
  }

}


