var sm = require ('service-metadata');

// Make the MPGW act as a loopback through the dotted notation
sm.mpgw.skipBackside = true;

// Set the service variables using the URL notation
sm.setVar('var://service/mpgw/skip-backside', true);

// Read the protocol method as a string using dotted notation
var method = sm.protocolMethod;  

// Read the protocol method as a string using the URL notation
method = sm.getVar ('var://service/protocol-method');

// Read the entire list of descriptors of variables using the list() method
var list = sm.list();
var descSkipBackside = list.filter(function(elm) {
    return elm.name === 'var://service/mpgw/skip-backside';
})[0];

session.output.write({
    method: method,
    descSkipBackSide: descSkipBackside
});
