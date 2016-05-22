'use strict';

/* App Module */

var contactsApp = angular.module('contactsApp', [
    'ngRoute',
    'ArrayDataProvider',
    'ActiveRecordModule',
    'contactsAnimations',
    'angular.filter',
    'contactsControllers',
    'contactsServicesModule'
]);

contactsApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/contacts', {
                    templateUrl: 'partials/contacts-list.html',
                    controller: 'ContactsListCtrl'
                }).
                when('/contacts/new', {
                    templateUrl: 'partials/contacts-add.html',
                    controller: 'ContactsAddCtrl'
                }).
                when('/contacts/:id/edit', {
                    templateUrl: 'partials/contacts-edit.html',
                    controller: 'ContactsEditCtrl'
                }).
                otherwise({
                    redirectTo: '/contacts'
                });
    }]);
