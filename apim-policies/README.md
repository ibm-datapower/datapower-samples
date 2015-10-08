# API Management Policies

This folder contains a variety of sample policies that can be used with 
IBM API Management. 

## Prequisites

**Instructions on how to reuse a sample policy**

You can download any of the policies provided and reuse them to make your own by following these instructions:

 1. Download policy sample, e.g. gatewayscript-policy, to your system (zip file gatewayscript-policy.zip). *You will have to click on “View Raw” to be prompted with the download option*.
 
 2. Once downloaded to your system, unzip the file and there should be the yaml definition and both the implementation and validator folders. The DataPower artifacts can be found, compressed, under the implementation folder. The zip file will have the same name as the one downloaded, in this case gatewayscript-policy.zip.
 
 3. Switch to the DataPower appliance and create a new DataPower domain (e.g. "foo")
 
 4. Import the gatewayscript-policy.zip policy implementation into the new domain *foo*.
 
 5. From the File Explorer, open the domain configuration file foo.cfg, and do a global find/replace of all “gatewayscript-policy” references with “alice-policy”, assuming here that “alice-policy” will be your new policy name.
 
 6. Create a folder structure “local://policy/alice-policy”
 
 7. Move all contents from “local://policy/gatewayscript-policy” to “local://policy/alice-policy”
 
 8. Restart the *foo* domain
 
 9. Test your “alice-policy” policy.
 
 10. Export your “alice-policy-main” rule action, and give it the name “alice-policy” which after download will be “alice-policy.zip” file.
 
 11. Modify the yaml file so that it matches the new policy implementation.
 
 12. Now we have a new yaml file and a new implementation. We just need to create a zip file with all the artifacts: the yaml file, implementation folder, and validator folder. This will become  our new policy to be consumed by APIm.
 
 13. Finally, go to APIm environments and import the zip file. If there were no naming errors, the policy should be importing correctly into the API manager.
