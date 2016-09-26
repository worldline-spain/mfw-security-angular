(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @module mfw.security.storage.localstorage
   * @name mfw.security.storage.localstorage
   *
   * @requires mfw.security
   *
   * @description
   * # Description
   *
   * Store user credentials in local storage for session status recovery after reloading page.
   *
   *
   * # Configuration
   *
   * Update settings in {@link mfw.security.storage.localstorage.constant:$mfwSecurityStorageLocalStorageConfig `$mfwSecurityStorageLocalStorageConfig`} constant object.
   */
  var StorageLocalStorageModule = angular.module('mfw.security.storage.localstorage', [
    'mfw.security'
  ]);

  /**
   * @ngdoc service
   * @name mfw.security.storage.localstorage.$mfwSecurityStorageLocalStorageProvider
   *
   * @description
   * Provider for {@link mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage `$mfwSecurityStorageLocalStorage`}
   */
  StorageLocalStorageModule.provider('$mfwSecurityStorageLocalStorage', StorageLocalStorageProvider);
  function StorageLocalStorageProvider() {

    /**
     * @ngdoc service
     * @name mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage
     *
     * @description
     * Implementation of security storage based on local storage.
     */
    this.$get = function () {

      var localStorage = window.localStorage;
      var service = {
        'get': _get,
        'set': _set,
        'clear': _clear
      };
      return service;

      /////////////////

      /**
       * @ngdoc function
       * @name mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage#get
       * @methodOf mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage
       *
       * @description
       * Information getter.
       *
       * @returns {UserInfo} Stored credentials information, if any.
       */
      function _get() {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
          return userInfo;
        }
        return undefined;
      }

      /**
       * @ngdoc function
       * @name mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage#set
       * @methodOf mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage
       *
       * @description
       * Information setter.
       *
       * @param {UserInfo} userInfo User credentials
       */
      function _set(userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      }

      /**
       * @ngdoc function
       * @name mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage#clear
       * @methodOf mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage
       *
       * @description
       * Clears stored information.
       */
      function _clear() {
        localStorage.removeItem('userInfo');
      }
    };
  }
})();
