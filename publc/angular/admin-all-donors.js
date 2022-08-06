var module = angular.module("myModule", []);
module.controller("myController", function ($scope, $http) {


    $scope.jsonAry = [];

    $scope.alldonors = function () { //alert("hy");
        $http.get("/all-donor-data").then(fxsucess, function (response) {
            alert(response.data);


        });
        function fxsucess(response) {
            //alert(JSON.stringify(response.data));
            $scope.jsonAry = response.data;
        }

    }

     $scope.donordelete = function (email) {


     var url = "/deletedonor?emailid="+email;



         $http.get(url).then(fxsucess, function (response) {
             alert(response.data);
         });

         function fxsucess(response) {
              alert(response.data)
          $scope.alldonors();
         }
     }
    
})