'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getUserInfo() {
    return {
        name: '章三',
        age: 13
    }
  }
}

module.exports = UserService;
