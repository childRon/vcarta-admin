(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.app.name, [
        "ngRoute",
  		"ngTouch",
  		"mobile-angular-ui",
	    "smart-table",
  		"lrDragNDrop",
        jcs.modules.core.name,
        jcs.modules.auth.name,
        jcs.modules.admin.name,
        jcs.modules.pages.name
    ]);
}(angular, jcs));