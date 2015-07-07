/*
  Licensed Materials - Property of IBM
  IBM WebSphere DataPower Appliances
  Copyright IBM Corporation 2014. All Rights Reserved.
  US Government Users Restricted Rights - Use, duplication or disclosure
  restricted by GSA ADP Schedule Contract with IBM Corp.
*/

try {
	Integer.parseInt('string');
} catch (error) {
	
	// English text message describing the failure that occurred
	error.errorMessage;

	// Message ID in hex string format
	error.errorCode;

	// English help text describing what the error is and the cause.
	error.errorDescription; 

	// English suggestion on how to resolve the error
	error.errorSuggestion;

	// Back trace listing the call stack leading up to the error occurrence.
	error.stack;
	
	session.output.write(error);
}