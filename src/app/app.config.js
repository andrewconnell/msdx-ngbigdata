(function () {
  'use strict';

  angular.module('ngPagingBigData', [
    'ngRoute',
    'AdalAngular'
  ])
    .config([
      '$routeProvider',
      '$httpProvider',
      'adalAuthenticationServiceProvider',
      appConfig
    ]);

  /**
   * Configure the application's routing & authentication settings.
   * 
   * @param  {Object} $routeProvider - Angular's route provider
   * @param  {Object} $httpProvider  - Angular's $http provider
   * @param  {Object} adalProvider   - ADAL JS' provider
   */
  function appConfig($routeProvider, $httpProvider, adalProvider) {
    configRoutes($routeProvider);
    configAuth($httpProvider, adalProvider);
  }

  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

  /**
   * Configure the app's routes.
   * 
   * @param  {Object} $routeProvider - Angular's route provider
   */
  function configRoutes($routeProvider) {
    // setup routes in the app
    $routeProvider
      .when('/', {
        title: 'Home',
        showInNav: true,
        sortOrder: 0,
        templateUrl: 'app/dashboard/dashboard.html',
      })
      .when('/mail', {
        title: 'Mail',
        showInNav: true,
        sortOrder: 1,
        templateUrl: 'app/mail/list.html',
        controller: 'ngPagingBigData.mailController',
        controllerAs: 'vm',
        requireADLogin: true
      })
      .otherwise({ redirectTo: '/' });
  }

  /**
   * Configure authencation for the application.
   * 
   * @param  {Object} $httpProvider - Angular's $http provider
   * @param  {Object} adalProvider  - ADAL JS' provider
   */
  function configAuth($httpProvider, adalProvider) {
    adalProvider.init({
      anonymousEndpoints: [],
      tenant: 'AAD_TENANT_ID',
      clientId: 'AAD_APP_ID',
      postLogoutRedirectUrl: 'http://localhost:3000',
      endpoints: {
        'https://graph.microsoft.com/v1.0': 'https://graph.microsoft.com/'
      }
    }, $httpProvider);
  }

})();