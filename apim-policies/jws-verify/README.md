# JWS Verify Policy
            
The JWS Verify Policy can be used in IBM API Management to verify signatures for 
JSON payloads. This policy is only valid for REST APIs.

## Prequisites

    - IBM API Management 4.0.2
    - IBM Datapower 7.2.0 
    - Crypto object located in the IBM API management domain on the DataPower appliance
    
## Usage

    - If the original message was signed with a Shared Secret Key, the Crypto Object specified must be a Shared Secret Key
    - If the original message was signed with a private Key, Crypto Object specified must be a Crypto Certificate (public certificate)

```
