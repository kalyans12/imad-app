//we are using express js so including that library 
var express = require('express');
var morgan = require('morgan');
//for having logs of our request we are using morgan 
var path = require('path');
var Pool = require('pg').Pool;
//to connect our web app to the database we require this
var crypto = require('crypto');
//to have the hashing algorithm implemented on our password storages n the database we need this
var bodyParser = require('body-parser');
//giving details about the database credentials that we are going to get connected to
var config = { 
  user:"kalyansiva12",
  database:"kalyansiva12",
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};
  //securely storing a password in an emvironmental variable so that it is not acccessible to the users


var app = express();//using express
app.use(morgan('combined'));
app.use(bodyParser.json());
//heere we are telling our express request that in thecontent of the  request if we are seeing json content load that into the req.body variable 

/*var articles={
    'article-one':{
        title:"Article One | Kalyan Siva",
        heading:"Article One",
        date:"Sep 5, 2016",
        Content:`
                <p>
                This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first articleThis is the content for my first article.This is the content for my first article
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first articleThis 
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first articleThis is the content for my first article.This i
                </p>
                `
    },
    'article-two':{
        title:"Article Two | Kalyan Siva",
        heading:"Article Two",
        date:"Sep 15, 2016",
        Content:`
                <p>
                This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first articleThis is the content for my first article.This is the content for my first article
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first articleThis 
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first articleThis is the content for my first article.This i
                </p>
                `
    },
    'article-three':{
            title:"Article Three | Kalyan Siva",
        heading:"Article Three",
        date:"Sep 25, 2016",
        Content:`
                <p>
                This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first articleThis is the content for my first article.This is the content for my first article
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first articleThis 
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first articleThis is the content for my first article.This i
                </p>
                `
    }
    };
*/
function createTemplate(data){
    var title =data.title;
    var date = data.date;
    var content = data.Content;
    var heading = data.heading;
    var htmlTemplate =`<html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                ${content}
                </div>
                </div>
            </body>
        </html>`;
        return htmlTemplate;
}
//templating the data of the article content so that along with the content received the page loads automatically 
//when ever we get a request normally we use this
app.get('/', function (req, res) { 
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
//which file to be sent as part of the above reqyest
//To get the number of counts we are getting to this api request
var counter =0;
app.get('/counter',function(req,res){
counter=counter+1;
res.send(counter.toString());
});
//to have the names submitted in the url as the query string as of now and display them in the ul on the form 
var names = [];
// /submit-name?name=xxxx
app.get('/submit-name',function(req,res){ 
    //Get the name from the request
    var name = req.query.name;
    //if name is passed as a query parameter instead of parameter we use query instead of params
    names.push(name);
    //pushing the names in the array 
    //JSON Notation
    res.send(JSON.stringify(names)); 
});//response is available to the browser in terms of json and array is sent instead of objects
//hashing the password for security
 ///How to create a hash for implementing hash we need crypto library and then we need to include it
function hash(input,salt){ 
 var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
 //(password based key derivation function)
 //hashing the password for security
 ///How to create a hash for implementing hash we need crypto library and then we need to include it
 //appling the hashing algorithm on the password by appending salt value to the raw password and applying 10000 times the hashing algorithm and gettinga  512 bit or 128 byte ouputted hashed value for the password to be stored in database
 return ["pbdkf","10000",salt,hashed.toString('hex')].join('$');
 
}//output hashed value will be a sequence of bytes an dso ned to convert to hhext 
app.get('/hash/:input',function(req,res){ 
   var hashedString = hash(req.params.input,'this-is-some-random-string');
   //applying the hash function to generate the hashed value amd then returning that as a response
   res.send(hashedString);
});
//taking the input from the user as part of the url and then

var pool = new Pool(config);
//whenever we want to have conection with database we create pool object and then we can have db queries with it so that we will get results as responss from the database
app.get('/test-db',function(req,res){
 
    pool.query("SELECT * FROM test",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});//output hashed value will be a sequence of bytes an dso ned to convert to hhext    //make a select request 
    //get the response from others
app.get('/articles/:articleName',function(req,res){
    
pool.query("select * from article where heading=$1",[req.params.articleName],function(err,result){
   if(err){
       res.status(500).send(error.toString());
   } 
   else{
       if(result.rows.length===0){
           res.status(404).send('Article Not Found');
       }else{
           var articleData = result.rows[0];
           res.send(createTemplate(articleData));
       }
   }
});

});

//articleName == article-one
    //articles[articleName]==will be the content object for article one as per express framework
//var articleName = req.params.articleName;//functionality provided by express.js
app.post('/create-user',function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
         if(err){
            res.status(500).send(err.toString());
        }else{
            res.send("Usee Succesfully created"+userName);
        }
        });
});
//username and password we are getting
    //if in the request content if the content is coming in the format of JSON then we need to tell the express framework to get the values of the username and password from the request body and for this we need to use bodyParser library 
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});



app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});