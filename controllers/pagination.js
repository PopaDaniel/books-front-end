// Code goes here

var myApp = angular.module("myApp", ["angularUtils.directives.dirPagination"]);

function MyController($scope, $http) {
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.books = [];

  $http({
    method: "GET",
    url: "http://localhost:3000",
  }).then(
    function successCallback(response) {
      const { data } = response;
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        $scope.books.push(
          `book ${i + 1} : Name: ${data[i].name} | Price: ${
            +data[i].price ? data[i].price + " " + "Euro" : data[i].price
          } | Genre: ${data[i].genre} | Pages: ${data[i].numPages}`
        );
      }
    },
    function errorCallback(response) {
      console.error(response);
    }
  );

  $scope.pageChangeHandler = function (num) {
    console.log("books page changed to " + num);
  };
}

function OtherController($scope) {
  $scope.pageChangeHandler = function (num) {
    console.log("going to page " + num);
  };
}

myApp.controller("MyController", MyController);
myApp.controller("OtherController", OtherController);
