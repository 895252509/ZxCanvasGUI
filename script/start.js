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
                h:300,
                color : '#2452FF'
            }
        }
    });
    ican.add(a);
    
    ican.clear({
        x:0,
        y:0,
        w:20,
        h:30
    });
    
    var lable = new Zxc.UI.Lable({
        canvas_ctx : ican.getContent(),
        style:{
            style:{
                x:10,
                y:20,
                w:100,
                h:20,
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
    
}