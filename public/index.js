

//Load Json with jquery
function refreshBTC() {    // do once original document loaded and ready
                $.get("http://btc.blockr.io/api/v1/coin/info", function(responseObject, diditwork) {
                        console.log(diditwork);
                        var percentChangeCoin = Math.round(responseObject.data.markets.coinbase.daily_change.perc * 100)/100; 
                        var displayTextCoin = responseObject.data.markets.coinbase.value + " " + percentChangeCoin + "%";
                        var percentChangebtce = Math.round(responseObject.data.markets.btce.daily_change.perc * 100)/100; 
                        var displayTextbtce =  responseObject.data.markets.btce.value + " " + percentChangebtce + "%";
                        var percentChangeStamp = Math.round(responseObject.data.markets.bitstamp.daily_change.perc * 100)/100; 
                        var displayTextStamp= responseObject.data.markets.bitstamp.value + " " + percentChangeStamp + "%";    
                $("#responseArea1").html(displayTextCoin);
                color(".color1", percentChangeCoin);
                $("#responseArea2").html(displayTextbtce);
                color('.color5', percentChangebtce);
                $("#responseArea3").html(displayTextStamp);
                color(".color9", percentChangeStamp);
                } );  // getJSON
  }; // onReady

  function refreshLTC() {    // do once original document loaded and ready
                $.get("http://ltc.blockr.io/api/v1/coin/info", function(responseObject, diditwork) {
                        console.log(diditwork);
                        var percentChangeCoin = Math.round(responseObject.data.markets.btcchina.daily_change.perc * 100)/100; 
                        var displayTextCoin =  responseObject.data.markets.btcchina.value + " " + percentChangeCoin + "%";
                        var percentChangebtce = Math.round(responseObject.data.markets.btce.daily_change.perc * 100)/100; 
                        var displayTextbtce = responseObject.data.markets.btce.value + " " + percentChangebtce + "%";
                        //var percentChangeStamp = Math.round(responseObject.data.markets.bitstamp.daily_change.perc * 100)/100; 
                        //var displayTextStamp= " ";    
                $("#responseArea4").html(displayTextCoin);
                color(".color2", percentChangeCoin);
                $("#responseArea5").html(displayTextbtce);
                color(".color6", percentChangebtce);
                //$("#responseArea3").html(displayTextStamp);
                } );  // getJSON
  }; // onReady

  function refreshDGC() {    // do once original document loaded and ready
                $.get("http://dgc.blockr.io/api/v1/coin/info", function(responseObject, diditwork) {
                        console.log(diditwork);
                        var percentChangeCoin = Math.round(responseObject.data.markets.virculex.daily_change.perc * 100)/100; 
                        var displayTextCoin =  responseObject.data.markets.virculex.value + " " + percentChangeCoin + "%";
                        var percentChangebtce = Math.round(responseObject.data.markets.btc38.daily_change.perc * 100)/100; 
                        var displayTextbtce = responseObject.data.markets.btc38.value + " " + percentChangebtce + "%";
                        var percentChangeStamp = Math.round(responseObject.data.markets.vircurex.daily_change.perc * 100)/100; 
                        var displayTextStamp= responseObject.data.markets.vircurex.value + " " + percentChangeStamp + "%";    
                $("#responseArea7").html(displayTextCoin);
                color(".color3", percentChangeCoin);
                $("#responseArea8").html(displayTextbtce);
                color(".color7", percentChangebtce);
                $("#responseArea9").html(displayTextStamp);
                color(".color11", percentChangeStamp);
                } );  // getJSON
  }; // onReady

  function refreshQRK() {    // do once original document loaded and ready
                $.get("http://qrk.blockr.io/api/v1/coin/info", function(responseObject, diditwork) {
                        console.log(diditwork);
                        var percentChangeCoin = Math.round(responseObject.data.markets.bter.daily_change.perc * 100)/100; 
                        var displayTextCoin =  responseObject.data.markets.bter.value + " " + percentChangeCoin + "%";
                        var percentChangebtce = Math.round(responseObject.data.markets.btc38.daily_change.perc * 100)/100; 
                        var displayTextbtce = responseObject.data.markets.btc38.value + " " + percentChangebtce + "%";
                        var percentChangeStamp = Math.round(responseObject.data.markets.vircurex.daily_change.perc * 100)/100; 
                        var displayTextStamp= responseObject.data.markets.vircurex.value + " " + percentChangeStamp + "%";    
                $("#responseArea10").html(displayTextCoin);
                color(".color4", percentChangeCoin);
                $("#responseArea11").html(displayTextbtce);
                color(".color8", percentChangebtce);
                $("#responseArea12").html(displayTextStamp);
                color(".color12", percentChangeStamp);
                } );  // getJSON
  }; // onReady


function color(tdString, percent){
    if (percent > 0){
        $(tdString).addClass("green");
    }
    else{
        $(tdString).addClass("red");
    }

};


$(document).ready(function(){
    refreshBTC();
    refreshLTC();
    refreshDGC();
    refreshQRK();
    window.setInterval(refreshBTC, 60000);
    window.setInterval(refreshLTC, 60000);
    window.setInterval(refreshDGC, 60000);
    window.setInterval(refreshQRK, 60000);
});