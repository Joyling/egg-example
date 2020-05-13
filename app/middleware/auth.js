// - options: 中间件的配置项，框架会将app.congfig[${middlewareName}]传递过来
// - app: 当前应用Application的实例。
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