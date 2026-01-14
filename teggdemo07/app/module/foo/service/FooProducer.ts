import { SingletonProto, Inject, EventBus } from 'egg';

@SingletonProto()
export class FooProducer {
    @Inject()
    private eventBus: EventBus;

    triggerHello(message: string) {
        this.eventBus.emit('hello', message);
    }

    triggerHi(message: string) {
        // 触发hi事件，传递字符串参数（类型匹配types/egg.d.ts）
        this.eventBus.emit('hi', message);
        console.log('已触发hi事件，参数：', message);
    }
}