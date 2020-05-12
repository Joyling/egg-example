'use strict';

const Controller = require('egg').Controller;

class NewController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = '新闻页面';
    var msg = '后台ejs'
    // var list = ['111', '222', '333']
    var list = await this.service.news.getNewsList();
    var user = await this.service.user.getUserInfo();
    await ctx.render('news', {
      msg,
      list,
      user
    })
  }
  async content() {
      const { ctx } = this;
      ctx.body = '新闻内容';
      var query = ctx.query;
      console.log(query)
  }
  async newslist() {
    const { ctx } = this;
    var params = ctx.params;
    console.log(params);
    ctx.body = '新闻列表';
  }
}

module.exports = NewController;
