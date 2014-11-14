$(document).ready(function(){
	$('.materialboxed').materialbox();
	getPrice();
    window.setInterval(getPrice, 10000);
});

function getPrice() {
	$.get("http://btc.blockr.io/api/v1/coin/info", function(responseObject, diditwork) { //Get info from blockr.io
                        console.log(diditwork);
    var displayTextCoin = (responseObject.data.markets.coinbase.value).toString();
    var trend = responseObject.data.markets.coinbase.daily_change.diff;
    var percentChange = ((trend/displayTextCoin)*100.0).toFixed(2).toString();
    $("#responseArea1").html(displayTextCoin + "  (" + percentChange + " %)");
    if (trend > 0){
    	$("#up").removeClass("hidden");
    	$("#up").addClass("show");
    	console.log("sent");
    } else {
    	$("#down").removeClass("hidden");
    	$("#down").addClass('show');
    }
	} );
};