$(document).ready(function(){
    var activeuser=localStorage.getItem("activeuser");
    $("#email").val(activeuser).prop("readonly",true); 
})
var module = angular.module("myModule", []);
    module.controller("myController", function ($scope, $http) {

        $scope.listeditems = function () {
            //alert("hy");
            var emailid = document.getElementById("email").value;
            //alert(emailid);
            $http.get("/getlisteditems?emailid=" + emailid).then(fxsucess, function (response) {
                alert(response.data)
            })
            function fxsucess(response) {
                //alert(JSON.stringify(response.data))
                $scope.listedit = response.data;
            }

        }
        $scope.unlist=function(med,index)
        {
            //alert("hy")
            if(confirm("ARE YOU SURE?")==false)
            return;
            var url="/delete-medicine?med="+med;
            
            $http.get(url).then(fxsucess,function(response){
                alert(response.data)

            });
            function fxsucess(response)
            {
                //alert(response.data)
                $scope.listeditems();
            }
            
        }

        


    })