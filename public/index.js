$(document).ready(function() {
    $('.slideDiv').on("click", function(){ $(this).slideUp();});
    $("button").on("click", function() { $(".el").after($(this)); });
});

$(".el").on("mouseleave", function() {
    $(this).css("background-color","blue");
});
        
$(".el").on("mouseenter", function() {
    $(this).css("background-color","red");
});


function doXMLHttpRequest() {
  var xhr = new XMLHttpRequest(); 

  xhr.onreadystatechange=function()  {
   if (xhr.readyState==4) {
     if(xhr.status == 200) {
        processResponse(xhr.responseText);
    } else {
      responseArea.innerHTML="Error code " + xhr.status;
    }
   }
  }
  xhr.open("GET", "data.json", true); 
  xhr.send(null); 
} 

function processResponse(responseJSON) {
        var responseObject = JSON.parse(responseJSON);
        var displayText = 
                "Today's Prices: " 
                + responseObject.stocks.length 
                + " stocks:<ol>";
        for (var i = 0; i<responseObject.stocks.length; i++) {
                var stock = responseObject.stocks[i];
                displayText += "<li>"
                                        +stock.stockName + " " 
                                        + stock.price + "<\/li>";
        }
        displayText += "<\/ol>";
        document.getElementById("responseArea").innerHTML = displayText;
}

