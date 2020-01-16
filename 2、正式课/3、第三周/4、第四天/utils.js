var utils = (function(){
    function offset(cur){
        let l = cur.offsetLeft;
        let t = cur.offsetTop;
        let parent  =cur.offsetParent;
        while(parent !== document.body){
            l+=parent.clientLeft+parent.offsetLeft;
            t+=parent.clientTop+parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {l,t}
    }
    function getCss(curEle,attr){
        var val = null;
        if('getComputedStyle' in window){
            val = getComputedStyle(curEle)[attr];
        }
        else {
            val = curEle.currentStyle[attr];
        }

        let reg = /^(width|height|top|bottom|left|right|padding|margin|fontSize|opacity)$/;
        if(reg.test(attr)){
            val = parseFloat(val)
        }
        return val
    }
    function setCss(curEle,attr,val){
        let reg = /^(width|height|top|bottom|left|right|fontSize)$/;
        if(reg.test(attr)){
            if(typeof val === 'number'){
                val = val+'px'
            }
        }
        curEle.style[attr] = val
    }
    function setGroupCss(curEle,obj){
        for(var key in obj){
            setCss(curEle,key,obj[key])
        }
    }
    function css(){
        let [curEle,attr,val] = arguments;
        if(arguments.length === 2){
            if(typeof attr === 'string'){
                return getCss(curEle,attr)
            }
            else {
                setGroupCss(curEle,attr)
            }
        }
        else if(arguments.length === 3){
            setCss(curEle,attr,val)
        }
    }
    // 封装一个获取和设置窗口的各种值的方法
    function win(attr,value){
        if(typeof value === 'undefined'){
            // 传递一个参数，就是获取
            return document.documentElement[attr] || document.body[attr];
        }
        else {
            // 设置
            document.documentElement[attr] = value;
            document.body[attr] = value;
        }
    }
    return {
        offset:offset,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css,
        win:win
    }
})()