// Source Imports
import React, { useContext } from "react";
import { View } from "react-native";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { handleLoginButton } from "../../utilities/authentication/handleLoginEvent";
import { globalPropsContext } from "../../contextHooks/GlobalPropsContext";
import useClientStore from "../../zustand/clientStore";

export default function AppleSignIn(): JSX.Element {
    const { setUserData, userData } = useContext(globalPropsContext);
    const updatePage = useClientStore(state => state.updatePage);

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
        if(response === undefined) {
            return;
        }

        const userCopy = { ...userData };
        console.log("Apple sign-in complete!");
        
        userCopy.userAuthObj = response?.user;

        // Check if uid is stored locally (already signed in before)
        handleLoginButton(updatePage, userCopy, setUserData);
        // if false => send to account setup => create firestore and local
        // if true => send to loading screen => update firestore with local
    }

    return(
        <View>
            <AppleButton
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                    width: 305,
                    height: 45,
                    margin: 20
                }}
                onPress={() => onAppleButtonPress().then(response => handleAppleSignIn(response))}
            />
        </View>
    );
}
