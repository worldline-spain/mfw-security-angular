(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @module mfw.security.storage.cookies
   * @name mfw.security.storage.cookies
   *
   * @requires mfw.security
   * @requires ngCookies
   *
   * @description
   * # Description
   *
   * Store user credentials in cookies for session status recovery after reloading page.
   *
   *
   * # Configuration
   *
   * Update settings in {@link mfw.security.storage.cookies.constant:$mfwSecurityStorageCookieConfig `$mfwSecurityStorageCookieConfig`} constant object.
   */
  var StorageCookieModule = angular.module('mfw.security.storage.cookies', [
    'mfw.security',
    'ngCookies'
  ]);

  var COOKIE_AUTH_TOKEN = 'TOKEN',
    COOKIE_REFRESH_TOKEN = 'REFRESH_TOKEN';

  /**
   * @ngdoc object
   * @name mfw.security.storage.cookies.constant:$mfwSecurityStorageCookieConfig
   * @description
   * Configuration object for {@link mfw.security.storage.cookies.service:$mfwSecurityStorageCookie `$mfwSecurityStorageCookie`} service.
   */
  /**
   * @ngdoc property
   * @name mfw.security.storage.cookies.constant:$mfwSecurityStorageCookieConfig#cookiesPrefix
   * @propertyOf mfw.security.storage.cookies.constant:$mfwSecurityStorageCookieConfig
   * @description
   * Default value: `AUTH_`
   * @returns {String} Prefix to be applied in all security cookies
   */
  StorageCookieModule.constant('$mfwSecurityStorageCookieConfig', {
    cookiesPrefix: 'AUTH_'
  });

  /**
   * @ngdoc service
   * @name mfw.security.storage.cookies.$mfwSecurityStorageCookieProvider
   *
   * @description
   * Provider for {@link mfw.security.storage.cookies.service:$mfwSecurityStorageCookie `$mfwSecurityStorageCookie`}
   */
  StorageCookieModule.provider('$mfwSecurityStorageCookie', StorageCookieProvider);
  function StorageCookieProvider() {

    /**
     * @ngdoc service
     * @name mfw.security.storage.cookies.service:$mfwSecurityStorageCookie
     *
     * @description
     * Implementation of security storage based on cookies.
     */
    this.$get = ['$cookies', '$mfwSecurityStorageCookieConfig', function ($cookies, $mfwSecurityStorageCookieConfig) {
      var service = {
        'get': _get,
        'set': _set,
        'clear': _clear
      };
      return service;

      /////////////////

      /**
       * @ngdoc function
       * @name mfw.security.storage.cookies.service:$mfwSecurityStorageCookie#get
       * @methodOf mfw.security.storage.cookies.service:$mfwSecurityStorageCookie
       *
       * @description
       * Information getter.
       *
       * @returns {UserInfo} Stored credentials information, if any.
       */
      function _get() {
        var token = _cookieValue(COOKIE_AUTH_TOKEN);
        if (token) {
          var userInfo = {
            accessToken: token,
            refreshToken: _cookieValue(COOKIE_REFRESH_TOKEN)
          };
          return userInfo;
        }
        return undefined;
      }

      /**
       * @ngdoc function
       * @name mfw.security.storage.cookies.service:$mfwSecurityStorageCookie#set
       * @methodOf mfw.security.storage.cookies.service:$mfwSecurityStorageCookie
       *
       * @description
       * Information setter.
       *
       * @param {UserInfo} userInfo User credentials
       */
      function _set(userInfo) {
        _cookieValue(COOKIE_AUTH_TOKEN, userInfo.accessToken);
        _cookieValue(COOKIE_REFRESH_TOKEN, userInfo.refreshToken);
      }

      /**
       * @ngdoc function
       * @name mfw.security.storage.cookies.service:$mfwSecurityStorageCookie#clear
       * @methodOf mfw.security.storage.cookies.service:$mfwSecurityStorageCookie
       *
       * @description
       * Clears stored information.
       */
      function _clear() {
        _removeCookie(COOKIE_AUTH_TOKEN);
        _removeCookie(COOKIE_REFRESH_TOKEN);
      }

      /**
       * @description
       * Cookie value getter/setter.
       *
       * @param {String} name Cookie name, without prefix.
       * @param {String=} value New value, optional.
       * @returns {String} Cookie value.
       * @private
       */
      function _cookieValue(name, value) {
        name = _cn(name);
        if (value) {
          $cookies.put(name, value);
        }
        return $cookies.get(name);
      }

      /**
       * @description
       * Remove a cookie.
       *
       * @param {String} name Cookie name, without prefix.
       * @private
       */
      function _removeCookie(name) {
        name = _cn(name);
        $cookies.remove(name);
      }

      /**
       * @description
       * Builds actual cookie names by adding configured prefix.
       *
       * @param {String} name Cookie name, without prefix.
       * @returns {String} Actual cookie name, with configured prefix.
       * @private
       */
      function _cn(name) {
        return $mfwSecurityStorageCookieConfig.cookiesPrefix + name;
      }
    }];

  }
})();
