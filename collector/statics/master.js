
function y(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

var howlong = 1;
var x = 0;
var stop = 0;
function move(){
        if (stop==1)
                return;

	var now = new Date().getTime();
        if (x==howlong){
                stop=1;
                document.getElementById("imageid").src="//secure.mas-mas.it/statics/x.png?"+Math.random();
                console.log('stoped');
                return;
        }
        while(new Date().getTime() < now + 500){ /* do nothing */ }
        x +=1;
        console.log(x);
}

function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);
        return true;
    }
    else if (elm.attachEvent) {
        var r = elm.attachEvent('on' + evType, fn);
        return r;
    }
    else {
        elm['on' + evType] = fn;
    }
}


function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function() {
                oldonload();
                func();
        }
    }
}

function init(){
    var body = document.getElementsByTagName('body')[0];

    addEvent(body, 'mousemove', move);
}

addLoadEvent(init);
