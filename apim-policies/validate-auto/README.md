# Validate XML

The Validate JSON or XML policy can be used in IBM API Management to validate 
JSON or XML messages for REST APIs.

## Prequisites

    IBM API Management 4.0.2.0
    IBM Datapower 7.2.0.0
    A valid JSON Schema, a valid XML Schema (both accessible via URL). The URL can reference schemas on the DataPower appliance (local:/// or store:///) or via HTTP.


## Notice:

    For IBM API Management version 4.0.2.0, this policy must be manually 
    altered after being deployed to the DataPower appliance by the API Manager
    
    Instructions:
    1) Add the policy to the IBM API Management Environment of your choice
    2) Browse to the DataPower applaince associated with the environment
    3) Login to the API Management domain
    4) List the processing actions in the domain, there will be 2 conditional 
       actions associated with this policy 
          validate-auto-xsd-jsv-conditional_apim_<some number>_v1.0
          validate-auto-xsd-jsv-json-conditional_apim_<some number>_v1.0
       Where <some number> is an automatically generated unique identifier.
    5) View the details for the first conditional action, and select the "Condition" tab
    6) Edit the details for the first condition, the action will be listed as 
          validate-auto-xsd-jsv-json  
       but should be 
          validate-auto-xsd-jsv-json_apim_<some number>_v1.0
       select the proper action and press apply.
    7) Edit the details for the first condition, the action will be listed as 
          validate-auto-xsd-jsv-xml  
       but should be 
          validate-auto-xsd-jsv-xml_apim_<some number>_v1.0
       select the proper action and press apply.
    8) Press apply to save the chnages to the first conditional action.   
    9) View the details for the second conditional action, and select the "Condition" tab       
   10) Edit the details for the condition, the action will be listed as 
          validate-auto-xsd-jsv-convert-xml-to-json-xform
       but should be 
          validate-auto-xsd-jsv-convert-xml-to-json-xform_apim_<some number>_v1.0
       select the proper action and press apply.
   11) Press apply to save the chnages to the first conditional action.   
   12) Save the configuration changes
       
```
