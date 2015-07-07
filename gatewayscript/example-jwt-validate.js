/*
  Licensed Materials - Property of IBM
  IBM WebSphere DataPower Appliances
  Copyright IBM Corporation 2015. All Rights Reserved.
  US Government Users Restricted Rights - Use, duplication or disclosure
  restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var jwt = require('jwt');
session.input.readAsBuffer(function(error, buff) {
    if (error) {
        session.output.write('unable to read from input: ' + error);
    } else {
        var jwtToken = buff.toString();
        var decoder = new jwt.Decoder(jwtToken);
        decoder.addOperation('decrypt', '32bytes') // decrypt with key '32bytes'
               .addOperation('verify', 'Alice')    // verify with key 'Alice'
               .addOperation('validate', {'aud': 'datapower'}) // validate JWT
               .decode(function(error, claims) {
                  if (error) {
                      session.output.write('error validating JWT ' + error);
                  } else {
                      // write the JWT claims to output
                      session.output.write(claims);
                  }
               });
    }
});