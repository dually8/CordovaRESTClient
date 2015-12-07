/// <reference path="./_app.ts" />

module app {

    'use strict';
    angular.module('restclient', ['ionic', 'ui.bootstrap'])
        .filter('unsafe', function($sce) {
            return $sce.trustAsHtml;
        })
        .controller("RestController", controllers.RestController)
        .controller("AboutController", controllers.AboutController)
        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    window.StatusBar.styleDefault();
                }
            });
        })

        .config(function($stateProvider: ng.ui.IStateProvider,
                         $urlRouterProvider: ng.ui.IUrlRouterProvider,
                         $ionicConfigProvider: ionic.utility.IonicConfigProvider) {
            $ionicConfigProvider.backButton.previousTitleText(false);
            $ionicConfigProvider.tabs.position('bottom');
            $stateProvider

            // setup an abstract state for the tabs directive
                .state('tab', {
                    url: "/tab",
                    abstract: true,
                    templateUrl: "app/tabs.html"
                })

            // Each tab has its own nav history stack:

                .state('tab.rest', {
                    url: '/rest',
                    views: {
                        'tab-rest': {
                            templateUrl: 'app/rest/rest.html',
                            controller: 'RestController as ctrl'
                        }
                    }
                })

                .state('tab.about', {
                    url: '/about',
                    views: {
                        'tab-about': {
                            templateUrl: 'app/about/about.html'
                        }
                    }
                });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/tab/rest');
        });
}
