module.exports={

  'WebSummarizer': function(url,callback){
      var summary = require('node-tldr');
      var status;
      var data;

      summary.summarize(url, function(result, summary, failure) {
          if (failure) {
              console.log("An error occured! " + result.error);
              status = 503;
              data ={
                "error_status" :  true,
                "error" : "Internal Server Error",
                "status" : status
              }
          }
          else{
            if(result.title!=undefined||result.title!=null){
              if(result.words!=0){
                  //console.log("Complete Result : " + JSON.stringify(result));
                  // console.log("Title : "+JSON.stringify(result.title));
                  // console.log("Summary : "+JSON.stringify(result.summary));
                  // console.log("Words : "+result.words);
                  // console.log("Compress Factor : "+result.compressFactor);
                  // console.log(typeof result.words);
                  var title = result.title;
                  var words = result.words;
                  var compression = result.compressFactor;
                  compression*=compression*100;
                  status = 200;
                  var result = result.summary.join(". ");
                  console.log("API Status : " + status);

                  data ={
                    "title" : title,
                    "summary" : result,
                    "words" : words,
                    "compression" : compression,
                    "status" : status,
                    "error_status" : false,
                    "error_code" : null
                  }
                }
                else{

                  status = 401
                  console.log("API Status : " + status);
                  data ={
                    "error_status" : true,
                    "error" : "This Webpage does not have enough data to summarize. Try another webpage URL.",
                    "status" : status
                  }
                }
            }
            else{

              status = 402
              console.log("API Status : " + status);
              data ={
                "error_status" : true,
                "error" : "The Webpage is Locked to Scraping or Website has lack of data. Please check the url.",
                "status" : status
              }
            }
          //console.log(JSON.stringify(data));
        }//end of else
        callback(data);
      });


    }
  }
