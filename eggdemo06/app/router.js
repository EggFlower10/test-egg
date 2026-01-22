/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/session/set', controller.session.setUser);   // 设置Session
  router.get('/session/get', controller.session.getUser);   // 获取Session
  router.get('/session/clear', controller.session.clearUser); // 删除Session
};
