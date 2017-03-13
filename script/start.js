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
                x:30,
                y:50,
                w:200,
                h:3,
                font: '45px',
                color : '#2452FF',
                border : '2px solid #b7eb28'
            }
        }
    });
    ican.add(a);
    ican.show();
    debugger;
    ican.clear({
        x:0,y:0,w:200,h:200
    });
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
                bgcolor : '#aaaaaa'
            }
        },
        listeners:{
            oninit:function (){
                console.log('lable oninit');
            }
        }
    });
    ican.add(lable);
    ican.show();
    ican.clear({
        x:0,y:0,w:100,h:100
    });
}