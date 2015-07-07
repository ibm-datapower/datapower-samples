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


/**
 *  Traverse the XML tree and find out the titles
 *
 *  @return all the found titles in an Array
 */
function getTitlesByTraverseXmlTree() {
    var title = new Array();

    var traverseStack = new Array();
    // do tree traversing starting from the DOM tree documentElement
    traverseStack.push(domTree.documentElement); 
    while (traverseStack.length > 0) {
        var node = traverseStack.pop();
        // we focus on ELEMENT nodes whose tagName is 'title'
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'title') {
            title.push(node.textContent);
        }
        if (node.nextSibling) {
            traverseStack.push(node.nextSibling);
        }
        if (node.firstChild) {
            traverseStack.push(node.firstChild);
        }
    }
    return title;
}

/**
 *  Use DOM's node.getElementsByTagNameNS() API to find all author information
 *
 *  @return all the found authors in an Array
 */
function getAuthorsByGetElementsAPI() {
    var author = new Array();
    // find all Element nodes who's local name is author and namespace is w3.ibm.com/hr
    var nodelist = domTree.getElementsByTagNameNS('http://w3.ibm.com/hr', 'author');
    for (var c=0; c<nodelist.length; c++) {
        author.push(nodelist.item(c).textContent);
    }
    return author;
}

// find out all titles and authors, and write the found titles/authors to output
var titles = getTitlesByTraverseXmlTree();
var authors = getAuthorsByGetElementsAPI();
var result = '';
for (var c=0; c<titles.length; c++) {
    result += titles[c] + ', by ' + authors[c] + '\n';
}
session.output.write(result);

