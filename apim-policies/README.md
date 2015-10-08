# API Management Policies

This folder contains a variety of sample policies that can be used with
IBM API Management.
## Usage
**Instructions on how to reuse a sample policy**

You can download any of the policies provided and reuse them to make your own by following these instructions:

 1. Download policy sample, e.g. gatewayscript-policy, to your system (zip file gatewayscript-policy.zip). *You will have to click on “View Raw” to be prompted with the download option*.

 2. Once downloaded to your system, unzip the file. There should be a yaml definition (e.g. gatewayscript-policy.yaml) and an implementation folder. The DataPower artifacts can be found in the implementation folder in a zip file. The zip file may have the same name as the one downloaded (in the case of the GatewayScript policy, gatewayscript-policy.zip).

 3. Login to the DataPower appliance and create a new DataPower domain (e.g. "foo")

 4. Import the gatewayscript-policy.zip policy implementation into the new domain *foo*.

 5. From the File Explorer, open the domain configuration file foo.cfg, and do a global find/replace of all “gatewayscript-policy” references with “alice-policy”, assuming here that “alice-policy” will be your new policy name.

 6. Create a folder structure “local://policy/alice-policy”

 7. Move all contents from “local://policy/gatewayscript-policy” to “local://policy/alice-policy”

 8. Restart the *foo* domain (don't save your configuration before this) to get the DataPower appliance to load the the newly renamed objects.

 9. Verify all of the artifacts from “alice-policy” policy are there.

 10. Make chages to the processing rules to implement your policy requirements. See: http://www-01.ibm.com/support/knowledgecenter/SSWHYP_4.0.0/com.ibm.apimgmt.policy.doc/capim_custpolicies_overview.html

 11. Export your “alice-policy-main” rule action, and give it the name “alice-policy” which after download will be “alice-policy.zip”.

 12. Modify the yaml file so that it matches the new policy implementation.

 13. Now we have a new yaml file and a new implementation. We just need to create a zip file with all the artifacts: the yaml file, and implementation folder. This will become  our new policy to be consumed by APIm.

 14. Finally, go to your APIm environment and import the zip file. If there were no naming errors, the policy should be imported correctly into the API manager.
 15. Login to the DP appliance and verify the policy was deployed correctly, the rule name will now look like:
 *alice-main_apim_e55cce330e4b0b436ff65a06f_v1.0*
