var button = document.getElementById('counter');
button.onclick = function(){
   //Ideally it should make a request to the counter endpoint 
var request = new XMLHttpRequest();//create a request variable , 

   //Capture the response and store it in  a variable 
   request.onreadystatechange = function(){
       if(request.readyState === XMLHttpRequest.DONE){
         if(request.status===200){
          var counter = request.responseText;
          var span = document.getElementById('count');
          span.innerHTML = counter.toString();
         }    
       }
       //Not done yet
       
   };
   //Make the request to the counter end point
   request.open('GET','http://kalyansiva12.imad.hasura-app.io',true);
   request.send(null);
};