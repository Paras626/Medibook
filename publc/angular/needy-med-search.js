var module = angular.module("myModule", []);
module.controller("myController", function ($scope, $http) {
//==========================================================================================
  $scope.getcity=function()
  {
    $http.get("/getcities").then(fxsucess,function(response){
      alert(response.data)
    })
    function fxsucess(response)
    {
      //alert(JSON.stringify(response.data))
      $scope.cities=response.data;
    }
  }
  //================================================================================================
  $scope.getmedicine=function()
  {
    
   var city=document.getElementById("getcity").value;
   //alert(city);
  $http.get("/fetchmedicine?city="+city).then(fxsucess,function(response){
      alert(response.data)
    })
    function fxsucess(response)
    {
      //alert(JSON.stringify(response.data))
      $scope.med=response.data;
    }
  }
  //===================================================================================
  $scope.donors=function()
  {
    //alert("hy");
   var city=document.getElementById("getcity").value;
   var medicine=document.getElementById("medicine").value;
   //alert(city);
  $http.get("/fetchmedcard?city="+city+"&medicine="+medicine).then(fxsucess,function(response){
      alert(response.data)
    })
    function fxsucess(response)
    {
      alert(JSON.stringify(response.data))
      $scope.medcard=response.data;
    }
  }
  

})