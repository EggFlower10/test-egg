// app.js
module.exports = (app) => {
    app.messenger.on('refresh', (by) => {
        app.logger.info('start update by %s', by);
        // 创建一个匿名 context 来访问 service
        const ctx = app.createAnonymousContext();
        ctx.runInBackground(async () => {
            await ctx.service.source.update();
            app.lastUpdateBy = by;
        });
    });
};