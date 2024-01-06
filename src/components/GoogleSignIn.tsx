// Source Imports
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useClientStore } from "../zustand/store";
import { router } from "expo-router";

GoogleSignin.configure({
  webClientId:
    "1071608358048-vlscriimfoekffe3uge5kgopj353vh9o.apps.googleusercontent.com",
});

export default function GoogleButton(): JSX.Element {
  const updateUser = useClientStore((state) => state.updateUser);

  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
    }
  }

  function handleGoogleSignIn(
    response: FirebaseAuthTypes.UserCredential | undefined,
  ) {
    if (response === undefined) {
      return;
    }

    console.log("Google sign-in complete!");
    console.log(response.user);

    const newUser = {
      email: response.user.email ?? "email not found",
      displayName: response.user.displayName ?? "name not fonud",
      uid: response.user.uid,
    };

    updateUser({ ...newUser });

    router.replace("/home/");
  }

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={() =>
        onGoogleButtonPress().then((response) => handleGoogleSignIn(response))
      }
    />
  );
}
