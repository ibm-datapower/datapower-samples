/*
  Licensed Materials - Property of IBM
  IBM WebSphere DataPower Appliances
  Copyright IBM Corporation 2014. All Rights Reserved.
  US Government Users Restricted Rights - Use, duplication or disclosure
  restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var xmlString = 
            '<?xml version="1.0"?>' +
            '<library ' +
            '  xmlns:hr="http://w3.ibm.com/hr" >' +
            '<book id="1">' +
            '  <title>DataPower Admin</title>' +
            '  <hr:author hr:id="auth1">Hermann</hr:author>' +
            '</book>' +
            '<book id="2">' +
            '  <title>DataPower Development</title>' +
            '  <hr:author hr:id="auth2">Tim</hr:author>' +
            '</book>' +
            '<book id="3">' +
            '  <title>DataPower Capacity</title>' +
            '  <hr:author hr:id="auth3">Jimmy</hr:author>' +
            '</book>' +
            '</library>';


var domTree = undefined;
try {
    // use XML.parse() to parse the xmlString into a DOM tree structure
    domTree = XML.parse(xmlString);
} catch (error) {
    // there was an error while parsing the XML string
    console.error('error parsing XML string ' + error);
    throw error;
}


// to use xpath, require the 'transform' module
var transform = require('transform');

// titles and authors will store all books' titles and authors
var titles, authors;

// use xpath to find the books on the domTree (entire document)
transform.xpath('/library/book/title/text()', domTree, function(error, titleNodeList) {
    if (error) {
        console.error('error while executing /library/book/title/text() xpath - ' + error);
        throw error;
    } else {
        titles = titleNodeList; // titleNodeList is DOM NodeList structure

        // use xpath to find the authors
        // since we need to specify the namespace, we need to define the xpathOption object
        // for using with the transform.xpath() API
        var xpathOption = {
            xmldom: domTree,
            namespace: { "hr": "http://w3.ibm.com/hr" },
            expression: '/library/book/hr:author/text()',
        };

        transform.xpath(xpathOption, function(error, authorNodeList) {
            if (error) {
                console.error('error while executing /library/book/hr:author/text() xpath - ' + error);
                throw error;
            } else {
                authors = authorNodeList; // authorNodeList is DOM NodeList structure

                var result = '';
                for (var c=0; c<titles.length; c++) {
                    result += titles.item(c).textContent + ', by ' + authors.item(c).textContent + '\n';
                }
                session.output.write(result);
            }
        })
    }
});



