var webscraper = require('./processor/web-keyword-scraper');
var websummarizer = require('./processor/web-summarizer');
//Loading Custom Modules
// var url = 'https://dialogflow.com/terms-and-privacy';
//
// WebKeywordScraperModule(url);
// WebSummarizerModule(url);
// //Uncomment to Trigger
//
//
// function WebKeywordScraperModule(url){
//       webscraper.WebScraper(url,function(result){
//           console.log(result);
//     });
// }
//
// function WebSummarizerModule(url){
//     websummarizer.WebSummarizer(url,function(status){
//           console.log("Summarization : "+status);
//     })
// }

// grab the packages we need
var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config()

app = express(),
http = require('http'),
httpServer = http.Server(app);

app.use(express.static(__dirname));

var port = process.env.PORT || 5000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// routes will go here
app.post('/api/scraper', function(req, res) {
    var url = req.body.url;
    // var token = req.body.token;
    // var geo = req.body.geo;
    websummarizer.WebSummarizer(url,function(data){
        res.send(JSON.stringify(data));
    });

    //res.send("The POST call has been successfully made with data : URL : "+url);
});

// start the server
app.listen(port);
console.log('Server started! At ' + process.env.DOMAIN + ':' + port);
