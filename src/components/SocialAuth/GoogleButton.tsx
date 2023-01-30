// Source Imports
import React from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { handleLoginButton } from "../../utilities/authentication/handleLoginEvent";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";
GoogleSignin.configure({
    webClientId: "628023121641-t2nvq89jpmukfn0ntdiu8cdsfkdmc01d.apps.googleusercontent.com",
});

export default function GoogleButton(): JSX.Element {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const updatePage = useClientStore(state => state.updatePage);

    async function onGoogleButtonPress() {
        try {
        // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
    
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch(e) {
            console.log(e);
        }
    }

    function handleGoogleSignIn(response: FirebaseAuthTypes.UserCredential | undefined) {
        if(response === undefined) {
            return;
        }        

        const userCopy = { ...userData };
        console.log("Google sign-in complete!");
        
        userCopy.userAuthObj = response?.user;

        // Check if uid is stored locally (already signed in before)
        handleLoginButton(updatePage, userCopy, updateUserData);
        // if false => send to account setup => create firestore and local
        // if true => send to loading screen => update firestore with local
    }

    return(
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() =>
                onGoogleButtonPress().then(response => handleGoogleSignIn(response))}
        />
    );
}
