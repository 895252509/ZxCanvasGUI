var DEBUGGER = true;

window.onload = function(){
    
    if(DEBUGGER) debugger;

    console.log( Zx.Util.getClientSize() );
    
    Zxc.info();
    
    var ican = new Zxc.ZxCanvas();
    ican.Initialization('z-canvas');
    
    var a=  new Zxc.Item({
        canvas_ctx : ican.getContent(),
        style:{
            style:{
                x:0,
                y:200,
                w:200,
                h:3,
                font: '45px',
                color : '#2452FF',
                border : '2px solid #b7eb28'
            }
        },
        listeners :{
            onclick:function(){
                alert('aaaaa');
            }
        }
    });
    ican.add(a);
    debugger;
    var lable = new Zxc.UI.Lable({
        canvas_ctx : ican.getContent(),
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
                alert('   ');
            },
            onmouseover : function(){
                alert('aaaa');
            },
            onmouseout:function(){
                alert('wheel');
            }
        }
    });
    ican.add(lable);
    ican.show();
    
    
}