'use strict';

/* Directives */
/**
 * author Rafayel Khachatryan
 * @param {type} 
 * @param {type} 
 */


  contactsApp.directive('searchForm', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/directives/searchform.html',
      controller: 'ContactsListCtrl',
    };
  }).directive('newButton', function () {
    return {
      restrict: 'EA',
      template: ' <a href="#/contacts/new" class="btn btn-success pull-right">New</a>',
      
    };
  });