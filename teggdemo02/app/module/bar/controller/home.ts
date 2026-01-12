import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPContext, Context, type Logger } from 'egg';

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
    return 'hello egg';
  }

  // @HTTPMethod({ method: HTTPMethodEnum.GET, path: '/custom-response' })
  // async customResponse() {
  //   // Response 为全局对象，无需 import
  //   return new Response('<h1>Hello World</h1>', {
  //     status: 200,
  //     headers: {
  //       'transfer-encoding': 'chunked',
  //       'content-type': 'text/html; charset=utf-8',
  //       'x-header-key': 'from-function',
  //     },
  //   });
  // }

  // 自定义HTML响应（兼容所有TEGG版本）
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/api/custom-response'
  })
  async customResponse(@HTTPContext() ctx: Context) {
    // 1. 设置响应类型为HTML（关键）
    ctx.response.type = 'text/html; charset=utf-8';
    // 2. 设置响应状态码
    ctx.response.status = 200;
    // 3. 设置自定义响应头（可选）
    ctx.response.set('x-custom-header', 'tegg-response-demo');
    // 4. 直接返回HTML字符串（TEGG会识别并输出）
    return '<h1 style="color: blue;">Hello TEGG 自定义响应</h1>';
  }

  // 自定义纯文本响应（对比示例）
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/api/text-response'
  })
  async textResponse(@HTTPContext() ctx: Context) {
    ctx.response.type = 'text/plain; charset=utf-8';
    ctx.response.status = 200;
    return '这是纯文本响应';
  }
}

