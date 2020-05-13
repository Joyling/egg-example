'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/spider', controller.spider.index);
  router.get('/spidercontent', controller.spider.content);
  router.post('home/add', controller.home.add)
};
