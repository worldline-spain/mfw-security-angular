(function () {
  'use strict';

  var SecurityModule = angular.module('mfw.security');

  /**
   * @ngdoc directive
   * @name mfw.security.directive:mfwSecHasAnyPermission
   * @restrict 'A'
   * @element ANY
   * @scope
   *
   * @description
   * Display HTML content when current logged user contains at least one of the specified permissions.
   *
   * @param {String} mfwSecHasAnyPermission|from Comma-separated list of permission names
   */
  SecurityModule.directive('mfwSecHasAnyPermission', hasAnyPermissionDirective);
  hasAnyPermissionDirective.$inject = ['$compile', '$mfwSecurity'];
  function hasAnyPermissionDirective($compile, $mfwSecurity) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 1001,
      compile: function (tElem, tAttrs) {
        var permissions = tAttrs['mfwSecHasAnyPermission'] || tAttrs['from'];
        tElem.removeAttr('mfw-sec-has-any-permission');
        var fnName = randomCheckFunctionName();
        tElem.attr('ng-if', fnName + '()');
        var fn = $compile(tElem, null, 1500);
        return function postLink(scope) {
          scope[fnName] = function () {
            return $mfwSecurity.isLogged() && $mfwSecurity.hasAnyPermission(permissions);
          };
          fn(scope);
        };
      }
    };
  }

  /**
   * @ngdoc directive
   * @name mfw.security.directive:mfwSecHasAllPermissions
   * @restrict 'A'
   * @element ANY
   * @scope
   *
   * @description
   * Display HTML content when current logged user contains all the specified permissions.
   *
   * @param {String} mfwSecHasAllPermissions|from Comma-separated list of permission names
   */
  SecurityModule.directive('mfwSecHasAllPermissions', hasAllPermissionsDirective);
  hasAllPermissionsDirective.$inject = ['$compile', '$mfwSecurity'];
  function hasAllPermissionsDirective($compile, $mfwSecurity) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 1001,
      compile: function (tElem, tAttrs) {
        var permissions = tAttrs['mfwSecHasAllPermissions'] || tAttrs['from'];
        tElem.removeAttr('mfw-sec-has-all-permissions');
        var fnName = randomCheckFunctionName();
        tElem.attr('ng-if', fnName + '()');
        var fn = $compile(tElem, null, 1500);
        return function postLink(scope) {
          scope[fnName] = function () {
            return $mfwSecurity.isLogged() && $mfwSecurity.hasAllPermissions(permissions);
          };
          fn(scope);
        };
      }
    };
  }

  /**
   * @ngdoc directive
   * @name mfw.security.directive:mfwSecIfLogged
   * @restrict 'A'
   * @element ANY
   * @scope
   *
   * @description
   * Display HTML content only when user is logged in.
   */
  SecurityModule.directive('mfwSecIfLogged', ifLoggedDirective);
  ifLoggedDirective.$inject = ['$compile', '$mfwSecurity'];
  function ifLoggedDirective($compile, $mfwSecurity) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 1001,
      compile: function (tElem) {
        tElem.removeAttr('mfw-sec-if-logged');
        var fnName = randomCheckFunctionName();
        tElem.attr('ng-if', fnName + '()');
        var fn = $compile(tElem, null, 1500);
        return function postLink(scope) {
          scope[fnName] = function () {
            return $mfwSecurity.isLogged();
          };
          fn(scope);
        };
      }
    };
  }

  /**
   * @ngdoc directive
   * @name mfw.security.directive:mfwSecIfLoggedOut
   * @restrict 'A'
   * @element ANY
   * @scope
   *
   * @description
   * Display HTML content only when user is logged out.
   */
  SecurityModule.directive('mfwSecIfLoggedOut', ifLoggedOutDirective);
  ifLoggedOutDirective.$inject = ['$compile', '$mfwSecurity'];
  function ifLoggedOutDirective($compile, $mfwSecurity) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 1001,
      compile: function (tElem) {
        tElem.removeAttr('mfw-sec-if-logged-out');
        var fnName = randomCheckFunctionName();
        tElem.attr('ng-if', fnName + '()');
        var fn = $compile(tElem, null, 1500);
        return function postLink(scope) {
          scope[fnName] = function () {
            return $mfwSecurity.isLogged();
          };
          fn(scope);
        };
      }
    };
  }

  function randomCheckFunctionName() {
    var suffix = Math.ceil(Math.random() * 1000) + 1;
    return '$hasEnoughPermisssion' + suffix;
  }
})();
