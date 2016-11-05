(function() {
    "use strict";

    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.errorMessageBuy = "";
        toBuyList.errorMessageBought = "Nothing bought yet.";

        toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
        toBuyList.boughtItem = function(itemIndex) {
            try {
                ShoppingListCheckOffService.boughtItem(itemIndex);
            } catch (error) {
                toBuyList.errorMessageBuy = error.message;
            }

            try {
                ShoppingListCheckOffService.checkBouthItems();
            } catch (error) {
                toBuyList.errorMessageBought = error.message;
            }
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [{
            name: "Cookies",
            quantity: 5
        }, {
            name: "Chips",
            quantity: 8
        }, {
            name: "Cookies",
            quantity: 100
        }];

        var boughtItems = [];

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };

        service.boughtItem = function(itemIndex) {
            if (toBuyItems.length > 0) {
                var item = toBuyItems[itemIndex];
                toBuyItems.splice(itemIndex, 1);
                boughtItems.push(item);
            }

            if (toBuyItems.length === 0) {
                throw new Error("Everything is bought!");
            }
        };

        service.checkBouthItems = function() {
            if (boughtItems.length !== 0) {
                throw new Error("");
            }
        };
    }
})();
