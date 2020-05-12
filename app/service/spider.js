'use strict';

const Service = require('egg').Service;

class SpiderService extends Service {
  async getNewsList() {
    // 通过抓取接口获取数据
    // curl的方法可以获取远程的数据
    var url = this.config.api + 'appapi.php?a=getPortalList&catid=20&page=1'
    var resp = await this.ctx.curl(url);
    // console.log(resp.data)// 返回的是<Buffer
    var data = JSON.parse(resp.data); // 把buffer类型转换为对象
    return data.result;
  }
  async getSpiderContent(aid) {
    var url = this.config.api + `appapi.php?a=getPortalArticle&aid=${aid}`
    var resp = await this.ctx.curl(url);
    // console.log(resp.data)// 返回的是<Buffer
    var data = JSON.parse(resp.data); // 把buffer类型转换为对象
    return data.result;
  }
}

module.exports = SpiderService;
