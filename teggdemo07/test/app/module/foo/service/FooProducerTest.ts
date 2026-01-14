
import mm from '@eggjs/mock';
import { app, assert } from '@eggjs/mock/bootstrap';
import { test } from 'vitest';

import { FooProducer } from '../../../../../app/module/foo/service/FooProducer.ts';
import { FooHandler } from '../../../../../app/module/foo/event/FooHandler.ts';

test('should hello() work', async () => {
    const fooProducer = await app.getEggObject(FooProducer);
    let msg: string | undefined;

    // Mock FooHandler的handle方法，记录参数
    mm(FooHandler.prototype, 'handle', (m: string) => {
        msg = m;
    });

    // 获取事件等待器
    const eventWaiter = await app.getEventWaiter();
    const helloEvent = eventWaiter.await('hello');

    // 触发事件
    fooProducer.triggerHello('01');

    // 等待事件执行完成
    await helloEvent;

    // 断言消息正确
    assert.equal(msg, '01');
});
