// app.js
module.exports = (app) => {
    // 调用扩展的方法
    console.log(app.foo('hello from app.js'));
    // 访问扩展的属性
    console.log('app.bar 的值：', app.bar);
};