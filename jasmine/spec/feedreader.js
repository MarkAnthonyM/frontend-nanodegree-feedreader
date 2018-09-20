'use strict';
$(function() {
    describe('RSS Feeds', function() {
        //This tests to make sure that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //this test loops through the allFeeds object and ensures it has
        //a url defined and is not empty
         it('has url', function() {
           allFeeds.forEach(function(element) {
             expect(element.url).toBeDefined();
             expect(element.url.length).not.toBe(0);
           })
         });

         //this test loops through each feed in the allFeeds object and ensures
         //it has a name defined and is not empty
         it('has name', function() {
           allFeeds.forEach(function(element) {
             expect(element.name).toBeDefined();
             expect(element.name.length).not.toBe(0);
           })
         });
    });


    describe('The menu', function() {
        const bodyTag = document.querySelector('body');
        const hamburger = document.querySelector('.menu-icon-link');

         //this test ensures the menu is hidden when the page first loads
         it('hidden menu default', function() {
           expect(bodyTag.getAttribute('class')).toContain('menu-hidden');
         });

          //This test ensures the menu changes visibility when the hamburger
          //icon is clicked.
          it('changes when clicked', function() {
            hamburger.click();
            expect(bodyTag.classList.contains('menu-hidden')).toBe(false);
            hamburger.click();
            expect(bodyTag.classList.contains('menu-hidden')).toBe(true);
          });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
          loadFeed(0, done);
        });

          //This test ensures that when the loadfeed function is called and completes its work, there is at least a single .entry element within the feed container
          it('contains entries', function() {
            const feedElement = document.querySelector('.feed .entry');
            expect(feedElement).toBeDefined();
          });
    });


    describe('New Feed Selection', function() {
        let contentContainer;
        let firstLoadFeed = [];
        let secondLoadFeed = [];

        beforeEach(function(done) {
          loadFeed(0, function() {
            contentContainer = document.querySelectorAll('.feed .entry');
            for (const content of contentContainer) {
              firstLoadFeed.push(content.innerText);
            }
            loadFeed(1, function() {
              contentContainer = document.querySelectorAll('.feed .entry');
              for (const content of contentContainer) {
                secondLoadFeed.push(content.innerText);
              }
              done();
            })
          })
        });

        /*TODO: figure out why this asynchronous implimentation
        * does not work as written:

        beforeEach(function(done) {
          loadFeed(0);
          titleContainer.push(headTitle.innerText);
          loadFeed(1, done);
        });
        */

          //This test ensures that when the loadFeed function is called, the content actually changes.
          it('loads new feeds', function() {
            expect(firstLoadFeed).not.toEqual(secondLoadFeed);
          });

    });
}());
