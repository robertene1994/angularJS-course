(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.dishes = "";
        $scope.result = "";

        $scope.check = function() {
            var string = $scope.dishes;

            if (string === "") {
                $scope.result = "Please enter data first";
            } else {
                var items = string.split(',');
                if (items.length <= 3) {
                    $scope.result = "Enjoy!";
                } else {
                    $scope.result = "Too much!";
                }
            }
        };
    }

})();
