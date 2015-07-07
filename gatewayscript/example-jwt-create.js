/*
  Licensed Materials - Property of IBM
  IBM WebSphere DataPower Appliances
  Copyright IBM Corporation 2015. All Rights Reserved.
  US Government Users Restricted Rights - Use, duplication or disclosure
  restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var jose = require('jose');
var jwt = require('jwt');

var claims = { 'iss': 'ibm',
               'aud': [ 'datapower', 'gatewayscript'],
               'exp': (new Date()/1000) + 60*60,  // expire in 60 mins
             };

// use HS256 algorithm and key 'Alice' to sign
var jwsHeader = jose.createJWSHeader('Alice', 'HS256');

// use A128CBC-HS256 algorithm and key '32bytes' to encrypt
var jweHeader = jose.createJWEHeader('A128CBC-HS256')
                    .setProtected('alg', 'dir')
                    .setKey('32bytes');

var encoder = new jwt.Encoder(claims);

// create a nest JWT - sign then encrypt
// set 'cty' header to "JWT" to comply with the JWT spec
encoder.addOperation('sign', jwsHeader) 
       .addOperation('encrypt',  jweHeader.setProtected('cty', 'JWT')) 
       .encode(function(error, token) {
          if (error) {
              session.output.write('error creating JWT: ' + error);
          } else {
              // write the JWT token to output
              session.output.write(token);
          }
       });