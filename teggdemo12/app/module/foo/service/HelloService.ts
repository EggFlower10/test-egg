import { SingletonProto, AccessLevel, Inject, type Logger } from 'egg';
import {
  LifecyclePostConstruct,
  LifecyclePreInject,
  LifecyclePostInject,
  LifecycleInit,
  LifecyclePreDestroy,
  LifecycleDestroy,
} from 'egg';
@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
export class HelloService {
  // 注入一个 logger
  @Inject()
  private logger: Logger;
  @LifecyclePostConstruct()
  protected async _postConstruct() {
    console.log('✅ 对象构造完成');
  }

  @LifecyclePreInject()
  protected async _preInject() {
    console.log('🔗 依赖将要注入');
  }

  @LifecyclePostInject()
  protected async _postInject() {
    console.log('🔌 依赖注入完成');
  }

  @LifecycleInit()
  protected async _init() {
    console.log('🔄 执行一些异步的初始化过程');
  }

  @LifecyclePreDestroy()
  protected async _preDestroy() {
    console.log('⚠️  对象将要释放了');
  }

  @LifecycleDestroy()
  protected async _destroy() {
    console.log('🗑️  执行一些释放资源的操作');
  }

  // 封装业务
  async hello(userId: string): Promise<string> {
    const result = { userId, handledBy: 'foo module' };
    this.logger.info('[hello] get result: %j', result);
    return `hello, ${result.userId}`;
  }
}
