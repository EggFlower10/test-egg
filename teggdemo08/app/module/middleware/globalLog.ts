import type { Context, Next } from 'egg';

// 全局日志中间件
export default async function globalLog(ctx: Context, next: Next) {
    console.log('【进】globalLog 中间件执行', ctx);
    await next(); // 执行后续中间件/控制器方法
    console.log('【出】globalLog 中间件执行', ctx);
}