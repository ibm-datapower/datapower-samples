// This script exemplifies urlopen to a static MQ URL for a request-reply traffic.
// It demonstrates how to supply MQ headers using JSON representation, how to
// do error handling from the MQ urlopen.open() result, and how to read the response
// headers as JSON objects.

var urlopen = require('urlopen');

// Here we define MQMD and MQRFH2 headers as JSON structure and supply them to be urlopen
// request headers for MQPUT. You can define other types of header values such as MQMP,
// MQOD, MQIIH, and the like. The following JSON objects are equevalent with the below XML
// representation:
//
// <MQMD>
//     <StructId>MD</StructId>
//     <Format>MQHRF2</Format>
//     <MsgType>1</MsgType>
//     <Persistence>1</Persistence>
// </MQMD>
//
// <MQRFH2>
//     <Version>2</Version>
//     <Format>MQSTR</Format>
//     <NameValueData>
//         <NameValue>
//             <usr>
//                 <From>From Business Partner</From>
//                 <To>To Business Partner</To>
//                 <ChargeBackType>credit</ChargeBackType>
//             </usr>
//         </NameValue>
//     </NameValueData>
// </MQRFH2>
//
// For troubleshooting purposes only, a tip to verify whether the JSON object is correctly
// structured is to use the header-metadata headers to set the header using JSON and then
// get the header's raw value to review the XML result.
//
// var hm = require('header-metadata');
// hm.current.set({type: 'mq'}, 'testMQMD', mqmd); ///< sets a test header using JSON object
// hm.current.get('testMQMD');                     ///< should return XML string of the header value
// hm.current.remove('testMQMD');                  ///< remove the test header to not impact backside requests
var mqmd = {
    MQMD: {
        StrucId: { $: 'MD' },
        Format: { $: 'MQHRF2' },
        MsgType: { $: '1' },
        Persistence: { $: '1' }
    }
};

var mqrfh2 = {
    MQRFH2: {
        Version: { $: '2' },
        Format: { $: 'MQSTR' },
        NameValueData: {
            NameValue: [
                {
                    // Should you need to define usr, jms and mcd folders, put them here like
                    // usr: { ... properties ... },
                    // mcd: { ... properties ... },
                    // jms: { ... properties ... }
                    // Following shows an example of usr folder with 3 properties.
                    usr: {
                        From: { $: 'From Business Partner' },
                        To: { $: 'To Business Partner' },
                        ChargeBackType: { $: 'credit' }
                    }
                }
            ]
        }
    }
};

var urlopenHeaders = {
    MQMD: mqmd,
    MQRFH2: mqrfh2
};

// Define the urlopen options containing the MQ URL, headers, and data for MQPUT and MQGET. The MQ
// URL can contain request and/or reply queue and additional useful parameters such as:
//
// ParseHeaders - specified when the reply message contains MQRFH2 headers and these extra headers
//     need to be removed from the payload.
// Timeout - specified when the MQ URL contains the "ReplyQueue" param to wait for the
//     response message until this timeout expires.
// SetReplyToQ - sets MQMD.ReplyToQ as the ReplyQueue supplied in the target URL.
//
// Above parameters can be either included in the target URL or specified by a JSON property; for example:
// var options = {
//     target: 'dpmq://MQGWS_QM/?RequestQueue=MQGWS008A;ReplyQueue=MQGWS008B',
//     headers: urlopenHeaders,
//     setReplyTo: true,
//     timeOut: 10000,
//     parseHeaders: true,
//     data: ...,
// };
var options = {
    target: 'dpmq://MQGWS_QM/?RequestQueue=MQGWS008A;ReplyQueue=MQGWS008B;SetReplyTo=true;TimeOut=10000;ParseHeaders=true',
    headers: urlopenHeaders,
    data: '<data>Hello DataPower GatewayScript</data>',
};

// Execute urlopen.open() call with above options supplied
urlopen.open(options, function(error, response) {

    if (error) {

        // Connection failure
        session.output.write ('** urlopen connect error: ' + JSON.stringify(error));
    } else {

        // Get MQRC
        var mqrc = response.statusCode;

        // Request message sent and reply message received without error
        if (mqrc == 0) {

            // Get response MQMD and MQRFH2 headers as JSON objects
            // by the {type: 'mq'} option. Or you can get the raw XML
            // headers by response.get(headerName).
            var replyMQMD = response.get({type: 'mq'}, 'MQMD');
            var replyMQRFH2 = response.get({type: 'mq'}, 'MQRFH2');

            // Read response payload
            response.readAsBuffer(function(readError, responseData) {
                if (readError) {
                    // Error while reading response or transferring data to Buffer
                    session.output.write('readAsBuffer error: ' + JSON.stringify(readError));
                } else {
                    // Green path
                    session.output.write(responseData);
                }
            });
        } else {
            session.output.write('** urlopen.open error [MQRC=' + mqrc + ']');
        }
    }
}); // end of urlopen.open()

