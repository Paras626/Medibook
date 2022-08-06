var module = angular.module("myModule", []);
module.controller("myController", function ($scope, $http) {


    $scope.jsonAry = [];

    $scope.fetchalluser = function () { //alert("hy");
        $http.get("/fetch-all-user").then(fxsucess, function (response) {
            alert(response.data);


        });
        function fxsucess(response) {
            //alert(JSON.stringify(response.data));
            $scope.jsonAry = response.data;
        }

    }

    $scope.block = function (email, status) {



        var status = 0;

        var url = "/blockstatus?emaill=" + email + "&statuss=" + status;



        $http.get(url).then(fxsucess, function (response) {
            alert(response.data);
        });

        function fxsucess(response) {
            // alert(response.data)
            $scope.fetchalluser();
        }
    }
    $scope.resume = function (email, status) {
        var status = 1;

        var url = "/resumestatus?emaill=" + email + "&statuss=" + status;

        $http.get(url).then(fxsucess, function (response) {
            alert(response.data);
        });
        function fxsucess(response) {
            // alert(response.data)
            $scope.fetchalluser();
        }
    }

})