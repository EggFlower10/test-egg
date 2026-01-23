// app/extend/helper.js
/**
 * 首字母小写
 * @param {string} str - 要处理的字符串
 * @returns {string} 处理后的字符串
 */
exports.lowercaseFirst = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 * 首字母大写
 * @param {string} str - 要处理的字符串
 * @returns {string} 处理后的字符串
 */
exports.uppercaseFirst = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 文本截取（超出长度显示省略号）
 * @param {string} str - 要截取的文本
 * @param {number} length - 保留长度
 * @returns {string} 截取后的文本
 */
exports.truncateText = (str, length = 10) => {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + '...';
};