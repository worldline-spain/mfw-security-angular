(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @module mfw.security.session-store
   * @name mfw.security.session-store
   *
   * @requires mfw.security
   * @requires flux
   *
   * @description
   * # Description
   *
   * This module offers a flux store that dispatches events whenever user session is
   * updated: either created (login) or closed (logout).
   *
   * It relies on {@link mfw.security.service:$mfwSecurity `$mfwSecurity`} service,
   * *decorating* it so each call to {@link mfw.security.service:$mfwSecurity#logged `$mfwSecurity.logged()`}
   * or {@link mfw.security.service:$mfwSecurity#logout `$mfwSecurity.logout()`} dispatches a flux action.
   *
   * See {@link } for available events.
   */
  var SessionStoreModule = angular.module('mfw.security.session-store', [
    'mfw.security',
    'flux'
  ]);

  /**
   * Ensure $mfwSessionStore is injected at least once.
   */
  SessionStoreModule.run(instantiateStore);
  instantiateStore.$inject = ['$mfwSessionStore'];
  function instantiateStore($mfwSessionStore) {

  }

  /**
   * This decorator wraps
   * {@link mfw.security.service:$mfwSecurity#logged `$mfwSecurity.logged()`} and
   * {@link mfw.security.service:$mfwSecurity#logout `$mfwSecurity.logout()`} methods
   * to dispatch proper flux actions via {@link mfw.security.session-store.service:$mfwSessionAction `$mfwSessionAction`}.
   */
  SessionStoreModule.config(decorateMfwSecurity);
  decorateMfwSecurity.$inject = ['$provide'];
  function decorateMfwSecurity($provide) {
    $provide.decorator('$mfwSecurity', ['$delegate', '$mfwSessionAction', '$timeout',
      function securityDecorator($delegate, $mfwSessionAction, $timeout) {
        // Decorate `activate` method to dispatch an store action
        var _activate = $delegate.activate;
        $delegate.activate = function () {
          _activate.apply($delegate, arguments);
          $timeout(function () {
            var userInfo = arguments.length ? arguments[0] : undefined;
            $mfwSessionAction.broadcastLogin(userInfo);
          });
        };

        // Decorate `logout` method to dispatch an store action
        var _logout = $delegate.logout;
        $delegate.logout = function () {
          _logout.apply($delegate, arguments);
          $timeout(function () {
            $mfwSessionAction.broadcastLogout();
          });
        };

        // Decorate `refreshAccessToken` method to dispatch an store action
        var _refresh = $delegate.refreshAccessToken;
        $delegate.refreshAccessToken = function () {
          _refresh.apply($delegate, arguments);
          $timeout(function () {
            $mfwSessionAction.broadcastUpdateCredentials();
          });
        };

        return $delegate;
      }
    ]);
  }


  /**
   * @ngdoc object
   * @name mfw.security.session-store.constant:$mfwSessionEventConstant
   * @description Available flux events fired by
   *              {@link mfw.security.session-store.service:$mfwSessionAction `$mfwSessionAction`}
   *              action creator, handled by
   *              {@link mfw.security.session-store.service:$mfwSessionStore `$mfwSessionStore`}.
   */
  SessionStoreModule.constant('$mfwSessionEventConstant', {
    /**
     * @ngdoc property
     * @name mfw.security.session-store.constant:$mfwSessionEventConstant#SESSION_ALL
     * @propertyOf mfw.security.session-store.constant:$mfwSessionEventConstant
     * @type {String}
     * @returns {String} Session events wildcard.
     *
     * @description
     * Constant value to be used with `$scope.$listenTo()` to be notified of {@link mfw.security.session-store.service:$mfwSessionStore#events all session events}.
     *
     * Default value `mfw:Session.*`.
     */
    SESSION_ALL: 'mfw:Session.*',
    /**
     * @ngdoc property
     * @name mfw.security.session-store.constant:$mfwSessionEventConstant#LOGIN
     * @propertyOf mfw.security.session-store.constant:$mfwSessionEventConstant
     * @type {String}
     * @returns {String} Login event name.
     *
     * @description
     * Constant value to be used with `$scope.$listenTo()` to be notified of {@link mfw.security.session-store.service:$mfwSessionStore#events_mfwsessionlogin login events}.
     *
     * Default value `mfw:Session.login`.
     */
    LOGIN: 'mfw:Session.login',
    /**
     * @ngdoc property
     * @name mfw.security.session-store.constant:$mfwSessionEventConstant#LOGOUT
     * @propertyOf mfw.security.session-store.constant:$mfwSessionEventConstant
     * @type {String}
     * @returns {String} Logout event name.
     *
     * @description
     * Constant value to be used with `$scope.$listenTo()` to be notified of {@link mfw.security.session-store.service:$mfwSessionStore#events_mfwsessionlogout logout events}.
     *
     * Default value `mfw:Session.logout`.
     */
    LOGOUT: 'mfw:Session.logout',
    /**
     * @ngdoc property
     * @name mfw.security.session-store.constant:$mfwSessionEventConstant#UPDATE_CREDENTIALS
     * @propertyOf mfw.security.session-store.constant:$mfwSessionEventConstant
     * @type {String}
     * @returns {String} Updated credentials (refresh token) event name.
     *
     * @description
     * Constant value to be used with `$scope.$listenTo()` to be notified of {@link mfw.security.session-store.service:$mfwSessionStore#events_mfwsessionupdatecredentials update credentials events}.
     *
     * Default value `mfw:Session.credentials-update`.
     */
    UPDATE_CREDENTIALS: 'mfw:Session.credentials-update'
  });


  /**
   * @ngdoc service
   * @name mfw.security.session-store.service:$mfwSessionStore
   *
   * @description
   * Session Store that notifies session changes: login and logout.
   *
   * It handles the following flux actions:
   *
   * * {@link mfw.security.session-store.constant:$mfwSessionEventConstant#LOGIN `$mfwSessionEventConstant.LOGIN`}:
   * automatically fires {@link mfw.security.session-store.service:$mfwSessionStore#mfw:Session.login `mfw:Session.login`} event.
   * * {@link mfw.security.session-store.constant:$mfwSessionEventConstant#LOGOUT `$mfwSessionEventConstant.LOGOUT`}:
   * automatically fires {@link mfw.security.session-store.service:$mfwSessionStore#mfw:Session.logout `mfw:Session.logout`} event.
   * * {@link mfw.security.session-store.constant:$mfwSessionEventConstant#UPDATE_CREDENTIALS `$mfwSessionEventConstant.UPDATE_CREDENTIALS`}:
   * automatically fires {@link mfw.security.session-store.service:$mfwSessionStore#mfw:Session.logout `mfw:Session.credentials-update`} event.
   */
  /**
   * @ngdoc event
   * @name mfw.security.session-store.service:$mfwSessionStore#mfw:Session.login
   * @eventOf mfw.security.session-store.service:$mfwSessionStore
   * @eventType broadcast on $mfwSessionStore
   *
   * @description
   * Event triggered when a user logs in.
   *
   * @param {UserInfo} userInfo Current user info.
   */
  /**
   * @ngdoc event
   * @name mfw.security.session-store.service:$mfwSessionStore#mfw:Session.logout
   * @eventOf mfw.security.session-store.service:$mfwSessionStore
   * @eventType broadcast on $mfwSessionStore
   *
   * @description
   * Event triggered when a user logs out.
   */
  /**
   * @ngdoc event
   * @name mfw.security.session-store.service:$mfwSessionStore#mfw:Session.credentials-update
   * @eventOf mfw.security.session-store.service:$mfwSessionStore
   * @eventType broadcast on $mfwSessionStore
   *
   * @description
   * Event triggered when user user credentials are updated.
   */
  SessionStoreModule.store('$mfwSessionStore', $mfwSessionStore);
  $mfwSessionStore.$inject = ['$mfwSessionEventConstant'];
  function $mfwSessionStore($mfwSessionEventConstant) {
    var returnStore = {
      exports: {
        dummy: function () {
        }
      },
      handlers: []
    };

    returnStore.handlers[$mfwSessionEventConstant.LOGIN] = function (userInfo) {
      this.emit($mfwSessionEventConstant.LOGIN, userInfo);
    };

    returnStore.handlers[$mfwSessionEventConstant.LOGOUT] = function () {
      this.emit($mfwSessionEventConstant.LOGOUT);
    };

    returnStore.handlers[$mfwSessionEventConstant.UPDATE_CREDENTIALS] = function () {
      this.emit($mfwSessionEventConstant.UPDATE_CREDENTIALS);
    };

    return returnStore;
  }

  /**
   * @ngdoc service
   * @name mfw.security.session-store.service:$mfwSessionAction
   *
   * @description
   * App Action.
   */
  SessionStoreModule.factory('$mfwSessionAction', $mfwSessionAction);
  $mfwSessionAction.$inject = ['flux', '$mfwSessionEventConstant'];
  function $mfwSessionAction(flux, $mfwSessionEventConstant) {
    return {
      /**
       * @ngdoc method
       * @name mfw.security.session-store.service:$mfwSessionAction#broadcastLogin
       * @methodOf mfw.security.session-store.service:$mfwSessionAction
       *
       * @description
       * Dispatches a {@link mfw.security.session-store.constant:$mfwSessionEventConstant#LOGIN `$mfwSessionEventConstant.LOGIN`}
       * flux action.
       *
       * @param {UserInfo} userInfo Current user information.
       */
      broadcastLogin: function (userInfo) {
        flux.dispatch($mfwSessionEventConstant.LOGIN, userInfo);
      },
      /**
       * @ngdoc method
       * @name mfw.security.session-store.service:$mfwSessionAction#broadcastLogout
       * @methodOf mfw.security.session-store.service:$mfwSessionAction
       *
       * @description
       * Dispatches a {@link mfw.security.session-store.constant:$mfwSessionEventConstant#LOGOUT `$mfwSessionEventConstant.LOGOUT`}
       * flux action.
       */
      broadcastLogout: function () {
        flux.dispatch($mfwSessionEventConstant.LOGOUT);
      },
      /**
       * @ngdoc method
       * @name mfw.security.session-store.service:$mfwSessionAction#broadcastUpdateCredentials
       * @methodOf mfw.security.session-store.service:$mfwSessionAction
       *
       * @description
       * Dispatches a {@link mfw.security.session-store.constant:$mfwSessionEventConstant#UPDATE_CREDENTIALS `$mfwSessionEventConstant.UPDATE_CREDENTIALS`}
       * flux action.
       */
      broadcastUpdateCredentials: function () {
        flux.dispatch($mfwSessionEventConstant.UPDATE_CREDENTIALS);
      }
    };
  }
})();
