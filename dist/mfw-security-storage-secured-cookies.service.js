(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @module mfw.security.storage.secured-cookies
   * @name mfw.security.storage.secured-cookies
   *
   * @requires mfw.security
   *
   * @description
   * # Description
   *
   * Store user credentials in secured cookies, not accessible via Javascript.
   *
   *
   * # Configuration
   *
   * Update settings in {@link mfw.security.storage.secured-cookies.$mfwSecurityStorageSecuredCookiesProvider#methods_config `$mfwSecurityStorageSecuredCookiesProvider.config()`} method.
   */
  var StorageSecuredCookiesModule = angular.module('mfw.security.storage.secured-cookies', [
    'mfw.security'
  ]);

  /**
   * @ngdoc service
   * @name mfw.security.storage.secured-cookies.$mfwSecurityStorageSecuredCookiesProvider
   *
   * @description
   * Provider for {@link mfw.security.storage.secured-cookies.service:$mfwSecurityStorageSecuredCookies `$mfwSecurityStorageSecuredCookies`}
   */
  StorageSecuredCookiesModule.provider('$mfwSecurityStorageSecuredCookies', StorageSecuredCookiesProvider);
  function StorageSecuredCookiesProvider() {
    var options = {
      sessionRetriever: angular.noop
    };

    /**
     * @ngdoc service
     * @name mfw.security.storage.secured-cookies.$mfwSecurityStorageSecuredCookiesProvider#config
     * @methodOf mfw.security.storage.secured-cookies.$mfwSecurityStorageSecuredCookiesProvider
     *
     * @description
     * Configures service.
     *
     * @param {Object} opts Options
     * @param {Function|Array.<string|function()>} opts.sessionRetriever Injectable function that invokes server to validate
     *      current credentials.
     *
     *      This function must return a promise.
     */
    this.config = function (opts) {
      angular.extend(options, opts || {});
    };

    /**
     * @ngdoc service
     * @name mfw.security.storage.secured-cookies.service:$mfwSecurityStorageSecuredCookies
     *
     * @description
     * Implementation of security storage based on volatile memory and secured cookies.
     *
     * Secured cookies are not accessible in Javascript, so its storage programatically is dummy, it stores nothing.
     */
    this.$get = ['$injector', function ($injector) {

      var storage = {};
      var service = {
        'get': _get,
        'set': _set,
        'clear': _clear
      };
      return service;

      /////////////////

      /**
       * @ngdoc function
       * @name mfw.security.storage.secured-cookies.service:$mfwSecurityStorageSecuredCookies#get
       * @methodOf mfw.security.storage.secured-cookies.service:$mfwSecurityStorageSecuredCookies
       *
       * @description
       * Information getter.
       *
       * @returns {UserInfo|Promise.<UserInfo>} Stored credentials information, if any.
       */
      function _get() {
        if (storage.userInfo) {
          return storage.userInfo;
        } else {
          return keepAliveRequest();
        }
      }

      /**
       * @ngdoc function
       * @name mfw.security.storage.secured-cookies.service:$mfwSecurityStorageSecuredCookies#set
       * @methodOf mfw.security.storage.secured-cookies.service:$mfwSecurityStorageSecuredCookies
       *
       * @description
       * Information setter.
       *
       * @param {UserInfo} userInfo User credentials
       */
      function _set(userInfo) {
        storage.userInfo = userInfo;
      }

      /**
       * @ngdoc function
       * @name mfw.security.storage.secured-cookies.service:$mfwSecurityStorageSecuredCookies#clear
       * @methodOf mfw.security.storage.secured-cookies.service:$mfwSecurityStorageSecuredCookies
       *
       * @description
       * Clears stored information.
       */
      function _clear() {
        delete storage.userInfo;
      }


      /**
       * @private
       */
      function keepAliveRequest() {
        return $injector.invoke(options.sessionRetriever);
      }
    }];
  }
})();
