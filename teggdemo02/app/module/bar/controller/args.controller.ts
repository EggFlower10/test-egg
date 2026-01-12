// app/controller/args.controller.ts
import {
    HTTPController,
    HTTPMethod,
    HTTPMethodEnum,
    HTTPQuery,
    HTTPQueries,
    HTTPParam,
    HTTPBody,
    HTTPCookies,
    Cookies,
    HTTPRequest,
} from 'egg';

// 定义JSON请求体的类型接口
export interface BodyData {
    foo: string; // 必选字段
    bar?: number; // 可选字段
}

// 装饰器声明这是一个HTTP控制器
@HTTPController({ path: '/api', })
export default class ArgsController {
    // 场景1：解析JSON格式请求体（Content-Type: application/json）
    @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/json-body' })
    async getJsonBody(
        @HTTPBody() body: BodyData // 用BodyData约束请求体结构
    ) {
        return {
            message: 'JSON请求体解析成功',
            body: body,
            fooType: typeof body.foo,
            barType: typeof body.bar
        };
    }

    // 场景2：解析文本格式请求体（Content-Type: text/plain）
    @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/text-body' })
    async getTextBody(
        @HTTPBody() body: string // 文本请求体是string类型
    ) {
        return {
            message: '文本请求体解析成功',
            body: body,
            bodyLength: body.length
        };
    }

    // 场景3：解析表单格式请求体（Content-Type: application/x-www-form-urlencoded）
    @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/form-body' })
    async getFormBody(
        @HTTPBody() body: BodyData // 表单会解析为对象，用BodyData约束
    ) {
        return {
            message: '表单请求体解析成功',
            body: body
        };
    }
    // 定义接口：GET请求，路径/api/query
    @HTTPMethod({ method: HTTPMethodEnum.GET, path: '/query' })
    async getQueries(
        // 取query中user参数的第一个值（string类型）
        @HTTPQuery() user?: string,
        // 取query中user参数的所有值（string[]数组类型）
        @HTTPQueries({ name: 'user' }) users?: string[],
        // 额外加一个分页参数示例（单个值）
        @HTTPQuery() page?: string
    ) {
        // 组装返回数据，方便测试查看结果
        return {
            message: 'query参数获取成功',
            singleUser: user,       // 单个user值
            multiUsers: users,      // 多个user值
            page: page || '默认1',  // 分页参数（有默认值）
        };
    }
    // 场景1：简单路径参数（/api/:id）
    @HTTPMethod({ method: HTTPMethodEnum.GET, path: '/:id' })
    async getParamId(
        // 变量名id对应路径中的:id，自动匹配
        @HTTPParam() id: string
    ) {
        return {
            message: '简单路径参数获取成功',
            pathParamId: id // 比如访问/2088000，这里id就是'2088000'
        };
    }

    // 匹配 path 中第一个正则表达式匹配的字符
    @HTTPMethod({ method: HTTPMethodEnum.GET, path: '/foo/(.*)' })
    async getParamBar(
        @HTTPParam({ name: '0' }) bar: string
    ) {
        return {
            message: '正则路径参数获取成功',
            pathParamBar: bar // 比如访问/foo/abc123，这里bar就是'abc123'
        };
    }

    @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/cookies' })
    async getCookies(
        @HTTPCookies() cookies: Cookies // 获取Cookies对象
    ) {
        // 获取key为"test"的Cookie值（signed: false表示不验证签名）
        const testCookie = cookies.get('test', { signed: false });

        return {
            success: true,
            testCookie: testCookie, // 返回获取到的Cookie值
            message: "Cookies获取成功"
        };
    }

    @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/request' })
    async getRequest(
        @HTTPRequest() request: Request // 获取完整请求对象
    ) {
        // 1. 获取指定请求头
        const headerData = request.headers.get('x-header-key');
        // 2. 获取请求URL
        const url = request.url;
        // 3. 获取请求体（文本格式）
        const bodyText = await request.text();

        return {
            success: true,
            headerData: headerData,
            requestUrl: url,
            requestBody: bodyText
        };
    }

    @HTTPMethod({ method: HTTPMethodEnum.POST, path: '/request2' })
    async getRequest2(
        @HTTPBody() body: object, // 已消费请求体
        @HTTPRequest() request: Request
    ) {
        // 可正常获取Headers、URL（不受HTTPBody影响）
        const headerData = request.headers.get('x-header-key');
        const url = request.url;

        return {
            success: true,
            headerData: headerData,
            requestUrl: url,
            requestBodyFromHTTPBody: body
        };
    }

    @HTTPMethod({ method: HTTPMethodEnum.GET, path: '/api/custom-response' })
    async customResponse() {
        // Response 为全局对象，无需 import
        return new Response('<h1>Hello World</h1>', {
            status: 200,
            headers: {
                'transfer-encoding': 'chunked',
                'content-type': 'text/html; charset=utf-8',
                'x-header-key': 'from-function',
            },
        });
    }
}