'use strict';

/* jasmine specs for controllers go here */

/**
 * author Rafayel Khachatryan
 * @returns 
 */

describe('Contacts Controllers', function () {
    var $rootScope,
            $scope, $controller, $routeParams, $location, contactsServices;
    beforeEach(module('contactsApp'));
    beforeEach(function () {

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            contactsServices = $injector.get('contactsServices');
            $location = $injector.get('$location');
            $controller = $injector.get('$controller');
        });
    });

    describe('ContactsAddCtrl', function () {
        var $scope, cntr;

        beforeEach(function () {

            inject(function ($injector) {
                $scope = $rootScope.$new();
                cntr = $controller('ContactsAddCtrl', {
                    $scope: $scope,
                    $location: $location,
                    contactsServices: contactsServices
                });
            });
        });

        describe('Id', function () {
            it('ID Should be null', function () {
                expect($scope.contact.id).toBe(null);
            });
        });

        describe('Action Handlers', function () {
            describe('Add method', function () {
                it('Should get Increment Id', function () {
                    spyOn(contactsServices, 'getIncrementId').and.returnValue(1);
                    expect(contactsServices.getIncrementId()).toBe(1);

                });
                it('Should call save method with mentioned paramaters', function () {
                    spyOn(contactsServices, 'save').and.callThrough();
                    $scope.addContact();
                    expect(contactsServices.save).toHaveBeenCalledWith(null, $scope.contact);
                });
            });
        });
    });

    describe('ContactsEditCtrl', function () {
        var $scope, cntr, $routeParams;

        beforeEach(function () {

            inject(function ($injector) {
                $scope = $rootScope.$new();
                $routeParams = {'id': 55555};
                cntr = $controller('ContactsEditCtrl', {
                    $scope: $scope,
                    $location: $location,
                    contactsServices: contactsServices,
                    $routeParams: $routeParams
                });
            });
        });

        describe('Id', function () {
            it('ID Should  be a number', function () {
                expect($routeParams['id']).toBe(55555);
            });
        });

        describe('get contact model by id', function () {
            it('ID Should  be a contact object', function () {
                var idObject = {'id': 55555},
                expectObject = {
                    id: 55555,
                    name: 'Ben',
                    address: 'Ben\'s address',
                    phone: '565656565'
                };
                spyOn(contactsServices, 'find').and.returnValue(expectObject);
                expect(contactsServices.find()).toBe(expectObject);

            });
        });

        describe('Action Handlers', function () {
            describe('Edit method', function () {

                it('Should call save method with mentioned paramaters', function () {
                    spyOn(contactsServices, 'save').and.callThrough();
                    $scope.editContact();
                    expect(contactsServices.save).toHaveBeenCalledWith(55555, $scope.contact);
                });
            });
        });
    });

});

