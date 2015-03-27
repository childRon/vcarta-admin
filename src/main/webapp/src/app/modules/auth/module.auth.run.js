(function (angular, jcs) {
    'use strict';

angular.module(jcs.modules.auth.name).run([
    '$rootScope',
    '$location',
    jcs.modules.auth.services.authorization,
    '$templateCache',
    function ($rootScope, $location, authorization,  $templateCache) {
        var routeChangeRequiredAfterLogin = false,
            loginRedirectUrl;

        $rootScope.$on('$routeChangeStart', function (event, next) {


//            $templateCache.removeAll();

            var authorised;
           if (routeChangeRequiredAfterLogin && next.originalPath !== jcs.modules.auth.routes.login) {
                routeChangeRequiredAfterLogin = false;

                $location.path(loginRedirectUrl).replace();
            } else if (next.access !== undefined) {
               console.log("2")
                authorised = authorization.authorize(next.access.loginRequired,
                                                     next.access.permissions,
                                                     next.access.permissionCheckType);
                if (authorised === jcs.modules.auth.enums.authorised.loginRequired) {
                    routeChangeRequiredAfterLogin = true;
                    loginRedirectUrl = next.originalPath;
                    $location.path(jcs.modules.auth.routes.login);
                } else if (authorised === jcs.modules.auth.enums.authorised.notAuthorised) {
                    $location.path(jcs.modules.auth.routes.notAuthorised).replace();
                }
            }
        });


     /*   $rootScope.$on('stateChangeStart', function (event, next) {
            if (typeof(current) !== 'undefined'){
                $templateCache.remove(current.templateUrl);
            }

            var authorised;
            if (routeChangeRequiredAfterLogin && next.originalPath !== jcs.modules.auth.routes.login) {
                routeChangeRequiredAfterLogin = false;
                $location.path(loginRedirectUrl).replace();
            } else if (next.access !== undefined) {
                authorised = authorization.authorize(next.access.loginRequired,
                    next.access.permissions,
                    next.access.permissionCheckType);
                if (authorised === jcs.modules.auth.enums.authorised.loginRequired) {
                    routeChangeRequiredAfterLogin = true;
                    loginRedirectUrl = next.originalPath;
                    $location.path(jcs.modules.auth.routes.login);
                } else if (authorised === jcs.modules.auth.enums.authorised.notAuthorised) {
                    $location.path(jcs.modules.auth.routes.notAuthorised).replace();
                }
            }
        });*/


    }]);
}(angular, jcs));