// Source Imports
import React from "react";
import { View } from "react-native";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { AppProps } from "../../interfaces/Props";

export default function AppleSignIn({ setUserData, userData }: {
    setUserData: AppProps["setUserData"], userData: AppProps["userData"]
}): JSX.Element {

    async function onAppleButtonPress() {
        // Start the sign-in request
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });
        
    
            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw new Error("Apple Sign-In failed - no identify token returned");
            }
    
            // Create a Firebase credential from the response
            const { identityToken, nonce } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(
                identityToken,
                nonce,
            );
    
            // Sign the user in with the credential
            return auth().signInWithCredential(appleCredential);
        } catch (e) {
            console.log(e);
        }
    }

    function handleAppleSignIn(response: FirebaseAuthTypes.UserCredential | undefined) {
        const userCopy = { ...userData };
        console.log("Apple sign-in complete!");
        
        userCopy.userAuthObj = response?.user;
        setUserData(userCopy);
    }

    return(
        <View>
            <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                    width: 160,
                    height: 45,
                }}
                onPress={() => onAppleButtonPress().then( response => handleAppleSignIn(response))}
            />
        </View>
    );
}
