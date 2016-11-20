(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
            url: '/',
            templateUrl: 'src/menuapp/templates/home.template.html'
        })

        .state('categoriesList', {
            url: '/categories',
            templateUrl: 'src/menuapp/templates/main-categories.template.html',
            controller: 'CategoriesController as categoriesList',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        .state('categoriesList.items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'src/menuapp/templates/main-items.template.html',
            controller: "ItemsController as itemsList",
            resolve: {
                items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                    var category = $stateParams.categoryShortName;
                    return MenuDataService.getItemsForCategory(category)
                        .then(function(result) {
                            return result.menu_items;
                        });
                }]
            }
        });
    }

})();
