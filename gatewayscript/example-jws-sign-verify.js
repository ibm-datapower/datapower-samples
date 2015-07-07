var jose = require('jose');
var plaintext = "verification succeed!";

// JSON Web Signature (JWS) Signing/Encoding Examples
// JWS Objects may be either JWS Compact Serialization format or
// JWS JSON Serialization format.

// jose will throw an exception if errors are encountered.  This example uses a
// try-catch block to log the error information received and then write it to
// the output context.  try-catch should not, however, be relied upon for
// control flow in the case of the asynchronous .sign and .verify calls.

// Some useful API call examples are provided via "FYI HowTo: " comment blocks
var keyKid2 = 'Alice2048RSA';
var keyKid1 = 'Alice2048HSA';

try {
  //--------------------------------------------------------------------------
  // Example: JWS Object Compact Serialization Format
  //--------------------------------------------------------------------------
  // Create a JWSHeader object to define the header parameters for the JWS
  // Set the key to "Alice" and the signing algorithm to "RS256"
  // The following values for the algorithm are supported.
  //    HS256
  //    HS384
  //    HS512
  //    RS256
  //    RS384
  //    RS512
  var jwsHdr = jose.createJWSHeader("Alice2048RSA", "RS256");
  // Set a header parameter named 'kid' in the Protected Header to the value
  // 'kid1'
  jwsHdr.setProtected('kid','kid2');
  // Create a digitally signed or Message Authentication Coded (MAC) JWS
  // signed message using the parameters defined in the jwsHdr after
  // update the JWS signature object with the jwsBuffer payload.
  // sign the JWS content and return a jwsObj in the compact output_format as
  // specified.
  jose.createJWSSigner(jwsHdr).update(plaintext).sign('compact', function(error, jwsObj) {
    if (error) {
      // An error occurred during the sign process and is passed back
      // via the error parameter since .sign is an asynchronous call
      // write the error to the output context
      session.reject(error.errorMessage);
      reject;
    } else {
      // jwsObj is the JWS Compact Serialization object.
      // BASE64URL(UTF8(JWS Protected Header)) || '.' ||
      // BASE64URL(JWS Payload) || '.' ||
      // BASE64URL(JWS Signature)
      // since the operation was successful you can write the
      // object to the output context
      //    session.output.write(jwsObj);
      // or log the value ...
      console.debug(jwsObj);
      // and/or verify it now...
      //--Begin Verify-------
      var jwsSignedObject = jose.parse(jwsObj) ;
      // Parse of the JWS successful
      // Access the per-signature data and set key for each signature
      //  for verification
      var signedJWSHeaders  = jwsSignedObject.getSignatures();
      for (var i = 0; i < signedJWSHeaders.length; i++) {
        var hdr2 = signedJWSHeaders[i];
        // Extract the value for the Header Parameter named 'kid'
        var kid = hdr2.get('kid');
        switch (kid) {
          case 'kid1':
            // Set the key so the signature can and will be verified
            hdr2.setKey(keyKid1);
            break;
          case 'kid2':
            hdr2.setKey(keyKid2);
            break;
          default:
            break;
        }
      }
      var myVerifier = jose.createJWSVerifier(jwsSignedObject);
      // Verify all signatures for which a key has been set
      // At least one signature must have key set
      myVerifier.validate( function(error){
        if (error) {
          // an error occurred during the sign process
          // write the error to the output context
          session.reject(error.errorMessage);
          return;
        } else {
          // All signature verifications have succeeded
          // therefore payload may be trusted
          var thePlaintext =  jwsSignedObject.getPayload();
          session.output.write(thePlaintext);
        }
      });
            //--End Verify-------
    }
  });
  //--------------------------------------------------------------------------
  // Example: JWS Object JSON Serialization Format
  //--------------------------------------------------------------------------
  // This example will generate multiple signatures
  // Create a JWSHeader object to define the header parameters for the JWS
  // Set the key to "Alice" and the signing algorithm to "HS256"
  var hdr1 = jose.createJWSHeader(keyKid1, 'HS256');
  // FYI HowTo: Retrieve the alg Header Parameter value of 'HS256' 'that was
  // set in the Protected Header via jose.createJWSHeader()
  //    var hdr1ALG = hdr1.getProtected('alg');
  // You can retrieve a single Header Parameter Value or a JSON Object of all the
  // Header Parameters set via get(), getProtected() and getUnprotected()
  // Set the 'kid' header parameter in the Protected Header value to 'kid1'
  // via a JSON object.
  hdr1.setProtected({'kid': "kid1"});
  // FYI HowTo: Retrieve the kid Header Parameter value
  //    var hdr1KID = hdr1.getProtected('kid');
  // Create a second JWSHeader object to define the header parameters for
  // a second signature in the JWS
  // Set the key and then set the the signing algorithm to "RS256"
  // via a name,value pair.  Both must be strings.
  // A JSON Object example is above.
  var hdr2 = jose.createJWSHeader('Bob');
  hdr2.setProtected('alg', 'RS256');
  // Set the 'kid' header parameter in the Protected Header value to 'kid2'
  hdr2.setProtected('kid', "kid2");
  // FYI: You can use Header Parameters that are meaningful only to you in either
  // the Protected or Unprotected Headers. The only validation that will be done is
  // to ensure both the name and value are valid strings.
  //   hdr2.setProtected('yada','MySecretMeaning');
  //   hdr2.Protected('blahblah','OnlyMeaningfulToMe');
  // FYI HowTo: Retrieve a JSON Object which represents all shared Header
  // Parameter values currently set.  This is called the JOSE Header.
  //    var theJOSEHeader = hdr2.getJOSEHeader();
  // Prepare to sign a JWS object.  2 Signatures will be generated.
  // The first using the header parameters as specified in hdr1, the second
  // using the header parameters specified in hdr2
  var mySign = jose.createJWSSigner(hdr1,hdr2);
  // Update with the data to be signed
  mySign.update(plaintext);
  // Execute the JWS sign action
  mySign.sign('json',function(error, jwsObj) {
    if (error) {
      // An error occurred during the sign process and is passed back
      // via the error parameter since .sign is an asynchronous call
      // write the error to the output context
      throw new Error(error);
    } else {
      // jwsObj is the JWS JSON Serialization object.
      // {
      //   "payload":"BASE64URL(JWS Payload)",
      //   "signatures":[
      //     {"protected":"BASE64URL(UTF8(JWS Protected Header 1))",
      //      "header":<non-integrity-protected header 1 contents>,
      //      "signature":"BASE64URL(JWS Signature 1)"},
      //     ...
      //     {"protected":"BASE64URL(UTF8(JWS Protected Header N))",
      //      "header":<non-integrity-protected header N contents>,
      //      "signature":"BASE64URL(JWS Signature N)"}]
      //  }
      //
      // since the operation was successful you can write the
      // object to the output context
      //    session.output.write(jwsObj);
      // or log the value ...
      //    console.debug(jwsObj);
      // or verify it now...
      //--Begin Verify-------
      var jwsSignedObject = jose.parse(jwsObj) ;
      // Parse of the JWS successful
      // Access the per-signature data and set key for each signature
      // for verification
      var signedJWSHeaders   = jwsSignedObject.getSignatures();
      for (var i = 0; i < signedJWSHeaders.length; i++) {
        var hdr2 = signedJWSHeaders[i];
        // FYI HowTo: Retrieve the Protected Header as a JSON Object
        // Retrieve a single Header Parameter Value by passing it's name
        // getProtected(name), getUnprotected(name) or get(name)
        //    var allProtectedHeaderParameters = hdr2.getProtected();
        // FYI HowTo: Retrieve the Unprotected Header as a JSON Object
        //    var allUnprotectedHeaderParameters = hdr2.getUnrotected();
        // Extract the value for the Header Parameter named 'kid'
        var kid = hdr2.get('kid');
        switch (kid) {
          case 'kid1':
            // Set the key so the signature can and will be verified
            hdr2.setKey(keyKid1);
            break;
          case 'kid2':
            // Set the key so the signature can and will be verified
            hdr2.setKey(keyKid2);
            break;
          default:
            break;
        }
      }
      var myVerifier = jose.createJWSVerifier(jwsSignedObject);
      // Verify all signatures for which a key has been set
      // At least one signature must have key set
      myVerifier.validate( function(error){
        if (error) {
          // an error occurred during the sign process
          // write the error to the output context
          throw new Error(error);
        } else {
          // All signature verifications have succeeded
          // therefore payload may be trusted
          var thePlaintext =  jwsSignedObject.getPayload();
          session.output.write(thePlaintext);
        }
      });
      //--End Verify-------
    }
  });
} catch(e) {
  console.error("example-jws-sign-verify.js error: " + e);
  session.output.write("example-jws-sign-verify.js error: " + e);
}
