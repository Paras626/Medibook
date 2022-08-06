$(document).ready(function () {
  //===========================================================
  $("#signbtn").click(function () {
    var email = $("#txtemail").val();
    var pwd = $("#txtpwd").val();
    var user = $("#txtuser").val();
    if (email == "" || pwd == "" || user == "") { return; }
    else {
      var url = "/recorddata?txtemail=" + email + "&txtpwd=" + pwd + "&txtuser=" + user;
      //sending signup data ---------------------1
      $.get(url, function (respkuch) {
        alert(respkuch);    // ajax dey vich string return hunda
      })
    }
  })
  //===========================================================
  $("#logbtn").click(function () {
    var email = $("#txtemail1").val();
    var pwd = $("#txtpwd1").val();
    if (email == "" || pwd == "") {
      return;
    }
    else {
      var url = "/chklogin?txtemail=" + email + "&txtpwd=" + pwd;
      //sending login details--------------------2
      $.getJSON(url, function (jsonAry) {  // json dey vicho vaps awnda hai array
        // alert(JSON.stringify(jsonAry));
        if (jsonAry.length === 0) {
          alert("invalid email/password or expired");
        }
        else//================================ important ========== local storage ==========================================================
          localStorage.setItem("activeuser", $("#txtemail1").val()); //it means local  saare keete email id ajee
        if (jsonAry[0].utype == "donor") {
          // window.location.replace("/dash-donor.html"); // new thing
          location.href = "dash-donor.html";
        }
        else {
          if (jsonAry[0].utype == "needy")
            location.href = "dash-needy.html"; // new thing
        }

      })
    }
  })
  //========================================================================================
  //==================validations====================

  //  $(".fa").mousedown(function(){ /*it means fa class dey vich*/
  $(".fa").mouseenter(function(){ 
  $(this).removeClass("fa-eye-slash").addClass("fa-eye");
  /* remove krde slash jdo uss teh mouse javee*/
  $("#txtpwd").attr("type", "text"); /*it means password dey vich type apa nu text hee dekhee*/
  /*attr means attire*/
});

$(".fa").mouseleave(function () {

  $(this).removeClass("fa-eye").addClass("fa-eye-slash");
  $("#txtpwd").attr("type", "password");
  /*it means type password dekhe not text*/
});

$(".fa").mouseenter(function(){ 
  $(this).removeClass("fa-eye-slash").addClass("fa-eye");
  /* remove krde slash jdo uss teh mouse javee*/
  $("#txtpwd1").attr("type", "text"); /*it means password dey vich type apa nu text hee dekhee*/
  /*attr means attire*/
});

$(".fa").mouseleave(function () {

  $(this).removeClass("fa-eye").addClass("fa-eye-slash");
  $("#txtpwd1").attr("type", "password");
  /*it means type password dekhe not text*/
});
//====================================
//=================================


//==========================

$("#txtemail").blur(function () {


  var email = $(this).val();
  var r = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (r.test(email) == true) {
    $(this).css("background-color", "grey");
    $("#respserver").html("Good");
    $("#erruid").html("");
    $("#signbtn").fadeIn();
  }
  else {
    $(this).css("background-color", "red");
    $("#erruid").html("Must have @ and full stop");
    $("#respserver").html("Not Available");
    $("#signbtn").fadeOut();

  }

});
$("#txtpwd").blur(function () {
  var x = $(this).val();
  var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  if (r.test(x) == true) {
    $(this).css("background-color", "grey");
    $("#signbtn").fadeIn();
    $("#pwddd").html("Strong");
  }
  else {
    $(this).css("background-color", "red");
    $("#signbtn").fadeOut();
    $("#pwddd").html("Not Available");

  }


});

$("#txtemail1").blur(function () {


  var email = $(this).val();
  var r = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (r.test(email) == true) {
    $(this).css("background-color", "grey");
    $("#respserver1").html("Good");
    $("#erruid1").html("");
    $("#logbtn").fadeIn();

  }
  else {
    $(this).css("background-color", "white");
    $("#erruid1").html("Must have @ and full stop");
    $("#respserver1").html("Not Available");
    $("#logbtn").fadeOut();


  }

});
$("#txtpwd1").blur(function () {
  var x = $(this).val();
  var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  if (r.test(x) == true) {
    $(this).css("background-color", "grey");
    $("#logbtn").fadeIn();
    $("#pwddd1").html("Strong");
    //$(".fa-solid").removeClass(".fa-solid fa-door-closed").addClass(".fa-solid fa-door-open"); 
  }
  else {
    $(this).css("background-color", "white");
    $("#logbtn").fadeOut();
    $("#pwddd1").html("Not Available");
  }


});
    //=================================================

  })

function dofill() {
  //SUM
  var va = document.getElementById("txtemail").value;
  /* this is also way to take value---i.e. keyword getElementById*/

  var vb = document.getElementById("txtpwd").value;
  /*jb b querySelector use krna we need to insert ----------#id----------------*/
  /* keyword-- querrySelector  can also be used*/
  /*-------------------LATEST WAY-----------------*/
  var vc = document.getElementById("txtuser").value;

  // J khaali rehje taa run naa hovee
  if (va == "" || vb == "" || vc == "") {
    alert("Fill Full Form PLEASE.......");
    return;
  }
}
function dochk() {
  //SUM
  var va = document.getElementById("txtemail1").value;
  /* this is also way to take value---i.e. keyword getElementById*/

  var vb = document.getElementById("txtpwd1").value;
  /*jb b querySelector use krna we need to insert ----------#id----------------*/
  /* keyword-- querrySelector  can also be used*/
  /*-------------------LATEST WAY-----------------*/


  // J khaali rehje taa run naa hovee
  if (va == "" || vb == "") {
    alert("Fill Full Form PLEASE.......");
    return;
  }
}