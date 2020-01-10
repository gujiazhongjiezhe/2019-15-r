/* 
    1、创建一个变量，准备接收请求来的数据
    2、利用ajax请求数据，然后把数据放到一个变量中
        1、创建一个ajax实例
        2、打开一个请求连接，基于get请求同步完成
        3、监听服务器返回的信息状态，如果状态是200，而且状态码是4，证明数据请求成功
        4、发送ajax请求
    3、把请求来的数据赋值给变量接收
*/
let data = null;
let cardBox = document.getElementById('cardBox');
let navList = document.getElementsByTagName('a');
let xhr = new XMLHttpRequest;
xhr.open('get', './json/product.json', false);
xhr.onreadystatechange = function () {
    // 如果状态是200，而且状态码是4，证明数据请求成功
    if (xhr.status === 200 && xhr.readyState === 4) {
        data = xhr.responseText;
    }
};
xhr.send();
data = JSON.parse(data); // 把字符串转化为对象

/* 
把数据渲染到页面
*/
renderHtml();
// 封装数据渲染的方法
function renderHtml() {
    let htmlStr = ``;
    data.forEach(item => {
        // 把每一个item的时间、热度、价格等属性自定义到结构体上，方便以后备用
        htmlStr += `
        <li data-time="${item.time}" data-hot="${item.hot}" data-price="${item.price}" >
            <img src="${item.img}" alt="">
            <span>标题：${item.title}</span>
            <span>时间：${item.time}</span>
            <span>热度：${item.hot}</span>
            <span>价格：${item.price}</span>
        </li>
     `
    });
    cardBox.innerHTML = htmlStr;
};

let cardList = document.getElementsByTagName('li'); // 获取页面所有的li
cardList = utils.toArray(cardList); // 把类数组转数组

for (var i = 0; i < navList.length; i++) { // 给页面三个a标签绑定点击事件
    navList[i].index = i; // 给每一个按钮设置自定义属性，存储的是当前的索引
    navList[i].flag = -1; // 给每一个a标签增加一个flag属性用来判断是升序还是降序
    navList[i].onclick = function () {
        // this-->点击谁this就是谁，this就是当前点击的元素
        sortList.call(this);
        clearArrow.call(this);
        addArrow.call(this);
    }
}

function sortList() {
    this.flag *= -1;
    // this-->当前点击的元素 this.index = 1
    let dataAry = ['data-time', 'data-hot', 'data-price'];// 属性映射表，通过当前点击按钮的索引，拿到映射表中对应的属性名
    cardList.sort((a, b) => {
        // this-->当前点击的元素
        /* 
        在sort里，a和b是每一个li，不能直接相减，我们得拿到li身上进行排序的哪些属性进行相减

        // 1、先通过a标签的索引拿到要进行排序的属性名，
        // 2、然后根据属性名拿到li结构上对应的属性值，
        // 3、把属性值重新赋值给变量a和b进行比较排序
        */
        a = a.getAttribute(dataAry[this.index]);
        b = b.getAttribute(dataAry[this.index]);

        // 如果条件成立，说你点击的是时间按钮，时间中有"-",不能进行相减，要给他去掉
        if (this.index === 0) {
            a = a.replace(/-/g, '');
            b = b.replace(/-/g, '');
        }
        // flag为1的时候是升序，flag为-1的时候为降序
        return (a - b) * this.flag;
    });
    // 把排好序的li在重新插入到页面
    for (var i = 0; i < cardList.length; i++) {
        cardBox.appendChild(cardList[i]);
    }
}

function clearArrow() {
    for (var i = 0; i < navList.length; i++) {
        if (this !== navList[i]) {
            // 如果此条件成立，那就是未被点击的a标签，把未被点击的a标签的flag置为默认值-1
            navList[i].children[0].classList.remove('bg');
            navList[i].children[1].classList.remove('bg');
            navList[i].flag = -1;
        }

    }
}

function addArrow() {
    let up = this.children[0];
    let down = this.children[1];
    // 如果当前a标签的flag大于0，说明是升序，反之就是降序
    if (this.flag > 0) {
        up.classList.add('bg');
        down.classList.remove('bg')
    } else {
        down.classList.add('bg');
        up.classList.remove('bg')
    }
}