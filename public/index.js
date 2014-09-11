$(document).ready(function() {
    $('.slideDiv').on("click", function(){ $(this).slideUp();});
    $(".color").on("mouseleave", function() {
    $(this).css("background-color","blue");});   
    $(".color").on("mouseenter", function() {
    $(this).css("background-color","red");});
    $("#green").css("background-color", "green").show("slow");
    $("#fadeIn").fadeIn("slow");
    $("p").css("font-style", "italic");
    $("fadeIn").css("font-size", "50px");
    $(".color").on("click", function(){ $(this).slideToggle();});
    $("#eg2").on("click", function(){ $(this).fadeOut();});
    $("img").animate({ opacity: 0.25 }, 5000).css("float", "right");
    $("#insert").html("<p>This paragraph is added with jquery</p>");
     $('form[name="default"] input').val("Default Value inserted with jquery");
});



//Load Json without jquery
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


//Load Json with jquery
$(function() {    // do once original document loaded and ready
        $('form[name="eg2"] input').click(function() {
                $.getJSON("data2.json", function(responseObject, diditwork) {
                        console.log(diditwork);
                        var displayText = 
                                "There are " 
                                + responseObject.assignments.length 
                                + " assignments:<ul>";
                        for (var i = 0; i<responseObject.assignments.length; i++) {
                                var assignment = responseObject.assignments[i];
                                displayText += "<li>"
                                                        + assignment.aName + " " 
                                                        + assignment.dueDate + "<\/li>";
                                }
                        displayText += "<\/ul>";
                $("#responseArea2").html(displayText);
                } );  // getJSON
        } );  // click
  } ); // onReady

