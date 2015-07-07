// Licensed Materials - Property of IBM
// IBM WebSphere DataPower Appliances
// Copyright IBM Corporation 2014. All Rights Reserved.
// US Government Users Restricted Rights - Use, duplication or disclosure
// restricted by GSA ADP Schedule Contract with IBM Corp.

var headers = require('header-metadata');
var sf      = require('sprintf').sprintf;

// set five parameters 
//       grp        = lb group to control
//       svr        = server name in lb group to toggle up/down
//       svrport    = server port of server in lb group
//       healthport = health port of server used to perform health check
//       evaluator  = evaluator metadata to help parse the response

var grp = session.parameters.grp;
var svr = session.parameters.svr;
var svrport = (session.parameters.svrport) ? session.parameters.svrport:0;
var healthport = (session.parameters.healthport) ? session.parameters.healthport:0;
var evaluator = session.parameters.evaluator;

console.debug("in custom healthcheck.js for server %s:%d from lb-group %s", svr, healthport, grp);
// In the default case, mark the server as 'unhealthy' if it responded with a status code that is not 200
if (headers.current.statusCode != 200) {
    session.reject(sf ("Server %s:%d from lb-group %s is unhealthy, status code: %d", svr, healthport, grp, headers.current.statusCode));
} else {
    // attempt to get the input data as JSON.  
    session.input.readAsJSON(function (readAsJSONError, jsonResponse) {
        // A JSON parsing error will result in a reject which === health check failure
        if (readAsJSONError) {
            session.reject(sf ("Server %s:%d from lb-group %s did not return at JSON response, readAsJSON error code: %d", 
                           svr, healthport, grp, readAsJSONError.errorCode));
        } else {
            // since the response is JSON, parse the evaluator string into a JSON object and iterate through every property
            // of the evaluator to make sure the value desired is in the actual response.  If any property in the evaluator
            // fails to match the actual healthcheck response, a reject which === health check failure will be issued
            try {
                var evaluatorObject = JSON.parse(evaluator);
                for (var property in evaluatorObject) {
                    if (evaluatorObject[property] != jsonResponse[property]) {
                        session.reject(sf ("Server %s:%d from lb-group %s healthcheck response invalid, expected: %s received %s", 
                                           svr, healthport, grp, evaluatorObject[property], jsonResponse[property]));
                    } else {
                        console.debug("in custom healthcheck.js for server %s:%d from lb-group %s, successful evaluation of property %s", 
                                      svr, healthport, grp, property);
                    }
                }
            } catch (err) {
                session.reject(sf ("Server %s:%d from lb-group %s evaluator is not a JSON object, errorMessage: %s", 
                                   svr, healthport, grp, err.errorMessage));
            }
        }
    });
}
