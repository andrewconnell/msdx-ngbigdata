(function () {
  'use strict';

  angular.module('ngPagingBigData')
    .service('ngPagingBigData.msGraphService', [
      '$http',
      '$q',
      msGraphService
    ]);

  /**
   * @constructor
   * @param  {Object} $http - Angular's $http service
   * @param  {Object} $q    - Angular's promise service
   */
  function msGraphService($http, $q) {
    var deletedItemsFolderId = null;

    return {
      getMail: getMail
    };

    /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    /**
     * Get the ID of the user's "Deleted Items" folder.
     * 
     * @returns   {Promise}      - Angular promise
     * @resolves  {string}       - ID of the Deleted Items folder
     */
    function getDeletedItemsFolderId() {
      var deferred = $q.defer();

      if (deletedItemsFolderId != null) {
        deferred.resolve(deletedItemsFolderId);
      } else {
        var query = 'https://graph.microsoft.com/v1.0/me/mailFolders' +
          '?$select=id' +
          '&$filter=displayName eq \'Deleted Items\'';
        var getOptions = {
          url: query,
          headers: {
            'Accept': 'application/json;odata.metadata=minimal'
          }
        }
        // issue query
        $http(getOptions)
          .success(function (response) {

            deferred.resolve(response.value[0].id);
          });
      }

      return deferred.promise;
    }

    /**
     * Returns a collection of items.
     * 
     * @returns   {Promise}      - Angular promise
     * @resolves  {Object[]} 	   - Collection of mail from the current user's mailbox
     */
    function getMail(pageSize, pageIndex) {
      var deferred = $q.defer();

      getDeletedItemsFolderId()
        .then(function (deletedItemsFolderId) {
          var query = 'https://graph.microsoft.com/v1.0/me/mailFolders/' + deletedItemsFolderId + '/messages' +
            '?$top=' + pageSize +
            '&$skip=' + ((pageIndex - 1) * pageSize) +
            '&$select=sentDateTime,subject,sender' +
            '&$orderby=sentDateTime desc';
          var getOptions = {
            url: query,
            headers: {
              'Accept': 'application/json;odata.metadata=minimal'
            }
          };

          $http(getOptions)
            .success(function (response) {
              deferred.resolve(response.value);
            });
        });

      return deferred.promise;
    }

  } // function msGraphService()

})();