module.exports = {
    // 可以通过this.ctx.request.foo()调用
    foo(param) {
        return 'request 的扩展'
    }
}