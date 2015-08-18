# JWS Sign Policy
            
The JWS Sign Policy can be used in IBM API Management to sign 
JSON payloads. This policy is only valid for REST APIs.

## Prequisites

    - IBM API Management 4.0.2
    - IBM Datapower 7.2.0 
    - Crypto object located in the IBM API management domain on the DataPower appliance
    
## Usage

    - For algorithm types HS256, HS385, and HS512 the Crypto Object referenced must be a Shared Secret Key
    - For algorithm types RS256, RS385, and RS512 the Crypto Object referenced must be a Crypto Key (private key)

```
