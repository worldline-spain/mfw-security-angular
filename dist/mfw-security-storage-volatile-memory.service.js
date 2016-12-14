(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @module mfw.security.storage.volatile-memory
   * @name mfw.security.storage.volatile-memory
   *
   * @requires mfw.security
   *
   * @description
   * # Description
   *
   * Store user credentials in memory to not be possible to recover session status after reloading page.
   *
   *
   * # Configuration
   *
   * Update settings in {@link mfw.security.storage.volatile-memory.constant:$mfwSecurityStorageVolatileMemoryConfig `$mfwSecurityStorageVolatileMemoryConfig`} constant object.
   */
  var StorageVolatileMemoryModule = angular.module('mfw.security.storage.volatile-memory', [
    'mfw.security'
  ]);

  /**
   * @ngdoc service
   * @name mfw.security.storage.volatile-memory.$mfwSecurityStorageVolatileMemoryProvider
   *
   * @description
   * Provider for {@link mfw.security.storage.volatile-memory.service:$mfwSecurityStorageVolatileMemory `$mfwSecurityStorageVolatileMemory`}
   */
  StorageVolatileMemoryModule.provider('$mfwSecurityStorageVolatileMemory', StorageVolatileMemoryProvider);
  function StorageVolatileMemoryProvider() {

    /**
     * @ngdoc service
     * @name mfw.security.storage.volatile-memory.service:$mfwSecurityStorageVolatileMemory
     *
     * @description
     * Implementation of security storage based on volatile memory.
     */
    this.$get = function () {

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
       * @name mfw.security.storage.volatile-memory.service:$mfwSecurityStorageVolatileMemory#get
       * @methodOf mfw.security.storage.volatile-memory.service:$mfwSecurityStorageVolatileMemory
       *
       * @description
       * Information getter.
       *
       * @returns {UserInfo} Stored credentials information, if any.
       */
      function _get() {
        if (storage.userInfo) {
          return storage.userInfo;
        }
        return undefined;
      }

      /**
       * @ngdoc function
       * @name mfw.security.storage.volatile-memory.service:$mfwSecurityStorageVolatileMemory#set
       * @methodOf mfw.security.storage.volatile-memory.service:$mfwSecurityStorageVolatileMemory
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
       * @name mfw.security.storage.volatile-memory.service:$mfwSecurityStorageVolatileMemory#clear
       * @methodOf mfw.security.storage.volatile-memory.service:$mfwSecurityStorageVolatileMemory
       *
       * @description
       * Clears stored information.
       */
      function _clear() {
        delete storage.userInfo;
      }
    };
  }
})();
