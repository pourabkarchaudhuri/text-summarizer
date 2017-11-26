module.exports={

  'TextSummarizer': function(text,callback){
      var sum = require( 'sum' );
      var status;
      var data;

      var abstract = sum({
          'corpus': text, //corpus`: String - is the string you want to summarize
          'nSentences': 3  //nSentences`: Number - controls the number of sentences from the original text included in the abstact
          // 'nWords': 5,  //nWords`: Number - controls the length in words of the nGram output. Output might be larger as some words are ignored in the algorithm but present in the abstract, for ex. prepositions. When `nWords` is set, `nSentences` is ignored
          // 'exclude': ['polar', 'bear'],  //exclude`: Array[String] - sum.js allows you to exclude from the final abstract, sentences or nGrams that contain any of the words in the `exclude` param
          // 'emphasise': ['magic'] ////  * `emphasise`: Array[String] - forces sum.js to include in the summary the sentences or nGrams that contain any the words specified by `emphasise` param.
      });
      status = 200;
      var summarized_count = abstract.summary.split(/\b\S+\b/g).length;
      var compression = "0.54";
      data ={
        "summary" : abstract.summary,
        "words" : summarized_count,
        "compression" : compression,
        "status" : status,
        "error_status" : false,
        "error_code" : null
      }
      callback(data);
    }
  }
