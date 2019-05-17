
$(document).ready(function(e){
    
    $("#btn1").click(function(e){
        $.post("examen.html",{value:1});
    });
});