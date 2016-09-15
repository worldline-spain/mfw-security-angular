(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @module mfw.security.http-handler.restangular
   * @name mfw.security.http-handler.restangular
   *
   * @requires mfw.security
   * @requires restangular
   *
   * @description
   * # Description
   *
   * Provided implementation is based on Restangular.
   *
   * * Configure all your Restangular configurations to be updated with proper credentials when user logs in or logs out.
   * * Handle error responses to broadcast a logout when `Unauthorized` response (HTTP status code 401) is received.
   *
   *
   * # Configuration
   *
   * Update settings in {@link mfw.security.http-handler.restangular.constant:$mfwSecurityHttpHandlerConfig `$mfwSecurityHttpHandlerConfig`} constant object.
   */
  var HttpHandlerModule = angular.module('mfw.security.http-handler.restangular', [
    'mfw.security',
    'restangular'
  ]);


  /**
   * RUN section
   */
  HttpHandlerModule.run(['$mfwSecurityHttpHandler', function runConfig($mfwSecurityHttpHandler) {
    $mfwSecurityHttpHandler.init();
  }]);


  /**
   * @ngdoc object
   * @name mfw.security.http-handler.restangular.constant:$mfwSecurityHttpHandlerConfig
   * @description
   * Configuration object for {@link mfw.security.http-handler.restangular.service:$mfwSecurityHttpHandler `$mfwSecurityHttpHandler`} service.
   */
  /**
   * @ngdoc property
   * @name mfw.security.http-handler.restangular.constant:$mfwSecurityHttpHandlerConfig#restangularConfig
   * @propertyOf mfw.security.http-handler.restangular.constant:$mfwSecurityHttpHandlerConfig
   * @type {String|String[]|Function}
   * @returns {String|String[]|Function} Restangular configuration names
   *
   * @description
   * Can be used in several ways:
   * * `String`: Restangular configuration service name.
   * * `String[]`: array of Restangular configuration service names.
   * * `Function`: function returning an array of Restangular configuration service names.
   */
  HttpHandlerModule.constant('$mfwSecurityHttpHandlerConfig', {
    restangularConfig: 'Restangular'
  });


  HttpHandlerModule.provider('$mfwSecurityHttpHandler', HttpHandlerProvider);
  function HttpHandlerProvider() {
    this.$get = ['$injector', '$rootScope', '$log', '$mfwSecurity', '$mfwSecurityHttpHandlerConfig', '$mfwSecurityConfig', function ($injector, $rootScope, $log, $mfwSecurity, $mfwSecurityHttpHandlerConfig, $mfwSecurityConfig) {
      var restangularServices = [];

      /**
       * @ngdoc service
       * @name mfw.security.http-handler.restangular.service:$mfwSecurityHttpHandler
       *
       * @description
       * Service that listens to HTTP error responses by registering to Restangular configurations.
       *
       * See {@link https://github.com/mgonto/restangular#seterrorinterceptor Restangular error handler} documentation.
       */
      var service = {
        init: _init
      };
      return service;

      //////////////////

      /**
       * @ngdoc method
       * @name mfw.security.http-handler.restangular.service:$mfwSecurityHttpHandler#init
       * @methodOf mfw.security.http-handler.restangular.service:$mfwSecurityHttpHandler
       *
       * @description
       * Initializer method, to be called when module is loaded.
       *
       * It registers *error interceptors* to all configured Restangular configuration services.
       * See {@link mfw.security.http-handler.restangular.constant:$mfwSecurityHttpHandlerConfig#restangularConfig `restangularConfig`} property.
       *
       * @see {@link mfw.security.http-handler.restangular.constant:$mfwSecurityHttpHandlerConfig#restangularConfig} property
       */
      function _init() {
        var services = _restangularConfiguration();
        angular.forEach(services, function (serviceName) {
          $log.debug('Adding error interceptor to restangular service', serviceName);
          var restangular = $injector.get(serviceName);

          // Store for later updates
          restangularServices.push(restangular);

          // Add error interceptor
          restangular.setErrorInterceptor(_handleResponse);
        });

        // Security events
        $rootScope.$on($mfwSecurityConfig.EVENT_LOGIN, _loginEventHandler);
        $rootScope.$on($mfwSecurityConfig.EVENT_LOGOUT, _logoutEventHandler);
        $rootScope.$on($mfwSecurityConfig.EVENT_UPDATE_CREDENTIALS, _updateCredentialsEventHandler);

        // Already logged in?
        if ($mfwSecurity.isLogged()) {
          _addCredentialsToRestangular($mfwSecurity.me());
        }
      }

      /**
       * Implementation of a {@link https://github.com/mgonto/restangular#seterrorinterceptor "Restangular error handler"}.
       * @param response
       * @param deferred
       * @param responseHandler
       * @returns {boolean}
       * @private
       */
      function _handleResponse(response, deferred, responseHandler) {
        if (response.status === 401) {
          $log.error('Server returned status code ' + response.status + '. Perform logout.');
          _doLogout();

          // Stop default promise workflow
          return false;
        }

        // Continue with promise workflow (success/error handlers)
        return true;
      }

      /**
       * Handler for the login event.
       * @param {UserInfo} userInfo User information
       * @private
       */
      function _loginEventHandler(event, userInfo) {
        _addCredentialsToRestangular(userInfo);
      }

      /**
       * Handler for the logout event.
       * @private
       */
      function _logoutEventHandler() {
        _removeCredentialsFromRestangular();
      }

      /**
       * Handler for the updated credentials event.
       * @private
       */
      function _updateCredentialsEventHandler(event, userInfo) {
        _addCredentialsToRestangular(userInfo);
      }

      /**
       * Perform logout.
       * @private
       */
      function _doLogout() {
        $mfwSecurity.logout();
      }

      /**
       * @description
       * Adds authentication credentials to Restangular services so they are added to all requests.
       *
       * @param {UserInfo} userInfo User information
       * @private
       */
      function _addCredentialsToRestangular(userInfo) {
        angular.forEach(restangularServices, function (restangular) {
          var defaultHeaders = angular.copy(restangular.defaultHeaders) || {};
          defaultHeaders['Authorization'] = userInfo.accessToken;
          restangular.setDefaultHeaders(defaultHeaders);
        });
      }

      /**
       * @description
       * Remove authentication credentials from Restangular services so they are noy added to any request.
       *
       * @private
       */
      function _removeCredentialsFromRestangular() {
        angular.forEach(restangularServices, function (restangular) {
          var defaultHeaders = angular.copy(restangular.defaultHeaders) || {};
          delete defaultHeaders['Authorization'];
          restangular.setDefaultHeaders(defaultHeaders);
        });
      }

      /**
       *
       * @returns {String[]}
       * @private
       */
      function _restangularConfiguration() {
        var restConf = $mfwSecurityHttpHandlerConfig.restangularConfig;
        var result = [];

        if (angular.isFunction(restConf)) {
          result = restConf();
        } else if (angular.isString(restConf)) {
          result.push(restConf);
        } else if (angular.isArray(restConf)) {
          result = result.concat(restConf);
        }

        return result;
      }
    }];
  }
})();
