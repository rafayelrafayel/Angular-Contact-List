'use strict';

/**
 * author Rafayel Khachatryan
 * @returns {undefined}
 */


describe('Contact App', function () {

    it('should redirect index.html to index.html#/contacts', function () {
        browser.get('app/index.html');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/contacts');
        });
    });


    describe('Contacts list view', function () {

        beforeEach(function () {
            browser.get('app/index.html#/contacts');
        });


        it('should filter the contacts list as a user types into the search box', function () {

            var contactsList = element.all(by.repeater('contact in contacts'));
            var query = element(by.model('query'));

            expect(contactsList.count()).toBe(4);

            query.sendKeys('Bob');
            expect(contactsList.count()).toBe(1);

            query.clear();
            query.sendKeys('B');
            expect(contactsList.count()).toBe(2);
        });


        it('should render contact add from', function () {

            element.all(by.css('.btn-success')).first().click();
            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toEqual('/contacts/new');
            });
        });


        it('should render contact edit from', function () {
            var query = element(by.model('query'));
            query.sendKeys('1');
            element.all(by.css('.contacts tr a')).first().click();
            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toEqual('/contacts/1/edit');
            });
        });

        it('should click contact delete button', function () {
            var query = element(by.model('query'));
            query.sendKeys('1');
            element.all(by.css('.contacts tr a.btn-danger')).first().click();
            browser.switchTo().alert().accept();
            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toEqual('/contacts');
            });
        });

    });
});
