// app/controller/home.js
const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 日期格式化函数
    const formatDate = (date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      const h = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      const s = String(date.getSeconds()).padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${min}:${s}`;
    };

    // 准备模板数据（新增长文本用于测试Helper）
    const data = {
      name: 'Egg.js',
      longText: '这是一段用于测试Helper文本截取功能的长文本',
      now: formatDate(new Date()),
    };
    // 渲染模板
    await ctx.render('home', data);
  }
}

module.exports = HomeController;