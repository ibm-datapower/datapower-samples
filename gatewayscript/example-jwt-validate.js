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
