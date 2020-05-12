# MVC框架
- view: 视图模版，页面的展示
- controller：控制器，负责处理一些业务逻辑的处理（简单业务逻辑）
- model:模型（service），和数据打交道，（查询数据库，操作数据库，请求数据）（复杂的业务处理逻辑）
- 更适合团队开发

# egg.controller，egg.service会有下面几个属性挂在this上
- this.ctx
- this.app
- this.service
- this.config
- this.logger
  
# 安装egg脚手架以及使用egg-init创建项目
1. 快速生成项目
- npm i egg-init -g
- egg-init egg-example --type=simple
- cd egg-example
- npm i
2. 启动项目
- npm run dev
- open localhost:7001
3. 一些要求
- nodejs版本必须8.0并且要用LTS版本

# Egg路由（route.js)、 get传值、动态路由（controller）、静态资源（public）、视图（view）egg-view-js、插件配置（config）
1. 模版引擎
- 安装npm i egg-view-ejs --save
- 配置插件config/plugin.js
```javascript
exports.ejs = {
    enable: true,
    package: 'egg-view-ejs'
}
```
- 配置ejs模版引擎config.default.js
```javascript
config.view = {
    mapping: {
        '.html': 'ejs'
    }
}
```
- 模版view/news.html
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2>这是一个新闻<%=msg%></h2>
    新闻页面
    <ul>
        <%for(var i = 0; i< list.length; i++){%>
        <li><%=list[i]%></li>
        <%}%>
    </ul>
</body>
</html>
```
- controller/news.js
```javascript
async index() {
    const { ctx } = this;
    // ctx.body = '新闻页面';
    var msg = '后台ejs'
    var list = ['111', '222', '333']
    await ctx.render('news', {
      msg,
      list
    })
  }
```
- 静态资源
```javascript
 <link rel="stylesheet" href="/public/css/basic.css"></link>
 <img src="/public/images/1.jpg"/>
```

- 分离service
```javascript
// service/news.js
'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async getNewsList() {
    var list = ['111', '222', '333', '444']
    return list
  }
}

module.exports = NewsService;

// controller/news.js
  async index() {
    const { ctx } = this;
    // ctx.body = '新闻页面';
    var msg = '后台ejs'
    // var list = ['111', '222', '333']
    var list = await this.service.news.getNewsList();
    await ctx.render('news', {
      msg,
      list
    })
  }
```

- controller可以调用service中的数据，service也可以调用service的数据

# service命名要求
- service 文件必须放在app/service目录，可以支持多层目录，访问的时候可以通过目录名级联访问
- app/service/biz/user.js => ctx.service.biz.user
- app/service/sync_user.js => ctx.service.syncUser
- app/service/HackerNews.js => ctx.service.hackerNews

# 爬虫-抓取api接口数据实现一个新闻系统
1. 配置公共的api地址（config.default.js）
```javascript
config.api = 'http://www.phonegap100.com'
```
2. 