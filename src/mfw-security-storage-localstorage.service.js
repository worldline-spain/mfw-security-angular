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
    'mfw.security',
  ]);

  /**
   * @ngdoc service
   * @name mfw.security.storage.localstorage.$mfwSecurityStorageLocalStorageProvider
   *
   * @description
   * Provider for {@link mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage `$mfwSecurityStorageLocalStorage`}
   */
  StorageLocalStorageModule.provider('$mfwSecurityStorageLocalStorage', storageLocalStorageProvider);
  function storageLocalStorageProvider() {

    /**
     * @ngdoc service
     * @name mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage
     *
     * @description
     * Implementation of security storage based on local storage.
     */
    this.$get = function () {

      var localStorage = window.localStorage;
      var userValueNames = [];
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

      /**
       * @description
       * Local storage value getter/setter.
       *
       * @param {String} name Name of value in Local Storage.
       * @param {String=} value New value, optional.
       * @returns {String} Local Storage value.
       * @private
       */
      function _localStorageValue(name, value) {
        var userInfo = _get();
        if (value) {
          userInfo[name] = value;
          _set(userInfo);
        }
        return userInfo[name];
      }

      /**
       * @description
       * Removes a value in Local storage.
       *
       * @param {String} name Name of value in Local Storage.
       * @private
       */
      function _removeLocalStorageValue(name) {
        var userInfo = _get();
        delete userInfo[name];
      }
    };

  }
})();
