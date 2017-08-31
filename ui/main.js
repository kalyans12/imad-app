var button = document.getElementById('counter');
var counter =0;
button.onclick = function(){
   //Ideally it should make a request to the counter endpoint 
   
   //Capture the response and store it in  a variable 
   
   
   //Render the variable in the correct span
   var span = document.getElementById('count');
   counter=counter+1;
   span.innerHTML = counter.toString();
};