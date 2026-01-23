// app/schedule/force_refresh.js
exports.schedule = {
    interval: '10m',
    type: 'all', // 在所有的 workers 中运行
};

exports.task = async (ctx) => {
    await ctx.service.source.update();
    ctx.app.lastUpdateBy = 'force';
};