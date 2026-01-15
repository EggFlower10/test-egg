import type { Context, Next } from 'egg';

export default async function methodCount3(ctx: Context, next: Next) {
    console.log('【进】methodCount3 中间件执行', ctx);
    await next();
    console.log('【出】methodCount3 中间件执行', ctx);
}