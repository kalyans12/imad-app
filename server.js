var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
        title:"Article One | Kalyan Siva",
        heading:"Article One",
        date:"Sep 5, 2016",
        content:`
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
        content:`
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
        content:`
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

function createTemplate(data){
    var title =data.titles;
    var date = data.date;
    var content = data.content;
    var heading = data.heading;
    var htmlTemplate =`<html>
        <head>
            <title>
                ${titles}
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
                    ${date}
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

app.get('/:articleName',function(req,res){
    //articleName == article-one
    //articles[articleName]==will be the content object for article one as per express framework
var articleName = req.params.articleName;//functionality provided by express.js
res.send(createTemplate(articles[articleName]));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var counter =0;
app.get('/counter',function(req,res){
counter=counter+1;
res.send(counter.toString());
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