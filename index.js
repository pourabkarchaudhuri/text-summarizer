//Required local file Dependencies
var webscraper = require('./processor/web-keyword-scraper');
var websummarizer = require('./processor/web-summarizer');
var textsummarizer = require('./processor/text-summarizer');
//------------------------------------UNCOMMENT FOR LOCAL DEBUGGING------------------------------------
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
//------------------------------------------------------------------------------------------------------
// Load Up the Dependencies
var express = require('express');
var express_formidable = require('express-formidable')
var formidable = require('formidable');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
require('dotenv').config()

//Configuring the Express Middleware
app = express(),
http = require('http'),
httpServer = http.Server(app);

//Configure Log Path
var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'})

//Configure Morgan's Logging Formats
//app.use(morgan('common', {stream: accessLogStream}))    //UNCOMMENT TO ENABLE FILE LOGGING
app.use(morgan('common'));
app.use(express.static(__dirname));

//Set PORT to Dynamic Environments to run on any Server
var port = process.env.PORT || 5000;

//Configure Express to Recieve JSON and extended URLencoded formats
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Set RESTful routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/scraper', function(req, res) {
    var url = req.body.url;
    // var token = req.body.token;
    // var geo = req.body.geo;
    websummarizer.WebSummarizer(url,function(data){
        res.send(JSON.stringify(data));
    });
});

app.post('/api/parser', function(req, res) {
    var text = req.body.text;
    // var token = req.body.token;
    // var geo = req.body.geo;
    textsummarizer.TextSummarizer(text,function(data){
        res.send(JSON.stringify(data));
    });
});

//app.use(formidable());

// app.use(formidable({
//   encoding: 'utf-8',
//   uploadDir: '/upload/',
//   multiples: true, // req.files to be arrays of files
// }));

// app.post('/api/upload', function(req, res) {
//   console.log(JSON.stringify(req.files));
//   //req.fields; // contains non-file fields
//   req.files; // contains files
//   res.send(req.files);
// });

app.post('/api/upload', function (req, res){
    console.log("incoming file");
    var form = new formidable.IncomingForm();

    form.parse(req);
    console.log("reading file");
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });
 console.log("saving file");
    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        console.log('Run File Operations : ');
    });
    var data;
    console.log("responding file");
    data ={
      "title" : "Title Goes here",
      "summary" : "Successfully Uploaded and Saved the File!!",
      "words" : "3",
      "compression" : "0.42",
      "status" : 200,
      "error_status" : false,
      "error_code" : null
    }
    res.send(data);
});

// Start the server
app.listen(port);
console.log("Server has booted up successfully.");
