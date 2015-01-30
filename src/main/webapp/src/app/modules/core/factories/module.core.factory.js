(function (angular, jcs) {
    'use strict';

    angular.module(jcs.modules.core.name).factory(jcs.modules.core.factory.httpTransformer,
        function () {
            // I prepare the request data for the form post.
            function transformRequest(data, getHeaders) {

                var headers = getHeaders();

                headers[ "Content-Type" ] = "application/x-www-form-urlencoded; charset=utf-8";

                return( serializeData(data) );

            }


            // Return the factory value.
            return( transformRequest );


            // ---
            // PRVIATE METHODS.
            // ---

            function encodeData(s){
                return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
            }


            // I serialize the given Object into a key-value pair string. This
            // method expects an object and will default to the toString() method.
            // --
            // NOTE: This is an atered version of the jQuery.param() method which
            // will serialize a data collection for Form posting.
            // --
            // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45

            function serializeData(data) {

                // If this is not an object, defer to native stringification.
                if (!angular.isObject(data)) {

                    var encodedData = encodeData(( data == null ) ? "" : data.toString());
                    console.log(encodedData)
                    return    encodedData;

                }

                var buffer = [];

                // Serialize each key in the object.
                for (var name in data) {

                    if (!data.hasOwnProperty(name)) {

                        continue;

                    }

                    var value = data[ name ];

                    buffer.push(
                        encodeURIComponent(name) +
                            "=" +
                            encodeURIComponent(( value == null ) ? "" : value)
                    );

                }

                // Serialize the buffer and clean it up for transportation.
                var source = buffer
                        .join("&")
                        .replace(/%20/g, "+")
                    ;
                return( source );

            }
        }
    );
}(angular, jcs));
