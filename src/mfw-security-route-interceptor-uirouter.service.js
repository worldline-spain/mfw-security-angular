(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @module mfw.security.route-interceptor.uirouter
   * @name mfw.security.route-interceptor.uirouter
   *
   * @requires mfw.security
   * @requires ui.router
   *
   * @description
   * # Description
   *
   * Provided implementation is based on UI Router.
   *
   * * Configure your states with required credentials (from your own role list) and the route interceptor will
   * handle them and allow or deny access to them.
   * * Configure your login state to be addressed to when no credentials are found.
   *
   *
   * # Configuration
   *
   * Update settings in {@link mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig `$mfwSecurityRouteInterceptorConfig`} constant object.
   *
   * ## State definitions
   *
   * In all your states you can define a `data` object containing the security-related settings. Here's an example:
   *
   *
   * ### Login page
   *
   * The state implementing login form can be defined in different ways:
   *
   * * Settings: via the {@link mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#loginState `$mfwSecurityRouteInterceptorConfig.loginState`} setting.
   * * State configuration: define a property named `login` with `true` value:
   * ```js
   *     $stateProvider
   *       .state('login', {
   *         url: '/login',
   *         // ...
   *         data: {login: true}
   *       });
   * ```
   *
   * A state configured with `login: true` will override the state name configured via the
   * {@link mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#loginState `$mfwSecurityRouteInterceptorConfig.loginState`}
   * setting.
   *
   *
   * ### Public states
   *
   * By default all states are public, see
   * {@link mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#publicByDefault `$mfwSecurityRouteInterceptorConfig.publicByDefault`}
   * setting.
   *
   * A specific state can be configured as public or restricted via the `public` property.
   *
   * ```js
   *     $stateProvider
   *       .state('public', {
   *         url: '/public',
   *         // ...
   *         data: {public: true}
   *       })
   *       .state('restricted', {
   *         url: '/restricted',
   *         // ...
   *         data: {public: false}
   *       });
   * ```
   *
   * ### Role restricted states
   *
   * A non public state can be configured to require specific user roles. This can be achieved via the `permissions` setting.
   *
   * The `permissions` setting can be configured in different ways:
   *
   * * String: user must have a specific role.
   * * String[]: user must have *at least* one of the specified roles.
   * * Object: specify explicitly if user must have *all* or *any* of the specified roles:
   *   * `all`: single role or a list of user roles. User must have all of them.
   *   * `any`: single role or a list of user roles. User must have at least one of them.
   * > Specify `all` or `any`, but not both.
   *
   * If a role name starts with `!` will be handled as *must not have role XXX*.
   *
   * ```js
   *     $stateProvider
   *       // Only 'admin' users
   *       .state('admin', {
   *         url: '/admin',
   *         // ...
   *         data: {
   *           public: false,
   *           permissions: 'admin'
   *         }
   *       })
   *       // Only 'admin' and 'manager' users
   *       .state('manager', {
   *         url: '/manager',
   *         // ...
   *         data: {
   *           public: false,
   *           permissions: ['admin', 'manager']
   *         }
   *       })
   *       // Only 'admin' and 'manager' users without the 'developer' role
   *       .state('secret', {
   *         url: '/secret',
   *         // ...
   *         data: {
   *           public: false,
   *           permissions: {
   *             any: ['!developer', 'admin', 'manager']
   *           }
   *         }
   *       });
   * ```
   */
  var RouteInterceptorModule = angular.module('mfw.security.route-interceptor.uirouter', [
    'mfw.security',
    'ui.router'
  ]);


  /**
   * CONFIG section

   RouteInterceptorModule.config(['$stateProvider', function moduleConfig($stateProvider) {
    $stateProvider.decorator('data', function (state, parent) {
      var data = parent(state) || {};
      if (!data[STATE_DATA_KEY]) {

      }
      return data;
    });
  }]); */


  /**
   * RUN section
   */
  RouteInterceptorModule.run(['$mfwSecurityRouteInterceptor', function moduleRun($mfwSecurityRouteInterceptor) {
    $mfwSecurityRouteInterceptor.init();
  }]);


  /**
   * Name of the property where security config is defined, inside `data` object in State definition.
   * @type {string}
   */
  var STATE_DATA_KEY = null;//'security';

  /**
   * Name of the event fired when a state transition is stopped due to missing user permissions.
   * @type {string}
   */
  var EVENT_TRANSITION_STOPPED = '$mfwSecurityStateTransitionStopped';

  /**
   * @typedef {Object} StateSecurityConfig
   * @property {Boolean} public Whether this state can be accessed without specific permissions.
   * @property {Boolean} login Flag identifying the login state. More than one state with this flag will throw an exception. None will cause a warning message.
   * @property {String|String[]|Object} permissions User permission configuration to access the state.
   */

  /**
   * @ngdoc object
   * @name mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig
   * @description
   * Configuration object for {@link mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor `$mfwSecurityRouteInterceptor`} service.
   */
  RouteInterceptorModule.constant('$mfwSecurityRouteInterceptorConfig', {
    /**
     * @ngdoc property
     * @name mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#publicByDefault
     * @propertyOf mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig
     * @description
     * Default value: true
     * @returns {Boolean} Whether all states with no security defined are considered public by default or not.
     */
    publicByDefault: true,
    /**
     * @ngdoc property
     * @name mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#loginState
     * @propertyOf mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig
     * @returns {String} Flag identifying the login state. More than one will throw an exception. None will cause a warning message.
     */
    loginState: undefined,
    /**
     * @ngdoc property
     * @name mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#defaultState
     * @propertyOf mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig
     * @description
     * Default value: undefined (do nothing after login)
     * @returns {String} Name of the state to be redirected after login, if any, or after an stopped transition.
     */
    defaultState: undefined,
    /**
     * @ngdoc property
     * @name mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#forwardToDefaultStateAfterLogin
     * @propertyOf mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig
     * @description
     * Default value: false
     * @returns {Boolean} Whether user should be redirected to the default state once user logs in.
     */
    forwardToDefaultStateAfterLogin: false,
    /**
     * @ngdoc property
     * @name mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#forwardToLoginAfterLogout
     * @propertyOf mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig
     * @description
     * Default value: true
     * @returns {Boolean} Whether user should be redirected to the login state after a successful logout.
     */
    forwardToLoginAfterLogout: true,
    /**
     * @ngdoc property
     * @name mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#forwardToRestrictedStateAfterLogin
     * @propertyOf mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig
     * @description
     * Default value: false
     * @returns {Boolean} Whether user should be redirected to the state that requested login once user logs in.
     */
    forwardToRestrictedStateAfterLogin: false,
    /**
     * @ngdoc property
     * @name mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#forwardToLoginAfterStoppedTransition
     * @propertyOf mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig
     * @description
     * Default value: false
     * @returns {Boolean} Whether user should be redirected to the login state after a stopped transition due to permissions.
     */
    forwardToLoginAfterStoppedTransition: false,
    /**
     * @ngdoc property
     * @name mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig#avoidLoginStateWhenLoggedIn
     * @propertyOf mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig
     * @description
     * Default value: false
     * @returns {Boolean} Whether user should be redirected to the default state when accesses login state being already logged in.
     */
    avoidLoginStateWhenLoggedIn: true
  });


  /**
   * @ngdoc service
   * @name mfw.security.route-interceptor.uirouter.$mfwSecurityRouteInterceptorProvider
   *
   * @description
   * Provider for {@link mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor `$mfwSecurityRouteInterceptor`}
   */
  RouteInterceptorModule.provider('$mfwSecurityRouteInterceptor', $mfwSecurityRouteInterceptor);
  function $mfwSecurityRouteInterceptor() {
    this.$get = ['$log', '$rootScope', '$timeout', '$mfwSecurityRouteInterceptorConfig', '$mfwSecurity', '$state', '$mfwSecurityConfig', function ($log, $rootScope, $timeout, $mfwSecurityRouteInterceptorConfig, $mfwSecurity, $state, $mfwSecurityConfig) {
      // Name of the login state
      var LOGIN_STATE, DEFAULT_STATE;

      // Stopped transition due to a required login step.
      var stoppedTransition, stoppedTransitionParameters;

      /**
       * @ngdoc service
       * @name mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor
       *
       * @description
       * Service that listens to UI Router events (`$stateChangeStart` and `$stateChangeError`) to implement
       * authentication and authorization logic.
       */
      var service = {
        init: _init,
        currentStoppedTransition: _hasStoppedTransition
      };
      return service;

      //////////////////////////

      /**
       * @ngdoc method
       * @name mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor#init
       * @methodOf mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor
       *
       * @description
       * Initializer method, to be called when module is loaded.
       *
       * It register for UI Router events and {@link mfw.security.service:$mfwSecurity#events `$mfwSecurity`'s events}.
       */
      function _init() {
        _validateConfig();

        DEFAULT_STATE = $mfwSecurityRouteInterceptorConfig.defaultState;
        LOGIN_STATE = _loginState();

        // UI Route events
        $rootScope.$on('$stateChangeStart', _stateChangeStartHandler);
        $rootScope.$on('$stateChangeError', _stateChangeErrorHandler);
        $rootScope.$on('$stateChangeSuccess', removeStoppedTransition);

        // Security events
        $rootScope.$on($mfwSecurityConfig.EVENT_LOGIN, _loginEventHandler);
        $rootScope.$on($mfwSecurityConfig.EVENT_LOGOUT, _logoutEventHandler);
      }

      /**
       * @ngdoc method
       * @name mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor#currentStoppedTransition
       * @methodOf mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor
       *
       * @description
       * Method that informs whether a restricted transition has been stopped.
       *
       * @return {String[]} Name of the restricted state accessed without enough permissions (first element
       *      in the array) and the state parameters (second element in the array).
       */
      function _hasStoppedTransition() {
        if (angular.isDefined(stoppedTransition)) {
          return [stoppedTransition, stoppedTransitionParameters];
        }
      }

      /**
       *
       * @private
       */
      function _validateConfig() {
        if ($mfwSecurityRouteInterceptorConfig.avoidLoginStateWhenLoggedIn === true
          && angular.isUndefined($mfwSecurityRouteInterceptorConfig.defaultState)) {
          logError('avoidLoginStateWhenLoggedIn=true, defaultState=undefined');
        }
        if ($mfwSecurityRouteInterceptorConfig.forwardToDefaultStateAfterLogin === true
          && angular.isUndefined($mfwSecurityRouteInterceptorConfig.defaultState)) {
          logError('forwardToDefaultStateAfterLogin=true, defaultState=undefined');
        }

        function logError(msg) {
          $log.error('Configuration error:', msg);
        }
      }

      /**
       * Handler for the UI Router's $stateChangeStart event.
       * @param ev
       * @param toState
       * @param toParams
       * @private
       */
      function _stateChangeStartHandler(ev, toState, toParams) {
        var loggedIn = $mfwSecurity.isLogged();
        if (_isLoginState(toState) && loggedIn && $mfwSecurityRouteInterceptorConfig.avoidLoginStateWhenLoggedIn === true) {
          if (DEFAULT_STATE) {
            // Stop current transition
            $log.debug('Stopping transition to login state as user is already logged in. Will be redirected to default state', DEFAULT_STATE);
            stopTransition();

            // Redirect to default state
            $timeout(function () {
              _transitionTo(DEFAULT_STATE);
            });
          } else {
            $log.error('Tried to avoid login state for a logged user, but no default state is configured.');
          }
        } else if (!_hasAccessToState(toState, toParams)) {
          $log.warn('Stopping transition to state', toState.name);
          stopTransition();

          // Trigger event
          _notifyTransitionStopped();

          // Redirect to login
          if ($mfwSecurityRouteInterceptorConfig.forwardToLoginAfterStoppedTransition === true) {
            _transitionTo(LOGIN_STATE);
          }
        } else {
          $log.debug('Has access to state, continue with state change event.');
        }

        function stopTransition() {
          ev.preventDefault();
          saveStoppedTransition(toState, toParams);
        }
      }

      /**
       * Handler for the UI Router's $stateChangeError event.
       * @param evt
       * @param to
       * @param toP
       * @param from
       * @param fromP
       * @param err
       * @private
       */
      function _stateChangeErrorHandler(evt, to, toP, from, fromP, err) {
        if (err.status === 401) {
          $log.error('State change due to 401 server response. Perform logout.');

          if ($mfwSecurityRouteInterceptorConfig.forwardToRestrictedStateAfterLogin === true) {
            saveStoppedTransition(to, toP);
          }

          _doLogout();
        }
      }

      function saveStoppedTransition(toState, toParams) {
        // Save state
        stoppedTransition = angular.isString(toState) ? toState : toState.name;
        stoppedTransitionParameters = toParams;
      }

      function removeStoppedTransition() {
        stoppedTransition = undefined;
        stoppedTransitionParameters = undefined;
      }

      /**
       * Handler for the login event.
       * @private
       */
      function _loginEventHandler() {
        if (stoppedTransition) {
          if ($mfwSecurityRouteInterceptorConfig.forwardToRestrictedStateAfterLogin === true) {
            $log.log('Redirecting to restricted state after login:', stoppedTransition);
            _transitionTo(stoppedTransition, stoppedTransitionParameters);
          } else {
            transitionToDefault();
          }
          stoppedTransition = null;
        } else {
          transitionToDefault();
        }

        function transitionToDefault() {
          if ($mfwSecurityRouteInterceptorConfig.forwardToDefaultStateAfterLogin === true && DEFAULT_STATE) {
            $log.debug('Transition to default state after login:', DEFAULT_STATE);
            _transitionTo(DEFAULT_STATE);
          }
        }
      }

      /**
       * Handler for the logout event.
       * @private
       */
      function _logoutEventHandler() {
        if ($mfwSecurityRouteInterceptorConfig.forwardToLoginAfterLogout === true) {
          if (LOGIN_STATE) {
            $log.log('Redirecting to login state after logout.');
            _transitionTo(LOGIN_STATE);
          } else {
            $log.warn('There\'s no configured login state to be redirected after logout.');
          }
        }
      }

      /**
       * Perform logout.
       * @private
       */
      function _doLogout() {
        $mfwSecurity.logout();
      }

      /**
       * Find the login state.
       *
       * @returns {String}
       * @throws {Error} If more than one state is tagged as 'login'.
       * @private
       */
      function _loginState() {
        var result;
        var cfgLoginStateName = $mfwSecurityRouteInterceptorConfig.loginState;

        if (angular.isDefined(cfgLoginStateName)) {
          $log.debug('Configured in constants the login state', cfgLoginStateName);
          result = $state.get(cfgLoginStateName);

          if (!result) {
            $log.warn('There\'s no state with name', cfgLoginStateName);
          }
        }


        // Find
        var loginStates = $state.get().filter(_isLoginState);
        if (loginStates.length > 1) {
          throw new Error('More than one state is tagged as login.');
        } else if (loginStates.length === 1) {
          var state = loginStates[0];
          if (!result) {
            $log.debug('Found login state', state.name);
          } else {
            $log.debug('Overriding login state with ', state.name);
          }
          result = state;
        }

        if (!result) {
          $log.warn('There\'s no state tagged as login state.');
        }

        return result;
      }

      /**
       *
       * @param state {Object} State object
       * @returns {boolean} Whether state is tagged as login
       * @private
       */
      function _isLoginState(state) {
        var cfg = _securityConfigInState(state);
        return cfg.login === true
          || state.name === $mfwSecurityRouteInterceptorConfig.loginState;
      }

      /**
       *
       * @param state {Object} State object
       * @returns {StateSecurityConfig} Security config inside state object
       * @private
       */
      function _securityConfigInState(state) {
        var config = state.data || {};
        if (STATE_DATA_KEY) {
          config = config[STATE_DATA_KEY] || {};
        }
        return config;
      }

      /**
       *
       * @param {Object} state State
       * @param {Object=} stateParams State params
       * @returns {boolean} Whether user has permissions or not
       * @private
       */
      function _hasAccessToState(state, stateParams) {
        var cfg = _securityConfigInState(state);
        var perms = cfg.permissions;
        var isLogged = $mfwSecurity.isLogged();

        var allowed = true;

        if (_isPublicState(state)) {
          // Public state
          $log.debug('Public access to state', state.name);
          allowed = true;
        } else if (!perms) {
          // Not public but no security defined
          if ($mfwSecurityRouteInterceptorConfig.publicByDefault !== true) {
            // Not public by default: require login
            $log.debug('State', state.name, 'has no permissions defined, and setting publicByDefault is set to false.');
            allowed = isLogged;
            if (isLogged) {
              $log.debug('User is logged in so he has access to state', state.name);
            } else {
              $log.debug('User is not logged in so he has no access to state', state.name);
            }
          } else {
            $log.debug('State', state.name, 'has no permissions defined, and setting publicByDefault is set to true.');
            allowed = true;
          }
        } else {
          // Not explicitly public. Check permissions
          if (angular.isString(perms) || angular.isArray(perms)) {
            allowed = $mfwSecurity.hasAnyPermission(perms);
          } else if (angular.isObject(perms)) {
            if (perms.all) {
              allowed = $mfwSecurity.hasAllPermissions(perms.all);
            } else if (perms.any) {
              allowed = $mfwSecurity.hasAnyPermission(perms.any);
            } else {
              $log.warn('Unkown permissions setting in state', state.name);
            }
          } else {
            $log.warn('Unkown permissions setting in state', state.name);
          }
        }
        return allowed;
      }

      /**
       *
       * @param {Object} state State
       * @returns {boolean} Whether state has public access or not
       * @private
       */
      function _isPublicState(state) {
        var cfg = _securityConfigInState(state);
        var perms = cfg.permissions;
        return cfg.public === true
          || _isLoginState(state)
          || (!perms || !perms.length) && $mfwSecurityRouteInterceptorConfig.publicByDefault;
      }

      /**
       * @ngdoc event
       * @name mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor#$mfwSecurityStateTransitionStopped
       * @eventOf mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor
       * @eventType broadcast on $rootScope
       *
       * @description
       * Event triggered when a state transition is stopped due to missing user permissions.
       */
      function _notifyTransitionStopped() {
        _broadcast(EVENT_TRANSITION_STOPPED);
      }

      /**
       * @description
       * Broadcasts a new event on `$rootScope`.
       *
       * @param {String} event Event name
       * @param {*=} data Event additional data, if any
       * @private
       */
      function _broadcast(event, data) {
        $rootScope.$broadcast(event, data);
      }

      /**
       * @description
       * Performs a state transition.
       *
       * @param {Object} state State
       * @param {Object=} stateParams State params
       * @private
       */
      function _transitionTo(state, stateParams) {
        $state.go(state, stateParams);
      }
    }];
  }
})();
