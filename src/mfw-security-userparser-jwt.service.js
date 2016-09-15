/*jshint camelcase:false */
(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @module mfw.security.user-parser.jwt
   * @name mfw.security.user-parser.jwt
   *
   * @requires mfw.security
   * @requires angular-jwt
   *
   * @description
   * # Description
   *
   * Implementation of a *user parser* to integrate a Tempos21 security endpoint.
   */
  var UserParserJwtModule = angular.module('mfw.security.user-parser.jwt', [
    'mfw.security',
    'angular-jwt'
  ]);


  UserParserJwtModule.factory('$mfwSecurityParserJWT', parserJwtFactory);
  parserJwtFactory.$inject = ['jwtHelper'];
  function parserJwtFactory(jwtHelper) {
    /**
     * @ngdoc service
     * @name mfw.security.user-parser.jwt.service:$mfwSecurityParserJWT
     *
     * @description
     * Service that converts a T21 REST security response to a `UserInfo` object needed by {@link mfw.security `mfw.security`} module.
     */
    var service = {
      parse: parse,
      fromStorage: fromStorage
    };
    return service;

    //////////////////

    /**
     * @typedef {Object} UserInfoJwt
     * @property {String} token_type
     * @property {String} access_token
     * @property {String} refresh_token
     * @property {String} token_type
     */
    /**
     * @typedef {Object} JwtTokenInformation
     * @property {String} client_id
     * @property {String[]} authorities
     */

    /**
     * @ngdoc service
     * @name mfw.security.user-parser.jwt.service:$mfwSecurityParserJWT#parse
     * @methodOf mfw.security.user-parser.jwt.service:$mfwSecurityParserJWT
     *
     * @param {UserInfoJwt} user User information
     * @returns {UserInfo} Parsed user
     */
    function parse(user) {
      var accessToken = user.token_type + ' ' + user.access_token;
      var refreshToken = user.refresh_token;
      var userInfo = {
        accessToken: accessToken,
        refreshToken: refreshToken
      };
      _fillDataFromToken(userInfo);
      return userInfo;
    }

    /**
     * @ngdoc service
     * @name mfw.security.user-parser.jwt.service:$mfwSecurityParserJWT#fromStorage
     * @methodOf mfw.security.user-parser.jwt.service:$mfwSecurityParserJWT
     *
     * @param {UserInfoJwt} user User information
     * @returns {UserInfo} User information
     */
    function fromStorage(userInfo) {
      _fillDataFromToken(userInfo);
      return userInfo;
    }

    /**
     * Decodes user's `accessToken` and provides its contents to the userInfo object.
     * @param {UserInfo} userInfo
     * @private
     */
    function _fillDataFromToken(userInfo) {
      /** @type {JwtTokenInformation} */
      var tokenInfo = _decodeToken(userInfo.accessToken);
      userInfo.id = tokenInfo.client_id;
      userInfo.permissions = tokenInfo.authorities;
    }

    /**
     * @param {String} accessToken Access token
     * @returns {JwtTokenInformation} Token information
     * @private
     */
    function _decodeToken(accessToken) {
      return jwtHelper.decodeToken(accessToken);
    }
  }
})();
