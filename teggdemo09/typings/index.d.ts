// typings/index.d.ts
import 'egg';

declare module 'egg' {
    interface Application {
        queue: Queue; // 新增 queue 属性
        cacheData: { key: string; value: string }; // 新增 cacheData 属性
    }
}