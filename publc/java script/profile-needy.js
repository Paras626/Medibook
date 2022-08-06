$(document).ready(function () {
    var activeuser = localStorage.getItem("activeuser");
    $("#txtemail").val(activeuser).prop("readonly", true);
    //=========================== Validations=============================================
    $("#txtemail").blur(function () {


        var email = $(this).val();
        var r = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (r.test(email) == true)
            $(this).css("background-color", "grey");
        else
            $(this).css("background-color", "red");

    });
    $("#txtname").blur(function () {


        var email = $(this).val();
        var r = /^[a-zA-Z ]*$/;

        if (r.test(email) == true)
            $(this).css("background-color", "grey");
        else
            $(this).css("background-color", "red");

    });
    $("#mobile").blur(function () {


        var email = $(this).val();
        var r = /^[7-9]{1}[0-9]{9}$/;

        if (r.test(email) == true)
            $(this).css("background-color", "grey");
        else
            $(this).css("background-color", "red");

    });
    // $("#address").blur(function () {


    //     var email = $(this).val();
    //     var r = /^[a-zA-Z ]*$/;

    //     if (r.test(email) == true)
    //         $(this).css("background-color", "grey");
    //     else
    //         $(this).css("background-color", "red");

    // });

    //====================================================================================
    $('#city').append($('<option>', {
        value: '0',
        text: 'Select City',
    }, '</option>'));


    $('#state').change(function () {
        var s = $(this).val();
        if (s == 'Select State') {
            $('#city').empty();
            $('#city').append($('<option>', {
                value: '0',
                text: 'Select City',
            }, '</option>'));
        }
        var city_arr = c_a[s].split("|");
        $('#city').empty();

        $.each(city_arr, function (j, item_city) {
            $('#city').append($('<option>', {
                value: item_city,
                text: item_city,
            }, '</option>'));
        });


    });
    //=================================================================================================================
    $("#state").change(function () {
        //alert("hy");
        $("#proof").attr('disabled', false);
    })
    //================================================================================
    //============================================================ search button================
    $("#srchbtn").click(function () {
        //alert("hy");
        var email = $("#txtemail").val();
        var url = "/chkneedydata?txtemail=" + email;
        $.getJSON(url, function (response) {

            //alert(JSON.stringify(response));
            //==================================================
            if (response.length != 0) {
                $("#save").fadeOut();
                alert(JSON.stringify(response));
            }
            else {
                $("#save").fadeIn();
                alert("Not Found");
                $("#update").fadeOut();
            }


            //====================================

            $("#txtname").val(response[0].name);
            $("#mobile").val(response[0].mobile);
            $("#address").val(response[0].address);


            $("#proof").attr('disabled', false);
            $("#proof").val(response[0].prooftype);
            $("#time").val(response[0].timmings);
            $("#state").val(response[0].state);
            $("#city").val(response[0].city);




            //$("#prev").prop("src","uploads/"+responsekuchJSONAryobj[0].profile);
            $("#pr").prop("src", "uploads/" + response[0].proofpic);
            $("#profile").prop("src", "uploads/" + response[0].profilepic);

            $("#hdn").val(response[0].proofpic);
            $("#hdn1").val(response[0].profilepic);
             $("#proofpic").val(response[0].proofpic);
            //$("#profilepic").val(response[0].profilepic);
            //$("#state" Option:selected).val(response[0].state);
            //  $("#city").val(response[0].city);



        })
    })
    //===========================================================================

});
// Cities
var c_a = new Array();
c_a['Chhattisgarh'] = "Select|Raipur|Bilaspur|Korba|Dhamtri";
c_a['Nagaland'] = "Select|kohima|Dimapur|Wokha|Mokokchung";
c_a['Odisha'] = "Select|Bhubneshwar|Cuttack|Bhadrak|Brahmapur";
c_a['Jharkhand'] = "Select|Ranchi|Bokaro Steel City|Dhanbad|Jamshedpur";
c_a['Andhra Pradesh'] = "Select|Vijayawada|Kakinada|Tirupati|Eluru";
c_a['Karnataka'] = "Select|Bengaluru|Hassan|Gadag|Chikkamagaluru";
c_a['Tamil Nadu'] = "Select|Chennai|Madurai|Tiruchirappalli|Coimbatore";
c_a['Sikkim'] = "Select|Geyzing|Gangtok|Namchi|Singtam";
c_a['Mizoram'] = "Select|Aizawl|Lunglei|Serchhip|Champai";
c_a['Goa'] = "Select|Panaji|Margao|Mormugao|Mapusa";
c_a['West Bengal'] = "Select|Kolkata|Durgapur|Asansol|Berhampore";
c_a['Gujarat'] = "Select|Porbandar|Junagadh|Surat|Verval";
c_a['Madhya Pradesh'] = "Select|Bhopal|Jabalpur|Gwalior|Dewas";
c_a['Maharashtra'] = "Select|Mumbai|Aurangabad|Kolhapur|Nagpur";
c_a['Rajasthan'] = "Select|Jaipur|Jodhpur|Udaipur|Bikaner";
c_a['Bihar'] = "Select|Gaya|Muzaffarpur|Kishunganj|Darbhanga";
c_a['Assam'] = "Select|Guwahati|Haflong|Sonitpur|Diphu";
c_a['Arunachal Pradesh'] = "Select|East Siang|Hawai|Roing|Khonsa";
c_a['Kerala'] = "Select|Kochi|Thrissur|Kozhikode|Thiruvanthapuram";
c_a['Punjab'] = "Select|Bathinda|Ludhiana|Barnala|Amritsar|Pahankot";



function loadproof(ref) {
    var image = document.getElementById("pr");
    image.src = URL.createObjectURL(ref.files[0]);
    // alert("pr");// imp

}
function loadprofile(ref) {
    var image = document.getElementById("profile");
    image.src = URL.createObjectURL(ref.files[0]);
    //alert("profile");// imp

}
