// This script demonstrates an example scenario to examine and set the
// from and to partner IDs using service variables based on the protocol
// information.
//
// The partner profiles will be determined by following service variables
// and accessed:
//
// var://service/b2b-partner-from
// var://service/b2b-partner-to
//
// Following are also useful service variables for ebMS messaging:
//
// var://serive/b2b-ebms-cpa-id
// var://serive/b2b-ebms-service
// var://serive/b2b-ebms-action

var sm = require('service-metadata');
var hm = require('header-metadata');

// First, gather whatever information seems useful here. For instance,
// following gathers the information from protocol headers. You can also
// use session.input.readAsXXXX() methods to get the information from
// payload content.
var contentType = sm.getVar('var://service/original-content-type');
var protocol = sm.getVar('var://service/protocol');
var path = sm.getVar('var://service/URI');

// Then make a decision on the message type and trading partner IDs. If
// the variable var://service/b2b-doc-type is not set at document routing
// preprocessor stage, the document type will be autodetected from content
// payload and content-type header as appropriate (xml, x12, edifact,
// binary) to extract the b2b-partner-from and b2b-partner-to. For *binary*
// type message, this script must set partner variables, there is no way
// otherwise to determine their values.
if (protocol == 'dpmq') {
    // Messages received via MQ are binary, with fixed partner IDs
    sm.setVar('var://service/b2b-partner-from', '123456789');
    sm.setVar('var://service/b2b-partner-to', '987654321');
    sm.setVar('var://service/b2b-doc-type', 'binary');
} else if (protocol == 'http') {
    // Messages received via HTTP can derive partner IDs from headers
    sm.setVar('var://service/b2b-partner-from', hm.current.get ('X-Partner-From'));
    sm.setVar('var://service/b2b-partner-to', hm.current.get ('X-Partner-To'));
    sm.setVar('var://service/b2b-doc-type', 'binary');
} else {
    // By default, do nothing.  The B2B process will autodetect the
    // document type.
}
