var hm = require('header-metadata');

// Get single header value. Read the content-type header (case insensitive).
// Note that if there are multiple headers with the same name (e.g. 
// set-cookie), then only the first header is returned as a string
var contentType = hm.current.get('content-type');

// Retrieve a json object with all headers
var allHeaders = hm.current.get();

// Retrieve a json object with all headers in another form
var allHeaders = hm.current.headers;

// Set single header. Sets X-new-header to a value of new-header.
hm.current.set('X-new-header', 'new-header');

 // Allows for set-cookie on multiple lines
hm.current.set('set-cookie', ['value1', 'value2']);

// write the status code with a number. Standard reasonPhrase is set to
// the corresponding value (in this case, .OK.).
hm.current.statusCode = "200";
hm.current.statusCode = 200;

// specify status code with a string containing the statusCode and 
// reasonPhrase separated by a single space.
hm.current.statusCode = "200 Super-Duper";

// Get the status code and reason phrase 
var currentStatusCode = hm.current.statusCode;     // 200
var currentReasonPhrase = hm.current.reasonPhrase; // Super-Duper

// Also can get the status code and reason phrase off the wire
var originalStatusCode = hm.original.statusCode;
var originalReasonPhrase = hm.original.reasonPhrase;

session.output.write({
    contentType: contentType,
    allHeaders: allHeaders,
    currentStatusCode: currentStatusCode,
    currentReasonPhrase: currentReasonPhrase,
    originalStatusCode: originalStatusCode,
    originalReasonPhrase: originalReasonPhrase
});
