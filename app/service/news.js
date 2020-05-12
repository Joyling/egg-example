'use strict';
// - this.ctx
// - this.app
// - this.service
// - this.config
// - this.logger
const Service = require('egg').Service;

class NewsService extends Service {
  async getNewsList() {
    console.log(this.config)
    var list = ['111', '222', '333', '444']
    return list
  }
}

module.exports = NewsService;
