console.log('Loaded!');
//change the content of the element with id main text 
document.getElementById('main-text').innerHTML ="My Life My Rules God Helps+':)'";

//Move the image
var img = document.getElementById('img');
img.onClick=function(){
    img.style.marginleft='100px';
};
