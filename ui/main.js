console.log('Loaded!');
//change the content of the element with id main text 
document.getElementById('main-text').innerHTML ="My Life My Rules God Helps+':)'";

//Move the image
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft +10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var interval = setInterval(moveRight,100);
};
