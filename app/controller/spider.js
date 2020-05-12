'use strict';

const Controller = require('egg').Controller;

class SpiderController extends Controller {
  async index() {
    var list = await this.service.spider.getNewsList();
    await this.ctx.render('spider', {
      list,
    });
  }
  async content() {
    var aid = this.ctx.query.aid;
    var list = await this.service.spider.getSpiderContent(aid);
    await this.ctx.render('spidercontent', {list:list[0]});
  }
}

module.exports = SpiderController;
