var module = angular.module("myModule", []);
module.controller("myController", function ($scope, $http) {


    $scope.jsonAry = [];

    $scope.allneedy = function () { //alert("hy");
        $http.get("/all-needy-data").then(fxsucess, function (response) {
            alert(response.data);


        });
        function fxsucess(response) {
            //alert(JSON.stringify(response.data));
            $scope.jsonAry = response.data;
        }

    }

     $scope.needydelete = function (email) {


     var url = "/deleteneedy?emailid="+email;



         $http.get(url).then(fxsucess, function (response) {
             alert(response.data);
         });

         function fxsucess(response) {
              alert(response.data)
          $scope.allneedy();
         }
     }
    
})