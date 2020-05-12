// 可以在扩展里面引用第三方模块
// npm install silly-datetime --save
// 引入模块
var sd = require('silly-datetime');
module.exports = {
    // this是helper对象，在其中可以调用其它helper方法
    // this.ctx => context对象
    // this.app => application对象
    formateTime(param) {
        // 格式化日期
        return sd.format(new Date(param * 1000), 'YYYY-MM-DD HH:mm');
    },
    getHelperData() {
        return '来自于helper'
    }
}