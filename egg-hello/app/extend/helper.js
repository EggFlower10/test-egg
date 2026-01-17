// app/extend/helper.js
// 扩展 Helper 类，添加格式化时间的方法
const dayjs = require('dayjs');
module.exports = {
    formatTime(date) {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    },
};