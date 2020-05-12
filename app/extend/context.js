module.exports = {
    getHost() {
        // this 就是 ctx对象，在其中可以调用ctx上的其它方法，或访问属性
        return this.request.host
    }
}