'use strict';

/* Services 
 * 
 * author Rafayel Khachatryan
 * 
 * */


var ActiveRecordModule = angular.module('ActiveRecordModule', []);
ActiveRecordModule.factory('ActiveRecord', function ($filter) {

    //return literal object
    return {
        records: [],
        //handle when object creates
        __constructur: function (tableName, modelData) {
            var $this = this;
            $this.$modelData = modelData || {},
                    $this.$tableName = tableName || 'contactsData';
            //  Extend params for create a factory in service
            return angular.extend($this, {});

        },
        //overload methods
        __get: function (name) {
            if (this.hasOwnProperty(name)) {
                return this[name];
            }
            return null;
        },
        __set: function (name, value) {
            this[name] = value;
        },
        //attach fields to model
        setModelFields: function (fields) {

            var fields = fields || [],
                    $this = this;
            if (fields.length > 0) {
                for (var i = 0; i < fields.length; i++) {
                    $this.__set(fields[i], null);
                }
            }
            return $this;
        },
        //attach values to model fields
        setAttributes: function (obj) {

            var obj = obj || {},
                    $this = this;
            if (Object.keys(obj).length > 0) {
                angular.forEach(obj, function (value, key) {
                    $this.__set(key, value);
                });
            }
            return $this;
        },
        //get all records or get single record
        find: function (id) {

            var id = id || null,
                    $this = this,
                    model = null;


            if (null !== id) {
                model = ($filter('filter')(this.$modelData, {'id': parseInt(id)}));
                if (model.length !== 0 && Object.keys(model['0']).length > 0) {
                    angular.forEach(model['0'], function (value, key) {
                        $this.__set(key, value);
                    });
                    $this.records = model['0'];
                }
            } else {
                $this.records = $this.$modelData;
            }
            return $this;
        },
        toArray: function () {
            return this.records;
        },
        getIncrementId: function () {
            var obj = ($filter('max')(this.$modelData, 'id')), id = 1;
            if (typeof obj === 'object') {
                id += obj.id
            }
            return id;

        },
        getTableName: function () {
            return this.$tableName;
        },
        //if isset id, update record otherwise insert record
        save: function (id, obj) {
            var id = id || null, $this = this;
            if (null === id) {
                $this.$modelData.push(obj);
            } else {
                $this.$modelData = $this.$modelData.map(function (each) {
                    if (each.id === parseInt(id)) {
                        each = obj;
                    }
                    return each;
                })

            }
            return true;
        },
        //delete record by id
        delete: function (id) {

            var id = id || null;
            this.$modelData = $filter('removeWith')(this.$modelData, {'id': parseInt(id)})
            return true
        }


    }


});




var contactsServices = angular.module('contactsServicesModule', []);
contactsServices.service('contactsServices', function (ActiveRecord, contactsData) {
    var Contacts = ActiveRecord.__constructur('contactsData', contactsData)


    var contactFields = [
        'id',
        'name',
        'address',
        'phone'
    ];


    Contacts.setModelFields(contactFields);

    return Contacts;

});

