/*var button = document.getElementById('counter');
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
   request.open('GET','http://kalyansiva12.imad.hasura-app.io/counter',true);
   request.send(null);
};*/
/*The thing we are making here is on click of a button we are creating  a request and making a  request to the counter end point, once the request state chnges to done and the requests status is 200 we are taking the response of the request and copied into the variable and displaying it where ever required.*/  
//submit name 
/*var nameInput = document.getElementById('name');
var nameVal = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
   // var names=["name1","name2","name3","name4"];
   //on clcik of the submit button craetea a request object and a request 
   var request = new XMLHttpRequest();
   //capture the response and store it in a variable 
   request.onreadystatechange = function(){
       if(request.readyState === XMLHttpRequest.DONE){
           //Take some action
           if(request.status===200){
               //capture the list of the names sent until now and render it a s a list 
               var names = request.responseText;
               names=JSON.parse(names);
    var list="";
    for(var i = 0; i<names.length;i++){
         list += '<li>'+names[i]+'</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML=list;
  }
 }
};
//Make the request 
var nameInput = document.getElementById('name');
var name = nameInput.value;
request.open('GET',"http://kalyansiva12.imad.hasura-app.io/submit-name?name=" +name,true);
request.send(null);
};*/
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    //create a request object 
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
       if(request.readystate ===XMLHttpRequest.DONE){
           if(request.status===200){
               alert("Logged IN successfully");
           }
           else if (request.status === 403){
               alert("Username/Password is incorrect");
           }
           else if (request.status === 500){
               alert('Something went wrong on the server');
           }
            
        }
    };
    
};
//Make the request

//
