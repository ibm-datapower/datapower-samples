var jose = require('jose');
var plaintext = "verification succeed!";

// JSON Web Encryption (JWE) Encryption Examples
// JWE Objects may be either JWE Compact Serialization format or
// JWE JSON Serialization format.
// Default format is Compact Serialization.

// jose will throw an exception if errors are encountered.  This example uses a
// try-catch block to log the error information received and then write it to
// the output context.  try-catch should not, however, be relied upon for
// control flow in the case of the asynchronous .encrypt and .decrypt calls.

// Some useful API call examples are provided via "FYI HowTo: " comment blocks

try {
  //--------------------------------------------------------------------------
  // Example: JWE Object Compact Serialization Format
  //--------------------------------------------------------------------------
  // Create a jweHeader object and specify the encryption algorithm to use
  // The following values for the algorithm are supported.
  //    A128CBC-HS256
  //    A192CBC-HS384
  //    A256CBC-HS512
  var jweHdr = jose.createJWEHeader('A128CBC-HS256');
  // Set the algorithm header parameter in the protected header
  // The following values for the algorithm are supported.
  //    RSA1_5        (Key Encryption algorithm)
  //    RSA-OAEP      (Key Encryption algorithm)
  //    RSA-OAEP-256  (Key Encryption algorithm)
  //    A128KW        (Key Wrapping algorithm)
  //    A192KW        (Key Wrapping algorithm)
  //    A256KW        (Key Wrapping algorithm)
  //    dir           (direct encryption with a shared symmetric key)
  jweHdr.setProtected('alg', 'RSA1_5');
  //
  // FYI HowTo: Retrieve a JSON object of all name/value pair header
  // parameters set in the protected header
  //    var jweHdrProtectedHeader = jweHdr.getProtected();
  // FYI HowTo: Retrieve the value of a named header parameter which
  // was set in the protected header
  //    var jweHdrProtectedHeaderALG = jweHdr.getProtected('alg');
  // Set the key object to process the encrypted key
  jweHdr.setKey('Alice');
  // FYI HowTo:  Retrieve the key value
  //    jweHdr.getKey();
  // Specify which jweHeader defines how to encrypt this message then
  // update the jweEncrypter with the message to be encrypted then
  // encrypt the JWE Encryption object using the compact serialization
  // output_format as specified
  jose.createJWEEncrypter(jweHdr).update(plaintext).encrypt('compact', function(error, jweCompactObj) {
      if (error) {
        // An error occurred during the encrypt process and is passed back
        // via the error parameter since .encrypt is an asynchronous call
        // write the error to the output context
        session.reject(error);
        return;
      } else {
          // Since encryption was successful the compact format output will be
          // a string that can be written to the output context
          // BASE64URL(UTF8(JWE Protected Header)) || '.' ||
          // BASE64URL(JWE Encrypted Key) || '.' ||
          // BASE64URL(JWE Initialization Vector) || '.' ||
          // BASE64URL(JWE Ciphertext) || '.' ||
          // BASE64URL(JWE Authentication Tag)
          //   session.output.write(jweCompactObj);
          // or logged....
          //   console.debug(jweCompactObj);
          // or decrypt .....
          //--BEGIN DECRYPT---------
          // Parse the JWE representation to extract the serialized values for
          // the components of the JWE.  Returns an instance of JWEObject
          // through which you can access the JWE content.
          var jweObj = jose.parse(jweCompactObj);
          // FYI HowTo: Retrieve the value assigned to a named header
          // parameter or 'undefined'
          //    var jweObjALG = jweObj.get('alg');
          // FYI HowTo: Retrieve the shared protected header as a JSON object
          //    var jweObjProtectedHeader = jweObj.getProtected();
          // FYI HowTo: Retrieve the value assigned to a named header
          // parameter in the protected header only
          //    var jweObjProtectedHeaderALG = jweObj.getProtected('alg');
          // FYI HowTo: Set shared secret key only used for Direct Encryption
          //    jweObj.setDirectKey("directKey");
          // Set key object to process the encrypted key
          jweObj.setKey("Alice");
          // The decrypt will only be attempted if key has been specified
          jose.createJWEDecrypter(jweObj).decrypt(function(error, plaintext) {
              if (error) {
                // An error occurred during the decrypt process and is passed back
                // via the error parameter since .decrypt is an asynchronous call
                // write the error to the output context
                session.reject(error);
                return;
              } else {
                  // since the decryption was successful you can write the
                  // plaintext to the output context
                  session.output.write(plaintext);
              }
          });
          //--END DECRYPT---------
      }
  });
  //--------------------------------------------------------------------------
  // Example: JWE Object JSON Serialization Format
  //--------------------------------------------------------------------------
  var crit_list = ['exp', 'mykid'];
  var exp = {'exp': '9999'};
  var mykid1 = {'mykid': 'Alice'};
  var mykid2 = {'mykid': 'Bob'};
  var bob_sskey = new Buffer([25, 172, 32, 130, 225, 114, 26, 181, 138, 106, 254, 192, 95, 133, 74, 82]);
  // Create a jweHeader object and specify the encryption algorithm to use
  var jweHdr = jose.createJWEHeader('A128CBC-HS256');
  // Set header parameters in the shared protected header via a JSON object
  jweHdr.setProtected(exp);
  // Indicate required custom Header Parameters via the crit Header Parameter
  jweHdr.setProtected('crit',crit_list);
  // FYI HowTo: Retrieve a JSON object of all name/value pair header
  // parameters set in the shared unprotected header
  //    var jweHdrUnprotectedHeader = jweHdr.getUnprotected();
  // FYI HowTo: Retrieve the value of a named header parameter which was set
  // in the shared unprotected header
  //    var jweHdrUnprotectedHeaderKID1 = jweHdr.getProtected('kid1');
  // Create a JWE Recipient and set the key,algorithm and unprotected header
  // header parameters.
  jweHdr.addRecipient('Alice', 'RSA1_5', mykid1);
  // In this case the shared secret key is passed in via a Buffer
  jweHdr.addRecipient(bob_sskey, 'A128KW', mykid2);
  // FYI HowTo: Retrieve a JSON object of all defined recipients
  //    var jweHdrRecipients = jweHdr.getRecipients();
  // Specify which jweHeader defines how to encrypt this message then
  // update the jweEncrypter with the message to be encrypted then
  // encrypt the JWE Encryption object using the json serialization
  // output_format as specified
  jose.createJWEEncrypter(jweHdr).update(plaintext).encrypt('json', function(error, jweJSONObj) {
      if (error) {
        // An error occurred during the encrypt process and is passed back
        // via the error parameter since .encrypt is an asynchronous call
        session.reject(error.errorMessage);
        return;
      } else {
          // Since encryption was successful the output will be a JSON object
          // which can be written to the output context
          //   {
          //   "protected":"BASE64URL(UTF8(JWE Protected Header))",
          //   "unprotected":"JWE Shared Unprotected Header"",
          //   "recipients":[
          //   {"header":JWE Per-Recipient Unprotected Header 1,
          //   "encrypted_key":"BASE64URL(JWE Encrypted Key 1)"},
          //   ...
          //   {"header":JWE Per-Recipient Unprotected Header 2,
          //   "encrypted_key":"BASE64URL(JWE Encrypted Key N)"}],
          //   "aad":"BASE64URL(JWE AAD))",
          //   "iv":"BASE64URL(JWE Initialization Vector)",
          //   "ciphertext":"BASE64URL(JWE Ciphertext)",
          //   "tag":"BASE64URL(JWE Authentication Tag)"
          //   }
          //    session.output.write(jweJSONObj);
          // or logged....
          //    console.debug(jweJSONObj);
          // or decrypt .....
          //--BEGIN DECRYPT---------
          // Parse the JWE representation to extract the serialized values for the
          // components of the JWE.  Returns an instance of JWEObject through which
          // you can access the JWE content.
          var jweObj = jose.parse(jweJSONObj);
          // FYI HowTo: retrieve the value assigned to a named header
          // parameter or 'undefined'
          //    var jweObjKID = jweObj.get('kid');
          // FYI HowTo: retrieve the shared protected header as a JSON object
          //    var jweObjProtectedHeader = jweObj.getProtected();
          // FYI HowTo: retrieve the value assigned to a named header
          // parameter in the protected header
          //    var jweObjProtectedHeaderALG = jweObj.getProtected('alg');
          // The following apply only when using JSON Serialization
          // FYI HowTo: Retrieve the shared unprotected header as a JSON object
          //    var jweObjUnprotectedHeader = jweObj.getUnprotected();
          // FYI HowTo: Retrieve the value assigned to a named header
          // parameter in the unprotected header
          //    var jweObjUnprotectedHeaderENC = jweObj.getUnprotected('enc');
          // Retrieve the array of recipient header objects
          var jweObjRecipients = jweObj.getRecipients();
          // FYI HowTo: Set shared secret key only used for Direct Encryption
          //     jweObj.setDirectKey("directKey");
          // set the key for a particular recipient
          for (var i = 0; i < jweObjRecipients.length; i++) {
             // query the alg value specified for the JWE Recipient
             // set the key to Alice if this recipient's alg is RSA1_5 and
             // the recipients kid is Alice
             if (jweObjRecipients[i].get("alg") === 'RSA1_5') {
                  if (jweObjRecipients[i].get("mykid") === 'Alice')
                    jweObjRecipients[i].setKey("Alice");
             } else  {
                 if (jweObjRecipients[i].get("alg") === 'A128KW') {
                   if (jweObjRecipients[i].get("mykid") === 'Bob')
                     jweObjRecipients[i].setKey(bob_sskey);
                 }
             }
           }
          // The decrypt will only be attempted if a key has been specified
          jose.createJWEDecrypter(jweObj).decrypt(function(error, plaintext) {
              if (error) {
                // An error occurred during the decrypt process and is passed back
                // via the error parameter since .decrypt is an asynchronous call
                session.reject(error.errorMessage);
                return;
              } else {
                  // since the decryption was successful you can write the
                  // plaintext to the output context
                  session.output.write(plaintext);
              }
          });
          //--END DECRYPT---------
      }
  });
} catch(e) {
  session.reject("example-jwe-encrypt-decrypt.js error: " + e);
  return;
}

