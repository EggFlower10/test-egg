// 这行必须有，否则下面的 declare 会把原始的 module 覆盖
import 'egg';

declare module 'egg' {
    interface Events {
        // 自定义事件
        // property 即为事件名称
        // property 的值会约束消费的函数申明
        hello: (message: string) => Promise<void>;

        hi: (message: string) => Promise<void>;
    }
}