var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
  user:"kalyansiva12",
  database:"kalyansiva12",
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter =0;
app.get('/counter',function(req,res){
counter=counter+1;
res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req,res){ // /submit-name?name=xxxx
    //Get the name from the request
    var name = req.query.name;
    names.push(name);
    //JSON Notation
    res.send(JSON.stringify(names));
});

function hash(input,salt){
 ///How to create a hash for implementing hash we need crypto library and then we need to include it 
 var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
 return hashed.toString('hex');//output hashed value will be a sequence of bytes an dso ned to convert to hhext 
}
app.get('/hash/:input',function(req,res){//taking the input from the user as part of the url and then 
   var hashedString = hash(req.params.input,'this-is-some-random-string');//applying the hash function to generate the hashed value amd then returning that as a response
   res.send(hashedString);
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request 
    //get the response from others
    pool.query("SELECT * FROM test",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});
app.get('/articles/:articleName',function(req,res){
    //articleName == article-one
    //articles[articleName]==will be the content object for article one as per express framework
//var articleName = req.params.articleName;//functionality provided by express.js
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