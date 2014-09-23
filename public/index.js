

function refreshBTC() { 
                $.get("http://btc.blockr.io/api/v1/coin/info", function(responseObject, diditwork) { //Get info from blockr.io
                        console.log(diditwork);
                        var percentChangeCoin = Math.round(responseObject.data.markets.coinbase.daily_change.perc * 100)/100; 
                        var displayTextCoin = responseObject.data.markets.coinbase.daily_change.value + " " + percentChangeCoin + "%";
                        var percentChangebtce = Math.round(responseObject.data.markets.btce.daily_change.perc * 100)/100; 
                        var displayTextbtce =  responseObject.data.markets.btce.daily_change.value + " " + percentChangebtce + "%";
                        var percentChangeStamp = Math.round(responseObject.data.markets.bitstamp.daily_change.perc * 100)/100; 
                        var displayTextStamp= responseObject.data.markets.bitstamp.daily_change.value + " " + percentChangeStamp + "%"; 
                        //Store price and 24 hour percent change for bitcoin from 3 different exchanges   
                $("#responseArea1").html(displayTextCoin);
                color(".color1", percentChangeCoin);
                $("#responseArea2").html(displayTextbtce);
                color('.color5', percentChangebtce);
                $("#responseArea3").html(displayTextStamp);
                color(".color9", percentChangeStamp);
                //Place info in appropriate table cell and call color function to display correct color on heatmap
                } );
  };

  function refreshLTC() {
                $.get("http://ltc.blockr.io/api/v1/coin/info", function(responseObject, diditwork) { //Get info from blockr.io
                        console.log(diditwork);
                        var percentChangeCoin = Math.round(responseObject.data.markets.btcchina.daily_change.perc * 100)/100; 
                        var displayTextCoin =  responseObject.data.markets.btcchina.daily_change.value + " " + percentChangeCoin + "%";
                        var percentChangebtce = Math.round(responseObject.data.markets.btce.daily_change.perc * 100)/100; 
                        var displayTextbtce = responseObject.data.markets.btce.daily_change.value + " " + percentChangebtce + "%";
                        //Store price and 24 hour percent change for litecoin from 2 different exchanges     
                $("#responseArea4").html(displayTextCoin);
                color(".color2", percentChangeCoin);
                $("#responseArea5").html(displayTextbtce);
                color(".color6", percentChangebtce);
                //Place info in appropriate table cell and call color function to display correct color on heatmap
                } ); 
  }; 

  function refreshDGC() { 
                $.get("http://dgc.blockr.io/api/v1/coin/info", function(responseObject, diditwork) { //Get info from blockr.io
                        console.log(diditwork);
                        var percentChangeCoin = Math.round(responseObject.data.markets.virculex.daily_change.perc * 100)/100; 
                        var displayTextCoin =  responseObject.data.markets.virculex.daily_change.value + " " + percentChangeCoin + "%";
                        var percentChangebtce = Math.round(responseObject.data.markets.btc38.daily_change.perc * 100)/100; 
                        var displayTextbtce = responseObject.data.markets.btc38.daily_change.value + " " + percentChangebtce + "%";
                        var percentChangeStamp = Math.round(responseObject.data.markets.vircurex.daily_change.perc * 100)/100; 
                        var displayTextStamp= responseObject.data.markets.vircurex.daily_change.value + " " + percentChangeStamp + "%";
                        //Store price and 24 hour percent change for digitalcoin from 3 different exchanges      
                $("#responseArea7").html(displayTextCoin);
                color(".color3", percentChangeCoin);
                $("#responseArea8").html(displayTextbtce);
                color(".color7", percentChangebtce);
                $("#responseArea9").html(displayTextStamp);
                color(".color11", percentChangeStamp);
                //Place info in appropriate table cell and call color function to display correct color on heatmap
                } );
  };

  function refreshQRK() {
                $.get("http://qrk.blockr.io/api/v1/coin/info", function(responseObject, diditwork) { //Get info from blockr.io
                        console.log(diditwork);
                        var percentChangeCoin = Math.round(responseObject.data.markets.bter.daily_change.perc * 100)/100; 
                        var displayTextCoin =  responseObject.data.markets.bter.daily_change.value + " " + percentChangeCoin + "%";
                        var percentChangebtce = Math.round(responseObject.data.markets.btc38.daily_change.perc * 100)/100; 
                        var displayTextbtce = responseObject.data.markets.btc38.daily_change.value + " " + percentChangebtce + "%";
                        var percentChangeStamp = Math.round(responseObject.data.markets.vircurex.daily_change.perc * 100)/100; 
                        var displayTextStamp= responseObject.data.markets.vircurex.daily_change.value + " " + percentChangeStamp + "%";
                        //Store price and 24 hour percent change for quarkcoin from 3 different exchanges    
                $("#responseArea10").html(displayTextCoin);
                color(".color4", percentChangeCoin);
                $("#responseArea11").html(displayTextbtce);
                color(".color8", percentChangebtce);
                $("#responseArea12").html(displayTextStamp);
                color(".color12", percentChangeStamp);
                //Place info in appropriate table cell and call color function to display correct color on heatmap
                } ); 
  }; 


function color(tdString, percent){ //color function takes in the id of a table cell and the percent change
    if (percent > 0.25 && percent <= 2.50){
        $(tdString).addClass("lightgreen");
    }
    else if (percent > 2.50){
        $(tdString).addClass("green");
    }
    else if (percent < -0.25 && percent >= -2.50){
        $(tdString).addClass("lightred");
    }
    else if (percent< -2.50){
        $(tdString).addClass("red");
    }
    else{
        $(tdString).addClass("gray");
    }
    //color the table cell gray for a very small change, a shade of red for a negative change, or a shade of green for a positive change

};

function main(){
    refreshBTC();
    refreshLTC();
    refreshDGC();
    refreshQRK();
    //initialize the table by getting all the values from blockr.io
    window.setInterval(refreshBTC, 60000); //refresh once a minute
    window.setInterval(refreshLTC, 60000); //refresh once a minute
    window.setInterval(refreshDGC, 60000); //refresh once a minute
    window.setInterval(refreshQRK, 60000); //refresh once a minute
};

$(document).ready(function(){
    main() //call the main function
});

$(function() {   
    $('form[name="d"] input').click(function() { //on click
                $.getJSON("data.json", function(responseObject, diditwork) { //load data.json (local file)
                        console.log(diditwork);
                        var displayText = "<ul>"
                        for (var i = 0; i<responseObject.pageDescription.length; i++) {
                                var sentence = responseObject.pageDescription[i];
                                displayText += "<li>"+ sentence.item + "<\/li>"; //display each array item as a sentence in a list
                                }
                        displayText += "<\/ul>";
                $("#responseDescription").html(displayText);
                } );  // getJSON
    } );  // click
    main()
} ); // onReady

$(function() {  
    $('#bitcoin').mouseover(function(){
        $(this).text("Bitcoin"); //Display full name of coin on mousover
    });
    $('#bitcoin').mouseleave(function(){
        $(this).text("BTC");
    });
    $('#litecoin').mouseover(function(){
        $(this).text("Litecoin"); //Display full name of coin on mousover
    });
    $('#litecoin').mouseleave(function(){
        $(this).text("LTC");
    });
    $('#digitalcoin').mouseover(function(){
        $(this).text("Digitalcoin"); //Display full name of coin on mousover
    });
    $('#digitalcoin').mouseleave(function(){
        $(this).text("DGC");
    });
    $('#quarkcoin').mouseover(function(){
        $(this).text("Quarkcoin"); //Display full name of coin on mousover
    });
    $('#quarkcoin').mouseleave(function(){
        $(this).text("QRK");
    });
    $('td').on("click", function(){
        $(this).addClass("increase"); //Increase size of table cells by adding class on click
    });
    $('img').on("click", function(){
        $(this).slideUp(); //Have Images slideUp on click
    });
} );





