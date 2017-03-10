/*
* Zxc 库？  能不能实现..... 写着玩吧    
*Zx canvas 目的是专门针对canvas,画图 画导图，图表，简单的UI
*
*
*开始？   只Chrom浏览器
*1. 首先要拿到一个DOM对象吧。
*2. 实现事件的监听
*3. 创建一个菜单类
*
*/
var DEBUGGER = true;

var Zx = function (){
    /*
    Zx 立即执行函数
    命名空间，一些常用函数
    
    */
    function info(){
        console.log('Zx 命名空间：\n    一些常用的函数。');
    }
    
    return {
        info : info
    }
}();

Zx.Util = function(){
    function getBrowser(){
        return navigator.appName +
            ' \n '+
            navigator.appVersion+
            ' \n '+
            navigator.userAgent;
    }
    
    function getClientSize(){
        return [window.innerWidth,window.innerHeight];
    }
    
    /*
    判断一个值是不是对象
    tips : 如果用 typeof null 返回值是object  
    因此需要排除这种情况
    
    */
    function isObject1(value){
        return (value !== null &&
            (typeof value === 'object' || typeof value === 'function'));
    }
    
    function isObject(value){
        return value === Object(value);
    }
    
    /*
    判断一个值是不是NaN
    NaN是唯一自身不等于自身的值
    
    */
    function isNaN(value){
        return value !== value;
    }

    function ownPrototypeToArray(obj){
        var arr = [];
        if ( !isObject(obj) ) return arr;
        
        for( var key in obj){
            if( Object.prototype.hasOwnProperty.call(obj,key)){
                arr.push(key);
            };
        }
        
        return arr;
    }
    
    /*
    检测变量是否存在
    
    */
    function isExist(value){
        return typeof value !== 'undefined';
    }
    
    /*
    列出对象所有属性，包括不可枚举的
    */
    function getAllPrototypeNames(obj){
        if(!isObject(obj)) throw Error('Error: Zx.Util.getAllPrototypeNames() \n\t函数的参数必须是一个对象');
        
        var arr= [];
        while(obj){
            Array.prototype.push.apply(arr,Object.getOwnPropertyNames(obj));
            obj = Object.getPrototypeOf(obj);
        }
        
        return arr;
    }
    
    /*复制对象*/
    function copyObject(orig){
        if(!Zx.isObject(orig)) throw new Error('函数的参数必须是一个对象!');
        var copy = Object.create(Object.getPrototypeOf(orig));
        copyOwnPropertiesFrom(copy,orig);
        return copy;
    }
    
    /*把这个函数的属性从orig复制到copy*/
    function copyOwnPropertiesFrom(target,source){
        Object.getOwnPropertyNames(source)
        .forEach(function(propKey){
            var desc = Object.getOwnPropertyDescriptor(source,propKey);
            Object.defineProperty(target,propKey,desc);
        });
        return target;
    }
    /*
    获得一个从lower到upper的随机整数
    */
    function getRandomInt(lower,upper){
        if(arguments.length ===1){
            upper = lower;
            lower = 0;
        }
        
        return Math.floor(Math.random()*(upper - lower)) + lower;
    }
    /*
    判断一个数组是否至少有一个值
    
    */
    function isArrayHas(obj){
        if(!isObject(obj)) 
            return false;
        if(obj.length<1)
            return false;
        return true;
    }
    /*
    判断对象是否在数组内 
    返回值是找到的索引，找不到返回-1
    */
    function isInArray(arr,obj){
        if( !isObject(arr) ) throw Error('ParamError: Zx.Util.isInArray() \n\t参数必须是一个对象');
        for( var i = 0;i< arr.length;i++ ){
            if(isExist( arr[i] ) && arr[i] === obj){
                return i;
            }    
        }
        return -1;
    }
    

    function initClassByObj(obj,objfrom){
        if( !isObject(obj) )throw Error('Error: Zx.Util.initClassByObj() \n\t参数必须是一个对象！');
        var obj_attr = Object.getOwnPropertyNames(objfrom);
        var this_attr = getAllPrototypeNames(obj);
        for(var i= 0;i< obj_attr.length;i++){
            if( isInArray(this_attr ,obj_attr[i] ) ){
                var desc = Object.getOwnPropertyDescriptor(objfrom,obj_attr[i]);
                Object.defineProperty(obj,obj_attr[i],desc);
            }
        }
    }
    /*
        将源对象的属性复制到目标对象，条件
    是目标对象必须有源对象将要复制的这个属
    性，如果没有则不复制
    
    */
    function copyAttrToTarget(target,source){
        var sourceAttr = Object.getOwnPropertyNames(source);
        var targetAttr = Object.getOwnPropertyNames(target);
        for(var i= 0;i< sourceAttr.length;i++){
            if( isInArray(targetAttr,sourceAttr[i])<0 ) continue;
            if( typeof target[sourceAttr[i]] === 'object' && typeof source[sourceAttr[i]] === 'object' && target[sourceAttr[i]] !== null){
                copyAttrToTarget(target[sourceAttr[i]],source[sourceAttr[i]]);
            }else{
                var desc = Object.getOwnPropertyDescriptor(source,sourceAttr[i]);
                Object.defineProperty(target,sourceAttr[i],desc); 
            }
            
        }
    }
    
    return {
        getBrowser  : getBrowser,
        getClientSize   : getClientSize,
        
        isExist     : isExist,
        isObject    : isObject1,
        isNaN       : isNaN,
        isArrayHas  : isArrayHas,
        
        copyObject  : copyObject,
        getRandomInt: getRandomInt,
        ownPrototypeToArray     : ownPrototypeToArray,
        getAllPrototypeNames    : getAllPrototypeNames,
        copyAttrToTarget        : copyAttrToTarget,
        initClassByObj          : initClassByObj
    }
}();

var Zxc = function (){
    
    function info(){
        
        console.log('Zxc 命名空间：\n    基于Canvas的GUI库。');
        
    }
    
    return {
        info : info
    }
    
}();

Zxc.Canvas = function (){
    /* ---!! 矫正canvas strokeRect函数绘图发虚问题，代替原本的strokeRect
    参数必须是两个，
    1. canvas handle
    2. 一个Zxc.Shape.Rect 对象
    
    */
    function strokeRect(obj,rect){
        obj.strokeRect(
            rect.x+0.5,
            rect.y+0.5,
            rect.w-1,
            rect.h-1
        )
    }
    
    function fillRect(obj,rect){
        obj.fillRect(
            rect.x,
            rect.y,
            rect.w,
            rect.h
        )
    }
    
    function clearRect(obj,rect){
        rect.w = rect.w ? rect.w : obj.canvas.clientWidth;
        rect.h = rect.h ? rect.h : obj.canvas.clientHeight;
        obj.clearRect(
            rect.x,
            rect.y,
            rect.w,
            rect.h
        )
    }
    
    
    return {
        strokeRect      : strokeRect,
        fillRect        : fillRect,
        clearRect       : clearRect
    }
}();


//var Zxc = function(){
    /*
    全局对象
    
    */
Zxc.ZxCanvas=  function (){

    //canvas dom 全局变量
    this.dom_canvas = {};
    this.canvas_ctx = {};
    
    this.event_names= Object.create(null);
    
    this.event_names.click       = function(e){};
    this.event_names.dblclick    = function(e){};
    this.event_names.contextmenu = function(e){return false;};
    this.event_names.wheel       = function(e){var attr = 'wheelDelta';console.log(attr +' : '+ e[attr]);};
    this.event_names.mousemove   = function(e){};
    this.event_names.mouseup     = function(e){};
    this.event_names.mouseover   = function(e){};
    this.event_names.mouseout    = function(e){};
    this.event_names.keydown     = function(e){};
    this.event_names.keypress    = function(e){};
    this.event_names.keyup       = function(e){};
    
    this.width = 0;
    this.height = 0;
    
    this.items = new Array();
}

    /*
    初始化函数
    
    可以直接指定参数，是一个canvas的id ，或者是一
    个 canvas dom 对象*/
Zxc.ZxCanvas.prototype.Initialization = function(arg){
    
    if( Object(arg) === arg ){ //is a obj?
        this.dom_canvas = arg;
    }else if( typeof arg === 'string'){
       this.dom_canvas= document.getElementById(arg);
    }
    
    this.canvas_ctx = this.dom_canvas.getContext('2d');
    
    this.width  =    this.dom_canvas.offsetWidth;
    this.height =    this.dom_canvas.offsetHeight;
    
    //关联事件处理函数
    this.dom_canvas.onclick      = this.event_names.click;
    this.dom_canvas.ondblclick   = this.event_names.dblclick;
    this.dom_canvas.oncontextmenu= this.event_names.contextmenu;
    this.dom_canvas.onmousewheel = this.event_names.wheel;
    this.dom_canvas.onmousemove  = this.event_names.mousemove;
    this.dom_canvas.onmouseup    = this.event_names.mouseup;
    this.dom_canvas.onmouseover  = this.event_names.mouseover;
    this.dom_canvas.onmouseout   = this.event_names.mouseout;
    this.dom_canvas.onkeydown    = this.event_names.keydown;
    this.dom_canvas.onkeypress   = this.event_names.keypress;
    this.dom_canvas.onkeyup      = this.event_names.keyup;
}

Zxc.ZxCanvas.prototype.getCanvasId = function(){
    return dom_canvas.getAttribute('id');
}

Zxc.ZxCanvas.prototype.show = function(){
    debugger;
    this.clear();
    var content = this.getContent();

    
    for(var i= 0; i< this.items.length; i++){
        var thisCom = this.items[i];
        var style = thisCom.style.style;
        
        thisCom.Show();
        
    }
}

Zxc.ZxCanvas.prototype.add = function(obj){
    var ZxTypeError = new Error('ParamTypeError:Zxc.ZxCanvas.add  \n\t函数的参数必须是一个对象');
    var ZxUITypeError = new Error('TypeError:Zxc.ZxCanvas.add \n\t参数必须是一个Zxc.Item类的子类');
    var ZxError= new Error('Error:Zxc.ZxCanvas.add \n\t 对象属性不存在');
    
    if(obj instanceof Zxc.Item){
        this.items.push(obj);
    }else {
        throw ZxUITypeError;
    }
    
    var ctx = this.getContent();
    
    if( typeof obj.type === 'undefined' ) throw ZxError;
    switch (obj.type){
        case 'Item':
            
            
            break;
        case 'Lable':
            
            
            
            break;
        case 'Button':
            break;
        case 'Menu':
            break;
    }
    
}
    
Zxc.ZxCanvas.prototype.clear= function(obj){
    Zxc.Canvas.clearRect(this.getContent(),new Zxc.Shape.Rect(obj || {}));
}

Zxc.ZxCanvas.prototype.getCanvas = function(){
    return this.dom_canvas;
}

Zxc.ZxCanvas.prototype.getContent = function(){
    return this.canvas_ctx;
}


Zxc.Util = function (){
    //解析font
    function decodeFont(font){
        var fontDesc =  font.split(' ');
        var px = null;
        for(var i=0;i< fontDesc.length;i++){
            if(fontDesc[i].split('px').length > 1){
                px = fontDesc[i].split('px')[0];
            }
        }
        
        return {
            font_size : px
        }
    }
    
    
    return {
        decodeFont      : decodeFont
        
        
    }
    
}();

Zxc.Shape = function(){
    /*---------------** 点 **---------------------------
    定义一个点
    
    */
    function Point(x,y){
        this.x = x || 0;
        this.y = y || 0;
    }
    /*
    定义一个四元数 Around 表示四个方向
    
    */
    function Around( left,top,right,bottom ){
        this.left   = left  || 0;
        this.top    = top   || 0;
        this.right  = right || 0;
        this.bottom = bottom|| 0;
    }
    /*------------------** 矩  形 **-------------------------
    矩形的构造函数 constructor
    
    参数类型说明：
    参数类型，当前均按对象参数的方式传递。
    
    */
    function Rect(obj){
        
        //继承自四元数
        if( typeof obj !== 'object'){
            console.log('Rect:目前参数必须为对象.');
            return;
        }
        
        /*
        参数的赋值： 接受的参数包括：x,y,width,height,left,right,top,bottom
        
        */

        this.left   = obj.x || obj.left || 0;
        this.top    = obj.y || obj.top  || 0;
        
        this.right  = obj.right || obj.width + this.left || obj.w + this.left || 0;
        this.bottom = obj.bottom|| obj.height+ this.top  || obj.h + this.top  || 0;
        
        /*
        如果初始化的值，left比right大，那么做交换。
        */
        var tmp= this.left;
        this.left = this.left <= this.right ? this.left :this.right;
        this.right= tmp === this.left ? this.right : tmp;
        tmp= this.top;
        this.top = this.top <= this.bottom ? this.top :this.bottom;
        this.bottom= tmp === this.top ? this.bottom : tmp;
        
        /*
        转换成x,y,w,h 形式
        */
        this.x      = this.left;
        this.y      = this.top;
        this.w      = this.right - this.left;
        this.h      = this.bottom - this.top;
    }
    Rect.prototype= new Around();  
    /*-------------** 圆 **--------------------------
    定义圆
    
    */
    function Circle(obj){  
        
    }
    return {
        Point   : Point,
        Around  : Around,
        Rect    : Rect
    }  
}();

    /*
    Item  UI组件的基类 
    
       定义组件的样式 包括基本样式，加载样式，点击
    样式，切换样式,禁用和启用样式，辅样式（用于样式
    有较大变化，或者需要不同的状态时使用）,样式的定义
    应该向CSS的语法靠近。
    
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
        
        cando : [      定义组件的能力  bool变量的数组
            isMove,         是否可以移动
            isClick,        是否可以被点击
            isToggle,       是否是一个开关组件
            isFocus         是否是一个可以聚焦的组件
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
    
    */
Zxc.ItemBase = function (){
    //保存UI元素的数据
    function itemData(){
        this.text =     null;
        this.position = new Zxc.Shape.Point();
    }
    
    //保存UI元素的样式的类
    //定义样式
    function baseStyle(){
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.color = null;
        this.bgcolor = null;
        this.border = null;
    }
    //样式列表
    function itemStyle(){
        this.style         = new baseStyle();
        this.loadStyle     = new baseStyle();
        this.clickStyle    = new baseStyle();
        this.disableStyle  = new baseStyle(); 
        this.enableStyle   = new baseStyle();
        this.overStyle     = new baseStyle();
        this.toggleBeforeStyle  = new baseStyle();
        this.toggleAfterStyle   = new baseStyle();
    }
    function itemListener(){
        this.onclick      = null;
        this.oninit       = null;
        this.ondistroy    = null;
        this.onready      = null;
        this.onmouseover  = null;
        this.onmouseout   = null; 
        this.ontoggle     = null;
        this.onfocus      = null;
        this.onblur       = null;
    }
    function itemCando(){
        this.canMove     = null;   
        this.canClick    = null;    
        this.canToggle   = null; 
        this.canFocus    = null;
    }
    function itemState(){
        this.clicked    = null;
        this.moved      = null;
        this.hidden     = null;
    }
    
    return {
        itemData    : itemData,
        baseStyle   : baseStyle,
        itemStyle   : itemStyle,
        itemListener: itemListener,
        itemCando   : itemCando,
        itemState   : itemState
    }
    
}();

Zxc.Item = function(obj){
    if(typeof obj === 'undefined') obj = {};
    /*
    this.data       = obj.data      || new Zxc.ItemBase.itemData();
    this.style      = obj.style     || new Zxc.ItemBase.itemStyle();
    this.listeners  = obj.listeners || new Zxc.ItemBase.itemListener();
    this.cando      = obj.cando     || new Zxc.ItemBase.itemCando();
    this.state      = obj.state     || new Zxc.ItemBase.itemState(); 
    */
    this.data       = new Zxc.ItemBase.itemData();
    this.style      = new Zxc.ItemBase.itemStyle();
    this.listeners  = new Zxc.ItemBase.itemListener();
    this.cando      = new Zxc.ItemBase.itemCando();
    this.state      = new Zxc.ItemBase.itemState(); 
    
    this.cando.canClick     = true;
    this.cando.canFocus     = true;
    this.cando.canMove      = true;
    this.cando.canToggle    = true;
    
    this.state.clicked  = false;
    this.state.hidden   = false;
    this.state.moved    = false;
    
    this.type = 'Item';
    this.canvas_ctx = null;
    
    Zx.Util.copyAttrToTarget(this,obj);
    
    this.relayout();
    //this.style.thisstyle = new Zxc.Shape.Rect(obj.style.thisstyle);
};
Zxc.Item.prototype.Show= function(){debugger;
    var content = this.canvas_ctx;
    var theStyle = this.style.style;
    
    if(theStyle.bgcolor !== null && typeof theStyle.bgcolor !== 'undefined' && typeof theStyle.bgcolor === 'string'){
        content.save();
        content.fillStyle = theStyle.bgcolor;
        Zxc.Canvas.fillRect(content,theStyle);
        content.restore();
    }
    content.save();
    content.fillStyle = theStyle.color || 'black';
    content.font = theStyle.font || content.font;
    content.textBaseline = 'top';
    content.fillText(this.data.text,theStyle.x,theStyle.y,theStyle.w);
    content.restore();
    
}

Zxc.Item.prototype.relayout = function(){
    this.type = 'Item';
    this.data.text =  'Item';
    this.data.position.x = this.style.style.x || 0;
    this.data.position.y = this.style.style.y || 0;
    if(this.canvas_ctx === null){
     //如果没有Canvas Context 
        this.style.style.w = 20;
        this.style.style.h = 10;
        this.style.style.color = 'block';
    }else{
    //如果存在Canvas Context，则可以通过其计算最小尺寸
        this.style.style.w = this.style.style.w || this.canvas_ctx.measureText(this.data.text).width;
        this.style.style.h = this.style.style.h ||  Zxc.Util.decodeFont(this.canvas_ctx.font).font_size;
    }
    
    
}

Zxc.UI = function(){
    /*--------** UI组件 **---------
     *    目前所有对象创建均采用对象参
     * 数方式，
     *    首先创建一个菜单类，其实应该
     * 继承自一个公共的UI类，但是目前先
     * 这么写吧，后来再添组件的时候再把
     * 公共部分抽象出来吧。 
     *                  2016-12-18
     *
     * 直接抽出一个基类 叫做Item ,定义
     *一些比较基本的页面元素的功能。UI组件
     *包括后来导图里面的元素除了链接线以外
     *都可以继承Zxc.Item类
     *
     */
    
    
    /*
    Lable
    
    标签，用来显示文本
    */
    function Lable(obj){
        debugger;
        Zxc.Item.call(this,obj);
        
        this.type = 'Lable';

        if(typeof this.listeners.oninit !== 'undefined') this.listeners.oninit(); 
    }
    Lable.prototype = new Zxc.Item();
    Lable.prototype.relayout = function(){
        debugger;
        //Object.getPrototypeOf(this).relayout.call(this);

        Zxc.Item.prototype.relayout.call(this);
        
        delete this.style.toggleAfterStyle;
        delete this.style.toggleBeforeStyle;
        delete this.style.loadStyle;
        
        this.data.text = '新标签';
        
    }
    Lable.prototype.Show= function(){
        Object.getPrototypeOf(Object.getPrototypeOf(this)).Show.call(this);
        
        
    }
    
    
    
    /*
    菜单组件
    obj={
        x   : number,
        y   : number,
        w   : number,
        h   : number,
        
    }
    */
    function Menu(obj){
        if(!Zxc.Util.isObject(obj)) throw new Error('创建组件，参数必须是一个定义菜单的对象。');
        
        
    }
    Menu.prototype = new Zxc.Item();
    /*
    按钮组件

    */
    function Button(){
        
        
    }
    Button.prototype = new Zxc.Item();
    
    
    
    return {
        Menu    : Menu,
        Button  : Button,
        Lable   : Lable
        //UIBase  : UIBase
    }
}();




























