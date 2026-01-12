// app/module/bar/controller/home.ts
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, type Logger } from 'egg';
// 导入模块内的两类demo服务
import { ContextDemo, SingletonDemo } from '../service/use-proto-demo.ts';

@HTTPController({ path: '/' })
export class HomeController {
  @Inject() //@Inject 注解来实现依赖注入
  private logger: Logger;

  // 注入ContextProto示例服务
  @Inject()
  private contextDemo: ContextDemo;

  // 注入SingletonProto示例服务
  @Inject()
  private singletonDemo: SingletonDemo;

  @HTTPMethod({ method: HTTPMethodEnum.GET, path: '/' })
  async index() {
    this.logger.info('同时运行ContextProto和SingletonProto示例');
    // 调用两类服务的方法
    const contextResult = await this.contextDemo.sayContext();
    const singletonResult = await this.singletonDemo.saySingleton();
    // 拼接结果返回（用换行/分隔符区分）
    return `
      <div style="font-size: 16px; line-height: 2;">
        <p>${contextResult}</p>
        <p>${singletonResult}</p>
      </div>
    `;
  }

}

