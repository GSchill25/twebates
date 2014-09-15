

//Load Json with jquery
$(function refresh() {    // do once original document loaded and ready
                $.getJSON("http://btc.blockr.io/api/v1/coin/info", function(responseObject, diditwork) {
                        console.log(diditwork);
                        var displayText = responseObject.data.coin.name             
                $("#responseArea2").html(displayText);
                } );  // getJSON
  } ); // onReady

$(document).ready(function(){
    window.setInterval(refresh, 2000);
});