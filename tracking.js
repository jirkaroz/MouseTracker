console.log("Script loaded");

//track info
var CLICKS = [];
var MOVES = [];
var SCROLLS = [];
var LINKS_HOVERED = [];

//Send an ajax request every 5 seconds.
window.setInterval(function(){ //setTimeout also works
    var obj = {"clicks":CLICKS,"moves":MOVES,"scrolls":SCROLLS,
               "hovers":LINKS_HOVERED};
    post(JSON.stringify(obj));
    CLICKS = [];
    MOVES = [];
    SCROLLS = [];
    LINKS_HOVERED = [];
}, 5000);

function post(data) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","http://localhost:8001", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            str = xmlhttp.responseText;
            //console.log(str);
        }
    }
    xmlhttp.send(data);
}

/*
storeClick and storeMove can either be properties
of the document or of an html element.
Need to be defined at parse time.
*/

function storeClick(event) {
    var x = event.clientX;
    var y = event.clientY;
    var t = (new Date()).getTime();
    CLICKS.push([x,y,t]);
}

/*
Fired only when mouse moved.
At most 100 times per second.
*/
function storeMove(event) {
    var x = event.clientX; //event.pageX also works
    var y = event.clientY;
    var t = (new Date()).getTime();
    MOVES.push([x,y,t]);
}

function storeScroll(event) {
    var t = (new Date()).getTime();
    SCROLLS.push(t);
}

function storeHover(index) {
    var t = (new Date()).getTime();
    LINKS_HOVERED.push([index,t]);
}

/*jQuery*/
$(document).ready(function(){
    $(document).click(function(){
        //click the whole document
    });
    $.each($("a"), function(index,value) {
        $(this).hover(function(){
            //on enter
            storeHover(index);
            }, function(){
            //on leave
        });
    });
});
