'use strict';
//
///* Controllers */
//
var contactsControllers = angular.module('contactsControllers', []);


contactsControllers.controller('ContactsListCtrl', function ($scope, $location, contactsServices) {
    $scope.contacts = contactsServices.find().toArray();

    $scope.deleteContact = function (id) {

        var bool = confirm('Are you sure ?');
        if (bool) {
            if (contactsServices.delete(id)) {
                $location.path("/contacts");

            }
        }


    }
   
}).controller('ContactsAddCtrl', function ($scope, $location, contactsServices) {

    $scope.contact =
            {
                id: null,
                name: '',
                address: '',
                phone: ''
            };

    $scope.addContact = function () {
        $scope.contact.id = contactsServices.getIncrementId();
        if (contactsServices.save(null, $scope.contact)) {
            $location.path("/contacts");
        }

    }

}).controller('ContactsEditCtrl', function ($scope, $location, $routeParams, contactsServices) {

    var model = contactsServices.find($routeParams.id);
    $scope.contact = {
        id: model.__get('id'),
        name: model.__get('name'),
        address: model.__get('address'),
        phone: model.__get('phone')
    };

    $scope.editContact = function () {
        if (contactsServices.save($routeParams.id, $scope.contact)) {
            $location.path("/contacts");
        }

    }

});