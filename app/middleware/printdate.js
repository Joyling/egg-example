// - options: 中间件的配置项，框架会将app.congfig[${middlewareName}]传递过来
// - app: 当前应用Application的实例。
module.exports = (options, app) => {
    console.log(options);

    // 返回一个异步方法
    return async function printdate(ctx, next) {
        console.log(new Date());
        await next();
    }
    // 配置中间件
}