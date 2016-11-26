(function() {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$http', 'ApiPath', 'MenuService'];

    function SignUpController($http, ApiPath, MenuService) {
        var signup = this;
        signup.aleardySignedUp = MenuService.getUser().firstName ? true : false;
        signup.basePath = "https://davids-restaurant.herokuapp.com";
        signup.user = {};

        signup.submit = function() {
            return MenuService.getMenuItem(signup.user.favoriteDish).success(function(response) {
                signup.user = {
                    firstName: signup.user.firstName,
                    lastName: signup.user.lastName,
                    email: signup.user.email,
                    phone: signup.user.phone,
                    favoriteDish: signup.user.favoriteDish,
                    menuItem: {
                        name: response.name,
                        description: response.description,
                        short_name: response.short_name
                    }
                };
                
                MenuService.saveUser(signup.user);
                signup.valid = true;
            }).error(function() {
                signup.invalidFavoriteDish = true;
            });
        };
    }


})();
