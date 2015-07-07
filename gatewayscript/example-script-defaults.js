/*
 * In a GatewayScript program, there is a predefined object: 'script' which is used
 * to access script level settings. It is available in both a GWS action script and
 * a module script. Currently, the 'script' object provides the following API:
 * 
 * - script.defaults(options)
 *   To change the script level settings. The "settings"' scope is the execution
 *   period of a GWS action.
 *   The following options are supported:
 *   - 'errorObjectLogging' : turn on/off the error log when GWS APIs throw an
 *      error object. The property is a boolean (true|false) and its default value
 *      is 'true'.
 * 
 * 
 * This example script shows how to change the 'errorObjectLogging' script
 * setting. 
 */

//use script.defaults() to turn off the error log when GWS APIs throw an error.
script.defaults( {'errorObjectLogging': false} );

/*
 * Read the 'input' as a JSON object. Because the 'errorObjectLogging' setting is
 * turned off, there will be no error log if the payload of the 'input' is not
 * a valid JSON document.
 */
session.input.readAsJSON( function ( error, json) {
    if ( error ) {
        //We only get the 'error' object but no error log message for the 'error' 
        //because the 'errorObjectLogging' setting is turned off.
        session.reject( 'input is not a valid JSON document' );
        return;
    }
    //Handle the JSON object as usual when the payload of the 'input' is
    //properly parsed as a valid JSON.
    console.info(JSON.stringify(json));
} );
