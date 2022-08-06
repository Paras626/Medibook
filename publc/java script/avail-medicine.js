function loadmedicinepic(ref)
{
    var image=document.getElementById("medpic");
    image.src=URL.createObjectURL(ref.files[0]);  
    //alert("profile");// imp

}
$(document).ready(function () {

  //==============================
  var activeuser=localStorage.getItem("activeuser");
        $("#txtemail").val(activeuser).prop("readonly",true); 
  //=============================
$("#txtemail").blur(function () {


var email = $(this).val();
var r = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

if (r.test(email) == true)
  $(this).css("background-color", "grey");
else
  $(this).css("background-color", "red");

});
})