(function (angular, jcs) {
    'use strict';

    jcs.modules.core = {
        name: 'jcs-core',
        services: {
            eventbus: 'eventbus'
        },
        controllers: {
            main: 'MainController'
        },
        routes: {
            home: '/'
        }

    };

    angular.module(jcs.modules.core.name, []);
}(angular, jcs));
