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
2. 具体查看spider代码

# 框架扩展extend
1. 框架提供了多种扩展点扩展自身的功能(在开发中，我们既可以使用已有的api来方便开发，也可以对以上对象进行自定义扩展，进一步加强框架的功能)
- Application
- Context
- Request
- Response
- Helper
2. 创建appliction文件夹，创建appliction.js,就可以扩展application啦
```javascript
// extend/helper.js
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
    }
}

// 使用
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    抓取的新闻列表
    <ul><%for(var i=0;i< list.length;i++){%>
        <li><a href="spidercontent?aid=<%=list[i].aid%>"><%=list[i].title%></a></li>
        <span>日期<%=helper.formateTime(list[i].dateline)%></span>
    <%}%>
    </ul>
</body>
</html>
```


# 中间件

匹配路由之前，匹配路由完成所做一些操作。egg是基于koa的，所以egg的中间件形式和koa的中间件形式是一样的，都是基于洋葱圈模型

一般来说中间件也会有自己的配置，在框架中，一个完整的中间件是包含了配置处理的。我们约定一个中间件是一个放置在app/middleware目录下的单独文件，它需要exports一个普通的function,接受2个参数
- options: 中间件的配置项，框架会将app.congfig[${middlewareName}]传递过来
- app: 当前应用Application的实例。

需要在config文件内配置中间件
```javascript
  config.middleware = [ 'printdate'];
  config.printdate = {
    aaa : 'aaa'
  }
```

# egg Post提交数据, egg安全机制csrf的防范，以及配置模版全局变量
- 方法1: 表单里面传csrf（比较麻烦）
```javascript
 <form action="/add?csrf=<%=csrf%>" method="post">
        用户名 <input type="text" name="username"/><br/>
        密  码 <input type="password" name="password"/><br/>
        <button type="submit">提交</button>
    </form>
```
- 方法2: 定义中间件，设置模版全局变量
  ```javascript
  module.exports = (options, app) => {
    console.log(options);

    // 返回一个异步方法
    return async function auth(ctx, next) {
        // 设置模版全局变量
        ctx.state.csrf = ctx.csrf;
        console.log(ctx.csrf, 'csrf')
        await next();

        }
    }
  ```