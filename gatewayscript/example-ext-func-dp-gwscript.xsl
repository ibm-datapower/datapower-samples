<?xml version="1.0" encoding="utf-8"?>
<!--
  Licensed Materials - Property of IBM
  IBM WebSphere DataPower Appliances
  Copyright IBM Corporation 2015. All Rights Reserved.
  US Government Users Restricted Rights - Use, duplication or disclosure
  restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<!--
    The extension function and extension element 'dp:gatewayscript' could be
    called from an XSLT stylehseet to execute a given js file.

    This stylesheet is used to demonstrate how to run a GatewayScript program
    to decrypt a JWT token.
-->
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:dp="http://www.datapower.com/extensions"
    extension-element-prefixes="dp"
    exclude-result-prefixes="dp">

  <xsl:output method="xml"/>

  <xsl:template match="/">
    <!-- the encrypted JWT token -->
    <xsl:variable name="encrypted" select="'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBMV81IiwiY3R5IjoiSldUIn0.aaKGyi2UcSqSZ-bCbN8JRS0zVhzW3Ehu0DQaZPBHvhnKh6D6gRu-hrFzz18RYn6-Q73OTU-oK4RFWU4kl-W7a7LX_bWxe5vTOnNJZufnL2E3Rhf-aRPbWwnbDFoqmC6j-QtD1G52Q2TxNWRUgffNZw4R7oozt_S50KG-ceyMymU.-fHSGaKHyeDGK2-BHJ_G7g.gShiBuhixVBHmqk8XAUEPnNW_SdrzjxC5GyGRCHilkIpNfSsLQ9PSpYtkrmTyIpt5Qphi0A6rxWlTPuAR6M-e22pubjjuFc2WapJWLxYLaU.uXPs1ka4JDHpfaD7petO7A'"/>

    <xsl:variable name="param">
      <parameter name="key">Alice</parameter>
    </xsl:variable>

    <!-- dp:gatewayscript takes 4 parameters
         @'example-ext-func-dp-gwscript.js' : gatewayscript
         @$encrypted : payload (default to nodeset)
         @return-error : whether to return error (default to true())
         @param : operation parameter to the gateway script
    -->

    <xsl:copy-of select="dp:gatewayscript(
        'example-ext-func-dp-gwscript.js', $encrypted, true(), $param)"/>

  </xsl:template>

</xsl:stylesheet>
