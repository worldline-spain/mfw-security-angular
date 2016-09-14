(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @module mfw.security.user-parser.identity
   * @name mfw.security.user-parser.identity
   *
   * @requires mfw.security
   *
   * @description
   * # Description
   *
   * Implementation of a defaul *user parser* with identity function behaviour.
   */
  var UserParserIdentityModule = angular.module('mfw.security.user-parser.identity', [
    'mfw.security'
  ]);


  UserParserIdentityModule.factory('$mfwSecurityParserIdentity', parserIdentityFactory);
  parserIdentityFactory.$inject = [];
  function parserIdentityFactory() {
    /**
     * @ngdoc service
     * @name mfw.security.user-parser.identity.service:$mfwSecurityParserIdentity
     *
     * @description
     * Service by default when no other parser is specified. Returns user as it recieves it.
     */
    var service = {
      parse: parse,
      fromStorage: fromStorage
    };
    return service;

    //////////////////

    /**
     * @ngdoc service
     * @name mfw.security.user-parser.identity.service:$mfwSecurityParserIdentity#parse
     * @methodOf mfw.security.user-parser.identity.service:$mfwSecurityParserIdentity
     *
     * @param {UserInfo} user User information
     * @returns {UserInfo} behaves like an identity funciton, returns the user as it recieves it.
     */
    function parse(user) {
      return user;
    }

    function fromStorage(userInfo) {
      return userInfo;
    }
  }
})();
