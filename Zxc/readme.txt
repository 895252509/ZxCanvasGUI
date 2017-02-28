/*   -----   ZxC  zx canvas 库  by zx.
    
    旨在写一个基于canvas 的绘图库，实现思维导图功能。或者可以进一步
扩展，实现简单的图片等展示。


2016 - 12 - 10 >　10 : 18


*/

/*
Item  UI组件的基类 

定义组件的样式 包括基本样式，加载样式，点击
样式，切换样式,禁用和启用样式，辅样式（用
于样式有较大变化，或者需要不同的状态时
使用）,样式的定义应该向CSS的语法靠近。

Item = {
    data:{
        text ,
        position ,
    }
    style : {                                           
    thisstyle :{ 基本样式},
    loadstyle:{ 加载样式},
    clickstyle:{ 点击样式},
    togglebeforestyle:{ 切换前样式 },
    toggleafterstyle:{ 切换后样式},
    disablestyle:{  禁用样式},
    enablestyle:{  启用样式},
    overstyle: {   划过样式}
    
    }
    
cando : [      定义组件的能力 
                bool变量的数组
isMove,         是否可以移动
isClick,        是否可以被点击
isToggle,       是否是一个开关组件
isFocus         是否是一个可以聚的组件
],
    
listeners :{        组件的事件监听

onclick,
oninit,
ondistroy,
onready,
onmouseover,
onmouseout, 
toggle,
onfocus,
blur,

}
    
state : {

clicked ,
moved,
hidden,

}

}


/*
------------------** ZxCanvas 类  **----------------
||                                                || 
||   实现管理 Canvas 的功能                     
|| 1. 创建canvas,获取canvas的id,DOM对象   
|| 2. 实现绘图的双缓冲功能   start:17-02-22  end: 



    /*------** 内部事件调用 **----------
        鼠标事件
        键盘事件
    
    // ---  鼠标  单击  --- 
    function onclick(e){}
    // ---  鼠标  双击 --- 
    function ondblclick(e){    }
    // ---  鼠标  移动
    function onmousemove(){}
    // ---  鼠标  按键按下 --- 
    function onmousedown(e){}
    // ---  鼠标  松开按键  --- 
    function onmouseup(e){}
    // ---  鼠标  滚轮滚动 --- 
    function onwheel(e){    }
    // ---  鼠标  进入元素  --- 
    function onmouseenter(e){}
    // ---  鼠标  离开元素  --- 
    function onmouseleave(e){}
    // ---  鼠标  进入元素  --- 
    function onmouseover(e){}
    // ---  鼠标  离开元素  --- 
    function onmouseout(e){}
    // ---  鼠标  阻止右键打开菜单  --- 
    function oncontextmenu(e){return false;}
    // ---  键盘  按下按键  --- 
    function onkeydown(e){}
    // ---  键盘  按键被松开  --- 
    function onkeyup(e){}
    // ---  键盘  某个键盘按键被按下并松开  --- 
    function onkeypress(e){}
    */

关于canvas 显示像素问题

storkeRect 是以 左上角坐标+宽高来绘制，

左上角坐标：
    坐标值如果是整数，画出的线会发虚，需要+0.5才能正常显示
但是这样的话画出来的矩形宽和高就会大了1，需要在将宽和高都减
去1。
    但是这样的话就没法画宽高都是1的像素点，其余如在(0,0)处
画宽高都是2的小矩形，以以上计算后的参数绘图，可以正常显示


2017-02-27

1. 重新理解了js的继承，并且重写了继承
2. 完成 copyAttrToTarget 函数，用来初始化对象。
3. 开始设计Lable 组件


2017-02-28

1. 将工程托管到Git，顺便研究了一下Git的用法
2. 设计初始化Item的函数。





















