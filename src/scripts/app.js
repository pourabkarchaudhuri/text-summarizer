'use strict';

$(function () {
$("#warning-wrapper").hide();
$("#resultRow").hide();
$("#resultDetails").hide()
$("#alert-wrapper").hide();
$('#submit-btn-id').on('click', function () {
    sendMessage();
  });

  $("#textfield").keypress(function (e) {
      if (e.which == 13) {
          if($.trim($(this).val())!=""){
            sendMessage();
          }
      }
  });//Enter Button 13 Trigger

});//end of document ready

function sendMessage(){
  var url = $('#textfield').val();

  if(url==null||url==undefined||url==""){

    $("#resultRow").hide();
    $("#resultDetails").hide();
    $("#warning-message").html("Place an URL in the text field to begin summarization.");
    $("#warning-wrapper").show();
    $("#textfield").val("");
  }
  else{
  var target = $('#submit-btn-id');
  target.attr('data-og-text', target.html()).html("<i class='fa fa-cog fa-spin'></i>");
  $.ajax({
    type: "POST",
    // url: "http://localhost:5000/api/scraper",
    url: "https://peaceful-brushlands-95589.herokuapp.com/api/scraper",
    data: {url: url},
    success: function(response){
      // console.log(response);
      if(response.error_status==false){
      target.html(target.attr('data-og-text'));
      $("#word-counter").html(response.words);
      $("#alert-wrapper").hide();
      $("#warning-wrapper").hide();
        // $("#word-counter").focus();
      $("#compression").html(response.compression);
      $("#result-title").html(response.title);
      $("#result").html(response.summary);
      $("#resultRow").show();
      $("#resultDetails").show();
      $("#textfield").val("");
      }
      else{
        target.html(target.attr('data-og-text'));
        $("#warning-wrapper").hide();
        $("#resultRow").hide();
        $("#resultDetails").hide();
        $("#alert-message").html(response.error);
        $("#alert-wrapper").show();
        $("#textfield").val("");
      }
    },
    dataType: "JSON"
    });
  }
}
