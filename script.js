let app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
  $scope.valid = false;

  $scope.names = [
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Thriller",
    "Romance",
    "Westerns",
    "Dystopian",
    "Contemporary",
  ];

  $scope.close = function () {
    $scope.valid = false;
  };

  $scope.formReset = function () {
    $scope.name = "";
    $scope.selectedGenre = "";
    $scope.pages = "";
    $scope.price = "";
    $scope.valid = false;
  };

  $scope.submit = async function () {
    try {
      let data = {
        name: $scope.name,
        genre: $scope.selectedGenre,
        numberPages: $scope.pages,
        price: $scope.price,
      };
      if (!data.name || !data.genre || !data.numberPages) {
        throw new Error("Invalid form validation");
      } else {
        await $http
          .post("http://localhost:3000/books", JSON.stringify(data))
          .then(function (res) {
            console.log(res);
            if (res.statusText === "OK") $scope.valid = true;
            else throw new Error("Something went wrong");
          });
      }
    } catch (err) {
      console.error(err);
      $scope.errorMessage = err.data;
    }
  };
});
