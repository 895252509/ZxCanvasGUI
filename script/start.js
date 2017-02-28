var DEBUGGER = true;

window.onload = function(){
    
    if(DEBUGGER) debugger;

    console.log( Zx.Util.getClientSize() );
    
    Zxc.info();
    
    var ican = new Zxc.ZxCanvas();
    ican.Initialization('z-canvas');
    
    var a=  new Zxc.Item({
        style:{
            style:{
                x:0,
                y:0,
                w:200,
                h:300
            }
        }
    });
    ican.add(a);
    ican.show();

    ican.clear({
        x:0,
        y:0,
        w:20,
        h:30
    });
    
    var lable = new Zxc.UI.Lable({
        style:{
            style:{
                x:0,
                y:0,
                color : '#66FFAA'
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