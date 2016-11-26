(function() {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['$http', 'ApiPath', 'MenuService'];

    function MyInfoController($http, ApiPath, MenuService) {
        var myinfo = this;
        myinfo.registered = false;
        myinfo.user = MenuService.getUser();
        console.log(myinfo.user);
        if (!myinfo.user.firstName) {
            myinfo.registered = true;
        }
    }

})();
