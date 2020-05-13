// - options: 中间件的配置项，框架会将app.congfig[${middlewareName}]传递过来
// - app: 当前应用Application的实例。
module.exports = (options, app) => {
    console.log(options);

    // 返回一个异步方法
    return async function forbidip(ctx, next) {
        let forbid = '127.0.0.1'
        console.log(ctx.request.ip, 'ipddd')
        if(ctx.request.ip === forbid) {
            ctx.state = 403;
            ctx.body = '您的ip已经被屏蔽'
        } else {
        await next();

        }
    }
    // 配置中间件
}