var DEBUGGER = true;

window.onload = function(){
    
    if(DEBUGGER) debugger;

    console.log( Zx.Util.getClientSize() );
    
    Zxc.info();
    
    var ican = new Zxc.ZxCanvas();
    ican.Initialization('z-canvas');

    debugger;
    var lable = new Zxc.UI.Lable({
        canvas_ctx : ican.getContent(),
        data:{
            text : '旧标签'
        },
        style:{
            style:{
                x:0,
                y:300,
                w:200,
                h:1,
                font : '40px',
                color : '#FFFFFF',
                bgcolor : '#aaaaaa',
            }
        },
        listeners:{
            oninit:function (){
                console.log('lable oninit');
            },
            onclick : function (){
                console.log('lable onclick');
            },
            onmouseover : function(){
                console.log('lable onmouseover');   
            },
            onmouseout:function(){
                console.log('lable onmouseout');
            },
            onmousewheel : function (){
                console.log('lable onmousewheel');
            },
            onmousemove : function (){
                console.log('lable onmousemove');
            },
        }
    });
    lable.distroy();
    ican.add(lable);
    ican.show();
    
    
}