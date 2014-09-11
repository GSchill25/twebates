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

