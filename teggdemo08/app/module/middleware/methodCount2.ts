import type { Context, Next } from 'egg';

export default async function methodCount2(ctx: Context, next: Next) {
    console.log('【进】methodCount2 中间件执行', ctx);
    await next();
    console.log('【出】methodCount2 中间件执行', ctx);
}