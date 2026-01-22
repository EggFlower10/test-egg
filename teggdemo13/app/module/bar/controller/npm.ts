// app/module/bar/controller/npm.ts
import { HTTPController, HTTPMethod, HTTPMethodEnum, Context, HTTPContext } from 'egg';

// 基础路径：/npm
@HTTPController({ path: '/npm' })
export class NpmController {

  // GET /npm/get
  @HTTPMethod({ method: HTTPMethodEnum.GET, path: '/get' })
  async get(@HTTPContext() ctx: Context) {
    const result = await ctx.httpClient.request('https://httpbin.org/get?foo=bar');
    return result.data;
  }

  // POST /npm/post
  @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/post' })
  async post(@HTTPContext() ctx: Context) {
    const result = await ctx.httpClient.request('https://httpbin.org/post', {
      method: 'POST',
      contentType: 'json',
      data: { hello: 'world', now: Date.now() },
      dataType: 'json',
    });
    return result.data;
  }

  // PUT /npm/put
  @HTTPMethod({ method: HTTPMethodEnum.PUT, path: '/put' })
  async put(@HTTPContext() ctx: Context) {
    const result = await ctx.httpClient.request('https://httpbin.org/put', {
      method: 'PUT',
      contentType: 'json',
      data: { update: 'foo bar' },
      dataType: 'json',
    });
    return result.data;
  }

  // DELETE /npm/delete
  @HTTPMethod({ method: HTTPMethodEnum.DELETE, path: '/delete' })
  async del(@HTTPContext() ctx: Context) {
    const result = await ctx.httpClient.request('https://httpbin.org/delete', {
      method: 'DELETE',
      dataType: 'json',
    });
    return result.data;
  }
}