let utils = (function () {
    function toArray(likeAry) {
        let ary = [];
        // 类数组转数组
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                var cur = likeAry[i] // 代表类数组的每一项
                ary.push(cur);
            }
        }
        return ary
    }

    return {
        toArray
    }
})()

/* 
this出现的几种情况：
    1、在全局作用域下this是window
    2、函数执行时，看执行函数前有么有点，如果有点，点前面是谁，那函数里的this就是谁，如果没有点，那函数里的this是window
    3、自执行函数里的this是window
    4、回调函数里的this一般情况下是window
    5、箭头函数没有this
    6、给元素绑定事件行为，那事件里的this是当前元素
    7、构造函数里的this是当前实例
    8、实例的公有方法里的this一般情况是当前实例
*/