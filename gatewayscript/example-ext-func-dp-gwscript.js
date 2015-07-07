/**
 * Licensed Materials - Property of IBM
 * IBM WebSphere DataPower Appliances
 * Copyright IBM Corporation 2015. All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 **/

//This js file is created to demonstrate how to invoke a GatewayScript program
//in an XSLT stylesheet. So this file is supposed to be invoked from the
//stylesheet "example-ext-func-dp-gwscript.xsl" in the same directory. Please
//read the stylesheet for information.

//example-ext-func-dp-gwscript.js
//  1. Read the JWT token from the input context into a Buffer object.
//  2. Using the JWT APIs, decrypt the token with the given parameter 'key'.
//  3. Write the decrypted result to the output context.
var jwt = require('jwt');

session.input.readAsBuffer(function(error, buff) {
    //debugger;

    if (error) {
        session.output.write('unable to read from input: ' + error);
    } else {
        var jwtToken = buff.toString();

        var decoder = new jwt.Decoder(jwtToken);

        // decrypt with the given key 'Alice'
        decoder.addOperation('decrypt', session.parameters.key)
               .decode(function(error, claims) {
                  if (error) {
                      session.output.write('cannot decode the JWT: ' + error);
                  } else {
                      // write the JWT claims to output
                      session.output.write(claims);
                  }
               });
    }
});

