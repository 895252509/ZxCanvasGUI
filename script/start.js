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
                h:30,
                font: '20px',
                color : '#2452FF',
                border : '2px solid #b7eb28'
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
                h:60,
                font : '30px',
                color : '#FFFFFF',
                bgcolor : '#aaaaaa',
                border : '2px solid #ff00a7'
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
    
    ican.canvas_ctx.save();
    ican.canvas_ctx.lineWidth = 2;
    Zxc.Canvas.strokeRect(ican.canvas_ctx,{
        x:100,y:100,w:30,h:30
    });
}