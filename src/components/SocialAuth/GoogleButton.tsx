// Source Imports
import React from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
GoogleSignin.configure({
    webClientId: "628023121641-t2nvq89jpmukfn0ntdiu8cdsfkdmc01d.apps.googleusercontent.com",
});

export default function GoogleButton(): JSX.Element {

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

    return(
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() =>
                onGoogleButtonPress().then(() => console.log("Signed in with Google!"))}
        />
    );
}
