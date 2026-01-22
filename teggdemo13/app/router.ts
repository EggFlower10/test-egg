// ✅ 正确写法
import type { Application } from 'egg';

export default (app: Application) => {
    // 解构必须从 app 中获取 router 和 controller
    const { router, controller } = app;

    // 确保 controller.npm 存在（对应 controller/npm.ts 文件）
    if (controller.npm) {
        router.get('/npm/get', controller.npm.get);
        router.post('/npm/post', controller.npm.post);
        router.put('/npm/put', controller.npm.put);
        router.delete('/npm/delete', controller.npm.del);
    }
};