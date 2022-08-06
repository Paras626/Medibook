$(document).ready(function(){
    //========================
    var activeuser=localStorage.getItem("activeuser");
      $("#txteml").val(activeuser).prop("readonly",true); 
    //===================

    $("#savepwd").click(function(req,res){
      var email=$("#txteml").val();
      var npwd=$("#npwd").val();
      var opwd=$("#opwd").val();
      if (email == "" || npwd == "" || opwd == "") { return; }
    else {
      var url="/makenewpwd?email="+email+"&npwd="+npwd+"&opwd="+opwd;  
      // sending values
      $.get(url,function(respond){
        alert(respond);
      })
    }
    })
  
//====================================================================
$("#profile").click(function(req,resp){
location.href="profile-donor.html" // new thing
})
//===============================================
$("#avail").click(function(req,resp){
location.href="avail-medicine.html"; // new thing
})
$("#manager").click(function(req,resp){
location.href="donor-med-manager.html"; // new thing
})
//======================================= log out toh baad user chlee naa
$("#logout").click(function(){
localStorage.removeItem("activeuser");
location.href="login,signup.html";
})

///////////////////////////////
//==============================validations=============
$("#txteml").blur(function () {


var email = $(this).val();
var r = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

if (r.test(email) == true)
$(this).css("background-color", "grey");
else
$(this).css("background-color", "red");

});
$("#opwd").blur(function () {
var x = $(this).val();
var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

if (r.test(x) == true)
$(this).css("background-color", "grey");
else
$(this).css("background-color", "red");


});
$("#npwd").blur(function () {
var x = $(this).val();
var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

if (r.test(x) == true)
$(this).css("background-color", "grey");
else
$(this).css("background-color", "red");


});
//===================================

  })

  function dofill() {
  //SUM
  var va = document.getElementById("txteml").value;
  /* this is also way to take value---i.e. keyword getElementById*/

  var vb = document.getElementById("opwd").value;
  /*jb b querySelector use krna we need to insert ----------#id----------------*/
  /* keyword-- querrySelector  can also be used*/
  /*-------------------LATEST WAY-----------------*/
  var vc = document.getElementById("npwd").value;

  // J khaali rehje taa run naa hovee
  if (va == "" || vb == "" || vc == "") {
    alert("Fill Full Form PLEASE.......");
    return;
  }
}