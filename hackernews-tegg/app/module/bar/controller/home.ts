import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, type Logger } from 'egg';

@HTTPController({
  path: '/',
})
export class HomeController {
  @Inject()
  private logger: Logger;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async index() {
    this.logger.info('hello egg logger');
    return '你好，蛋花的egg';
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
