// app/controller/home.js
const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // 1. 调用各扩展功能
    const foo = ctx.app.foo('from controller');
    const bar = ctx.app.bar;
    ctx.set('x-bar', 'custom-bar-value');
    const barValueAfterSet = ctx.bar;
    const fooRequest = ctx.request.foo;

    // 2. 设置 Response 扩展的 foo 属性
    // ctx.response.foo = '我是自定义响应头值';
    const responseFoo = ctx.response.foo; // 补充定义变量

    // 1. 调用格式化时间 Helper
    const nowTime = ctx.helper.formatTime(); // 不传参数默认当前时间
    const customTime = ctx.helper.formatTime('2026-01-16', 'YYYY/MM/DD');

    // 2. 调用拼接URL参数 Helper
    const url1 = ctx.helper.pathFor('/user', { id: 100, name: '张三' });
    const url2 = ctx.helper.pathFor('/home'); // 无参数

    // 3. 调用验证手机号 Helper
    const phone1 = '13800138000';
    const phone2 = '12345678901';
    const isPhone1Valid = ctx.helper.isMobile(phone1);
    const isPhone2Valid = ctx.helper.isMobile(phone2);

    // ✅ 统一用 HTML 响应（避免先设置 JSON 再覆盖）
    ctx.body = `
      <h1>Egg.js 扩展验证</h1>
      <p>1. app.foo 调用结果：${foo}</p>
      <p>2. app.bar 值：${bar}</p>
      <p>3. 设置请求头后 ctx.bar 值（缓存验证）：${barValueAfterSet}</p>
      <p>4. ctx.request.foo 值：${fooRequest}</p>
      <p>5. ctx.response.foo 值：${responseFoo}</p>

      <h1>Helper 函数验证</h1>
      <p>1. 格式化当前时间：${nowTime}</p>
      <p>2. 格式化自定义时间：${customTime}</p>
      <hr>
      <p>3. 拼接URL1：${url1}</p>
      <p>4. 拼接URL2：${url2}</p>
      <hr>
      <p>5. 手机号 ${phone1} 是否有效：${isPhone1Valid ? '是' : '否'}</p>
      <p>6. 手机号 ${phone2} 是否有效：${isPhone2Valid ? '是' : '否'}</p>
    `;
  }
}

module.exports = HomeController;