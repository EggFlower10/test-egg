// app/schedule/pull_refresh.js
exports.schedule = {
    interval: '10s',
    type: 'worker', // 只在一个 worker 中运行
};

exports.task = async (ctx) => {
    const needRefresh = await ctx.service.source.checkUpdate();
    if (!needRefresh) return;

    // notify all workers to update memory cache from `file`
    ctx.app.messenger.sendToApp('refresh', 'pull');
};