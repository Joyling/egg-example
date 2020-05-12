/**
 * 外部可以通过this.app.foo()
 **/
module.exports = {
    foo(param) {
        // this就是app对象，在其中可以调用app上的其它方法，或访问属性
        console.log(this);
    }
}