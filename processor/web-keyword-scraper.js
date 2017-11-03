module.exports={

'WebScraper': function(url,callback){

    var summarize = require('summarize');
    var superagent = require('superagent');

    superagent.get(url).end(function(res) {
    var result = summarize(res.text);

    callback(result);
  });
 }
}
