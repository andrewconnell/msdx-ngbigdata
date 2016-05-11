(function () {
  'use strict';

  angular.module('ngPagingBigData')
    .controller('ngPagingBigData.mailController', [
      '$location',
      '$routeParams',
      'ngPagingBigData.msGraphService',
      mailController
    ]);

  function mailController($location, $routeParams, dataService) {
    var vm = this;

    // collection of items
    vm.items = [];
    vm.refreshMail = _refreshMail;
    // paging controls
    vm.pageSize = 10;
    vm.currentPage = 1;
    vm.pagePrev = _pagePrevious;
    vm.pageNext = _pageNext;

    // activate the controller
    _init();

    /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    /**
     * Init the controller.
     */
    function _init() {
      // get all the items
      _getItems();
    }

    /**
     * Refreshes the mail query.
     */
    function _refreshMail() {
      _getItems();
    }

    /**
     * Retrieve a list of items form SharePoint's REST API.
     * 
     * @returns {Promise}    - Angular promise
     * @resolves {Object[]}  - Collection of items from the SharePoint REST API
     */
    function _getItems() {
      return dataService.getMail(vm.pageSize, vm.currentPage)
        .then(function (items) {
          vm.items = items;
        });
    }

    /**
     * Go back one page.
     */
    function _pagePrevious() {
      vm.currentPage = vm.currentPage - 1;
      _getItems();
    }

    /**
     * Go forward one page.
     */
    function _pageNext() {
      vm.currentPage = vm.currentPage + 1;
      _getItems();
    }

  } // function missionController()

})();