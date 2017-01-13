NG_DOCS={
  "sections": {
    "api": "MFW Security API Documentation"
  },
  "pages": [
    {
      "section": "api",
      "id": "mfw.security",
      "shortName": "mfw.security",
      "type": "overview",
      "moduleName": "mfw.security",
      "shortDescription": "Description",
      "keywords": "api based check content control cookies credentials current description directives fragments framework hide html http implementation integrated local logged mfw middleware module nodes overview provided restangular restrictions screens security services storage user"
    },
    {
      "section": "api",
      "id": "mfw.security.$mfwSecurityProvider",
      "shortName": "mfw.security.$mfwSecurityProvider",
      "type": "service",
      "moduleName": "mfw.security",
      "shortDescription": "Provider for $mfwSecurity",
      "keywords": "$mfwsecurity $mfwsecurityprovider api mfw provider security service"
    },
    {
      "section": "api",
      "id": "mfw.security.constant:$mfwSecurityConfig",
      "shortName": "$mfwSecurityConfig",
      "type": "object",
      "moduleName": "mfw.security",
      "shortDescription": "Configuration object for $mfwSecurity service.",
      "keywords": "$mfwsecurity $mfwsecuritylogin $mfwsecuritylogout $mfwsecurityparserjwt $mfwsecuritystoragecookie $mfwsecurityupdatecredentials api broadcast configuration constant credentials current currentusergetter default event event_login event_logout event_update_credentials getter heartbeat heartbeatinterval implementing info interval login logout methods_me mfw millis object parsing property return security service storage update user userinfoparser valid"
    },
    {
      "section": "api",
      "id": "mfw.security.directive:mfwSecHasAllPermissions",
      "shortName": "mfwSecHasAllPermissions",
      "type": "directive",
      "moduleName": "mfw.security",
      "shortDescription": "Display HTML content when current logged user contains all the specified permissions.",
      "keywords": "api comma-separated content current directive display html list logged mfw mfwsechasallpermissions names permission permissions security user"
    },
    {
      "section": "api",
      "id": "mfw.security.directive:mfwSecHasAnyPermission",
      "shortName": "mfwSecHasAnyPermission",
      "type": "directive",
      "moduleName": "mfw.security",
      "shortDescription": "Display HTML content when current logged user contains at least one of the specified permissions.",
      "keywords": "api comma-separated content current directive display html list logged mfw mfwsechasanypermission names permission permissions security user"
    },
    {
      "section": "api",
      "id": "mfw.security.directive:mfwSecIfLogged",
      "shortName": "mfwSecIfLogged",
      "type": "directive",
      "moduleName": "mfw.security",
      "shortDescription": "Display HTML content only when user is logged in.",
      "keywords": "api content directive display html logged mfw security user"
    },
    {
      "section": "api",
      "id": "mfw.security.directive:mfwSecIfLoggedOut",
      "shortName": "mfwSecIfLoggedOut",
      "type": "directive",
      "moduleName": "mfw.security",
      "shortDescription": "Display HTML content only when user is logged out.",
      "keywords": "api content directive display html logged mfw security user"
    },
    {
      "section": "api",
      "id": "mfw.security.http-handler.restangular",
      "shortName": "mfw.security.http-handler.restangular",
      "type": "overview",
      "moduleName": "mfw.security.http-handler.restangular",
      "shortDescription": "Description",
      "keywords": "$mfwsecurityhttphandlerconfig api based broadcast code configuration configurations configure constant credentials description error handle http-handler implementation logout logs mfw object overview proper provided received response responses restangular security settings status unauthorized update updated user"
    },
    {
      "section": "api",
      "id": "mfw.security.http-handler.restangular.constant:$mfwSecurityHttpHandlerConfig",
      "shortName": "$mfwSecurityHttpHandlerConfig",
      "type": "object",
      "moduleName": "mfw.security.http-handler.restangular",
      "shortDescription": "Configuration object for $mfwSecurityHttpHandler service.",
      "keywords": "$mfwsecurityhttphandler api array configuration constant function http-handler mfw names object property restangular restangularconfig returning security service string ways"
    },
    {
      "section": "api",
      "id": "mfw.security.http-handler.restangular.service:$mfwSecurityHttpHandler",
      "shortName": "$mfwSecurityHttpHandler",
      "type": "service",
      "moduleName": "mfw.security.http-handler.restangular",
      "shortDescription": "Service that listens to HTTP error responses by registering to Restangular configurations.",
      "keywords": "api called configuration configurations configured constant documentation error handler http http-handler https init initializer interceptors listens loaded method mfw module property registering registers responses restangular restangularconfig security service services seterrorinterceptor"
    },
    {
      "section": "api",
      "id": "mfw.security.route-interceptor.uirouter",
      "shortName": "mfw.security.route-interceptor.uirouter",
      "type": "overview",
      "moduleName": "mfw.security.route-interceptor.uirouter",
      "shortDescription": "Description",
      "keywords": "$mfwsecurityrouteinterceptorconfig $stateprovider access achieved addressed admin allow api based configuration configure configured constant credentials data default define defined definitions deny description developer example explicitly false form handle handled implementation implementing interceptor js list login loginstate manager mfw named object override overview permissions property provided public publicbydefault require required restricted role roles route route-interceptor router secret security security-related setting settings single specific starts string true ui uirouter update url user users ways xxx"
    },
    {
      "section": "api",
      "id": "mfw.security.route-interceptor.uirouter.$mfwSecurityRouteInterceptorProvider",
      "shortName": "mfw.security.route-interceptor.uirouter.$mfwSecurityRouteInterceptorProvider",
      "type": "service",
      "moduleName": "mfw.security.route-interceptor.uirouter",
      "shortDescription": "Provider for $mfwSecurityRouteInterceptor",
      "keywords": "$mfwsecurityrouteinterceptor $mfwsecurityrouteinterceptorprovider api mfw provider route-interceptor security service uirouter"
    },
    {
      "section": "api",
      "id": "mfw.security.route-interceptor.uirouter.constant:$mfwSecurityRouteInterceptorConfig",
      "shortName": "$mfwSecurityRouteInterceptorConfig",
      "type": "object",
      "moduleName": "mfw.security.route-interceptor.uirouter",
      "shortDescription": "Configuration object for $mfwSecurityRouteInterceptor service.",
      "keywords": "$mfwsecurityrouteinterceptor accesses api avoidloginstatewhenloggedin configuration considered constant default defaultstate defined exception false flag forwardtodefaultstateafterlogin forwardtologinafterlogout forwardtologinafterstoppedtransition forwardtorestrictedstateafterlogin identifying logged login loginstate logout logs message mfw object permissions property public publicbydefault redirected requested route-interceptor security service stopped successful throw transition true uirouter undefined user warning"
    },
    {
      "section": "api",
      "id": "mfw.security.route-interceptor.uirouter.service:$mfwSecurityRouteInterceptor",
      "shortName": "$mfwSecurityRouteInterceptor",
      "type": "service",
      "moduleName": "mfw.security.route-interceptor.uirouter",
      "shortDescription": "Service that listens to UI Router events ($stateChangeStart and $stateChangeError) to implement",
      "keywords": "$mfwsecurity $statechangeerror $statechangestart accessed api array authentication authorization called currentstoppedtransition element events implement informs init initializer listens loaded logic method mfw module parameters permissions register restricted route-interceptor router security service stopped transition ui uirouter"
    },
    {
      "section": "api",
      "id": "mfw.security.service:$mfwSecurity",
      "shortName": "$mfwSecurity",
      "type": "service",
      "moduleName": "mfw.security",
      "shortDescription": "Authorization service.",
      "keywords": "$mfwsecurityconfig $mfwsecuritylogin $mfwsecuritylogout access accesstoken activate api authorization cache called check checks clear clears configures constant credentials current currently entity event events_ full function granted hasallpermissions hasanypermission identifier info init initializer islogged load loaded logged login logout method methods_me mfw module order parsed parser permissions previous property refreshaccesstoken refreshtoken roles security service session stored string structure token trigger triggers user userinfo userinfoparser username valid"
    },
    {
      "section": "api",
      "id": "mfw.security.service:$mfwSecurityStorageDummy",
      "shortName": "$mfwSecurityStorageDummy",
      "type": "object",
      "moduleName": "mfw.security",
      "shortDescription": "Dummy storage for apps requesting NO storage. E.g.: secured cookies noy accessibles via JS.",
      "keywords": "accessibles api apps cookies dummy js mfw noy object requesting secured security service storage"
    },
    {
      "section": "api",
      "id": "mfw.security.session-store",
      "shortName": "mfw.security.session-store",
      "type": "overview",
      "moduleName": "mfw.security.session-store",
      "shortDescription": "Description",
      "keywords": "$mfwsecurity action api call closed created description dispatches events flux logged logout mfw module offers overview relies security service session session-store store updated user"
    },
    {
      "section": "api",
      "id": "mfw.security.session-store.constant:$mfwSessionEventConstant",
      "shortName": "$mfwSessionEventConstant",
      "type": "object",
      "moduleName": "mfw.security.session-store",
      "shortDescription": "Available flux events fired by",
      "keywords": "$listento $mfwsessionaction $mfwsessionstore $scope action api constant creator credentials credentials-update default event events events_mfwsessionlogin events_mfwsessionlogout events_mfwsessionupdatecredentials fired flux handled login logout mfw notified object property security service session session-store session_all token update update_credentials updated wildcard"
    },
    {
      "section": "api",
      "id": "mfw.security.session-store.service:$mfwSessionAction",
      "shortName": "$mfwSessionAction",
      "type": "service",
      "moduleName": "mfw.security.session-store",
      "shortDescription": "App Action.",
      "keywords": "$mfwsessioneventconstant action api app broadcastlogin broadcastlogout broadcastupdatecredentials constant current dispatches flux login logout method mfw security service session-store update_credentials user userinfo"
    },
    {
      "section": "api",
      "id": "mfw.security.session-store.service:$mfwSessionStore",
      "shortName": "$mfwSessionStore",
      "type": "service",
      "moduleName": "mfw.security.session-store",
      "shortDescription": "Session Store that notifies session changes: login and logout.",
      "keywords": "$mfwsessioneventconstant actions api automatically changes constant credentials-update event fires flux handles login logout mfw notifies security service session session-store store update_credentials"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.cookies",
      "shortName": "mfw.security.storage.cookies",
      "type": "overview",
      "moduleName": "mfw.security.storage.cookies",
      "shortDescription": "Description",
      "keywords": "$mfwsecuritystoragecookieconfig api configuration constant cookies credentials description mfw ngcookies object overview recovery reloading security session settings status storage store update user"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.cookies.$mfwSecurityStorageCookieProvider",
      "shortName": "mfw.security.storage.cookies.$mfwSecurityStorageCookieProvider",
      "type": "service",
      "moduleName": "mfw.security.storage.cookies",
      "shortDescription": "Provider for $mfwSecurityStorageCookie",
      "keywords": "$mfwsecuritystoragecookie $mfwsecuritystoragecookieprovider api cookies mfw provider security service storage"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.cookies.constant:$mfwSecurityStorageCookieConfig",
      "shortName": "$mfwSecurityStorageCookieConfig",
      "type": "object",
      "moduleName": "mfw.security.storage.cookies",
      "shortDescription": "Configuration object for $mfwSecurityStorageCookie service.",
      "keywords": "$mfwsecuritystoragecookie api applied auth_ configuration constant cookies cookiesprefix default mfw object prefix property security service storage"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.cookies.service:$mfwSecurityStorageCookie",
      "shortName": "$mfwSecurityStorageCookie",
      "type": "service",
      "moduleName": "mfw.security.storage.cookies",
      "shortDescription": "Implementation of security storage based on cookies.",
      "keywords": "api based clear clears cookies credentials function getter implementation mfw security service set setter storage stored user userinfo"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.localstorage",
      "shortName": "mfw.security.storage.localstorage",
      "type": "overview",
      "moduleName": "mfw.security.storage.localstorage",
      "shortDescription": "Description",
      "keywords": "$mfwsecuritystoragelocalstorageconfig api configuration constant credentials description local localstorage mfw object overview recovery reloading security session settings status storage store update user"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.localstorage.$mfwSecurityStorageLocalStorageProvider",
      "shortName": "mfw.security.storage.localstorage.$mfwSecurityStorageLocalStorageProvider",
      "type": "service",
      "moduleName": "mfw.security.storage.localstorage",
      "shortDescription": "Provider for $mfwSecurityStorageLocalStorage",
      "keywords": "$mfwsecuritystoragelocalstorage $mfwsecuritystoragelocalstorageprovider api localstorage mfw provider security service storage"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.localstorage.service:$mfwSecurityStorageLocalStorage",
      "shortName": "$mfwSecurityStorageLocalStorage",
      "type": "service",
      "moduleName": "mfw.security.storage.localstorage",
      "shortDescription": "Implementation of security storage based on local storage.",
      "keywords": "api based clear clears credentials function getter implementation local localstorage mfw security service set setter storage stored user userinfo"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.secured-cookies",
      "shortName": "mfw.security.storage.secured-cookies",
      "type": "overview",
      "moduleName": "mfw.security.storage.secured-cookies",
      "shortDescription": "Description",
      "keywords": "$mfwsecuritystoragesecuredcookiesconfig accessible api configuration constant cookies credentials description javascript mfw object overview secured secured-cookies security settings storage store update user"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.secured-cookies.$mfwSecurityStorageSecuredCookiesProvider",
      "shortName": "mfw.security.storage.secured-cookies.$mfwSecurityStorageSecuredCookiesProvider",
      "type": "service",
      "moduleName": "mfw.security.storage.secured-cookies",
      "shortDescription": "Provider for $mfwSecurityStorageSecuredCookies",
      "keywords": "$mfwsecuritystoragesecuredcookies $mfwsecuritystoragesecuredcookiesprovider api mfw provider secured-cookies security service storage"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.secured-cookies.service:$mfwSecurityStorageSecuredCookies",
      "shortName": "$mfwSecurityStorageSecuredCookies",
      "type": "service",
      "moduleName": "mfw.security.storage.secured-cookies",
      "shortDescription": "Implementation of security storage based on volatile memory.",
      "keywords": "api based clear clears credentials function getter implementation memory mfw secured-cookies security service set setter storage stored user userinfo volatile"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.volatile-memory",
      "shortName": "mfw.security.storage.volatile-memory",
      "type": "overview",
      "moduleName": "mfw.security.storage.volatile-memory",
      "shortDescription": "Description",
      "keywords": "$mfwsecuritystoragevolatilememoryconfig api configuration constant credentials description memory mfw object overview recover reloading security session settings status storage store update user volatile-memory"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.volatile-memory.$mfwSecurityStorageVolatileMemoryProvider",
      "shortName": "mfw.security.storage.volatile-memory.$mfwSecurityStorageVolatileMemoryProvider",
      "type": "service",
      "moduleName": "mfw.security.storage.volatile-memory",
      "shortDescription": "Provider for $mfwSecurityStorageVolatileMemory",
      "keywords": "$mfwsecuritystoragevolatilememory $mfwsecuritystoragevolatilememoryprovider api mfw provider security service storage volatile-memory"
    },
    {
      "section": "api",
      "id": "mfw.security.storage.volatile-memory.service:$mfwSecurityStorageVolatileMemory",
      "shortName": "$mfwSecurityStorageVolatileMemory",
      "type": "service",
      "moduleName": "mfw.security.storage.volatile-memory",
      "shortDescription": "Implementation of security storage based on volatile memory.",
      "keywords": "api based clear clears credentials function getter implementation memory mfw security service set setter storage stored user userinfo volatile volatile-memory"
    },
    {
      "section": "api",
      "id": "mfw.security.user-parser.identity",
      "shortName": "mfw.security.user-parser.identity",
      "type": "overview",
      "moduleName": "mfw.security.user-parser.identity",
      "shortDescription": "Description",
      "keywords": "api behaviour defaul description function identity implementation mfw overview parser security user-parser"
    },
    {
      "section": "api",
      "id": "mfw.security.user-parser.identity.service:$mfwSecurityParserIdentity",
      "shortName": "$mfwSecurityParserIdentity",
      "type": "service",
      "moduleName": "mfw.security.user-parser.identity",
      "shortDescription": "Service by default when no other parser is specified. Returns user as it recieves it.",
      "keywords": "api behaves default funciton identity mfw parse parser recieves returns security service user user-parser"
    },
    {
      "section": "api",
      "id": "mfw.security.user-parser.jwt",
      "shortName": "mfw.security.user-parser.jwt",
      "type": "overview",
      "moduleName": "mfw.security.user-parser.jwt",
      "shortDescription": "Description",
      "keywords": "angular-jwt api description endpoint implementation integrate jwt mfw overview parser security tempos21 user-parser"
    },
    {
      "section": "api",
      "id": "mfw.security.user-parser.jwt.service:$mfwSecurityParserJWT",
      "shortName": "$mfwSecurityParserJWT",
      "type": "service",
      "moduleName": "mfw.security.user-parser.jwt",
      "shortDescription": "Service that converts a T21 REST security response to a UserInfo object needed by mfw.security module.",
      "keywords": "api converts fromstorage jwt mfw module needed object parse parsed response rest security service t21 user user-parser userinfo"
    }
  ],
  "apis": {
    "api": true
  },
  "html5Mode": false,
  "editExample": true,
  "startPage": "/api/mfw.security",
  "scripts": [
    "angular.min.js"
  ]
};