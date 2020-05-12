'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 调用extend里面扩展的application
    // console.log(this.app.foo())
    await ctx.render('index')
    // 调用extend里面扩展的context
    // console.log(this.ctx.getHost())
    console.log(this.ctx.helper.getHelperData())
  }
}

module.exports = HomeController;
