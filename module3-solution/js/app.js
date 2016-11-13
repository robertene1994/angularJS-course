(function() {
    "use strict";

    angular.module("NarrowItDownApp", [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .constant("ApiBasePath", "http://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: "loader/foundItems.html",
            scope: {
                items: "<",
                onRemove: "&"
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;

        list.nothingFound = function() {
            return list.items && list.items.length === 0;
        };
    }


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var list = this;
        list.searchTerm = "";

        list.found = function() {
            MenuSearchService.clearList();
            MenuSearchService.getMatchedMenuItems(list.searchTerm);
            list.items = MenuSearchService.getItems();
        };

        list.removeItem = function(itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var foundItems = [];

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                for (var i = 0; i < result.data.menu_items.length; i++) {
                    var item = result.data.menu_items[i];
                    if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        foundItems.push(item);
                    }
                }
            });
        };

        service.removeItem = function(itemIndex) {
            foundItems.splice(itemIndex, 1);
        };

        service.getItems = function() {
            return foundItems;
        };

        service.clearList = function() {
            foundItems = [];
        };
    }

})();
