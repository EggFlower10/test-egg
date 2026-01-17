// app/schedule/clear_log.js
'use strict';

// 定时任务配置
exports.schedule = {
    type: 'worker', // 只在一个 worker 进程执行
    cron: '0 */1 * * * *', // 每分钟执行一次（测试用，生产可调整）
    // interval: '1m', // 等价于上面的 cron，二选一
    immediate: true, // 应用启动后立即执行一次
};

// 定时任务执行逻辑
exports.task = async (ctx) => {
    const { app } = ctx;
    // 模拟清理日志的逻辑
    app.coreLogger.info('[定时任务] 执行日志清理，当前时间：', new Date());
    // 实际场景可写：删除过期日志文件、同步数据等
};