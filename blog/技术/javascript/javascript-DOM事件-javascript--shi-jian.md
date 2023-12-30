# 事件三要素
事件源:事件被触发的对象
事件类型: 如何触发 什么事件 比如鼠标点击(onclick) 还是鼠标经过，还是键盘按下
事件处理程序:事件处理程序，通过一个函数赋值的方式 完成
```html
<button id="btn">点我弹出对话框</button>
```
```javascript
// 事件源 事件被触发的对象 谁 xx
let btn = document.getElementById('btn');
// 事件类型 如何触发 什么事件 比如鼠标点击(onclick) 还是鼠标经过，还是键盘按下
// 事件处理程序，通过一个函数赋值的方式 完成
btn.onclick = function (){
    alert('nice')
}
```

# 执行事件步骤
案例：点击div，控制台输出 ‘我被选中了’
```javascript
//1. 获取事件源
let div = document.querySelector('div');
// 2，绑定事件，注册事件
//3.添加事件处理程序
div.onclick = function () {
    console.log('我被选中了')
}
```

# 鼠标事件
| **鼠标事件** | **触发条件**     |
| ------------ | ---------------- |
| onclick      | 鼠标点击左键触发 |
| onmouseover  | 鼠标经过触发     |
| onmouseout   | 鼠标离开触发     |
| onfocus      | 获得鼠标焦点触发 |
| onblur       | 失去鼠标焦点触发 |
| onmousemove  | 鼠标移动触发     |
| onmouseup    | 鼠标弹起触发     |
|    onmousedown          |     鼠标按下触发             |
