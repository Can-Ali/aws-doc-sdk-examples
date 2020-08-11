/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with Version 3 (V3) of the AWS SDK for JavaScript,
which is scheduled for release later in 2020. The prerelease version of the SDK is available
at https://github.com/aws/aws-sdk-js-v3. The 'SDK for JavaScript Developer Guide' for V3 is also
scheduled for release later in 2020, and the topic containing this example will be hosted at
https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-sign-up.html.

Purpose:
lambda-trigger-pre-sign-up-auto-confirm.js is a sample Lambda trigger called just before sign-up
with the user pool pre sign-up Lambda trigger. It uses a custom attribute custom:domain to automatically
confirm new users from a particular email domain. Any new users not in the custom domain will be added
to the user pool, but not automatically confirmed.

Running the code:
node lambda-trigger-pre-sign-up-auto-confirm.js
*/

// snippet-start:[cognito.javascript.lambda-trigger.pre-sign-up-auto-confirmV3]
exports.handler = async (event, context) => {
    // Set the user pool autoConfirmUser flag after validating the email domain
    event.response.autoConfirmUser = false;

    // Split the email address so we can compare domains
    const address = event.request.userAttributes.email.split("@")
    try {
        // This example uses a custom attribute "custom:domain"
        if (event.request.userAttributes.hasOwnProperty("custom:domain")) {
            if (event.request.userAttributes['custom:domain'] === address[1]) {
                event.response.autoConfirmUser = true;
            }
        }
    }
    catch(err){
        // Return to Amazon Cognito
        return null;
    }
};
// snippet-end:[cognito.javascript.lambda-trigger.pre-sign-up-auto-confirmV3]
