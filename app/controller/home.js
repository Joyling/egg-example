'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.csrf 用户访问这个页面的时候生成一个密钥
    await this.ctx.render('index')
    // const { ctx } = this;
    // // 调用extend里面扩展的application
    // // console.log(this.app.foo())
    // await ctx.render('index')
    // // 调用extend里面扩展的context
    // // console.log(this.ctx.getHost())
    // console.log(this.ctx.helper.getHelperData())
  }
  // 接收post提交的数据
  async add() {
    console.log(this.ctx.request.body);
  }
}

module.exports = HomeController;
