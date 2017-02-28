/*
学习《深入理解JavaScript》 的有效范例


2016-12-16  by zx.
*/

var DEVELOPMENT = true;


var Zx= (function(){
    
    /*
    判断一个值是不是对象
    
    tips : 如果用 typeof null 返回值是object  
    因此需要排除这种情况
    
    */
    function isObject(value){
        return (value !== null &&
            (typeof value === 'object' || typeof value === 'function'));
    }
    
    function isObject1(value){
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
        Zx.isObject(obj);
        
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
    
    return {
        isExist     : isExist,
        isObject    : isObject1,
        isNaN       : isNaN,
        copyObject  : copyObject,
        getRandomInt: getRandomInt,
        ownPrototypeToArray     : ownPrototypeToArray,
        getAllPrototypeNames    : getAllPrototypeNames
    }
}());

Zx.math = void function(){
    
    /*
    找到数组中的最大值
    */
    function ThisMaxInArr(arr){
        if(!Zx.isObject(arr))
            throw new Error('参数应该是一个数组对象!');
        return Math.max.apply(null,arr);
    }
    
    return {
        ThisMaxInArr    : ThisMaxInArr
    }
    
}();













