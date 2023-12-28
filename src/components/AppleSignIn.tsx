// Source Imports
import { Platform, View } from "react-native";
import {
  AppleButton,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { useBearStore } from "../zustand/store";
import { router } from "expo-router";
import { v4 as uuid } from "uuid";

export default function AppleSignIn(): JSX.Element {
  const updateUser = useBearStore((state) => state.updateUser);

  function buttonPress() {
    if (Platform.OS === "ios") {
      return onAppleButtonPress();
    }
    return onAndroidAppleButtonPress();
  }

  async function onAndroidAppleButtonPress() {
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: "firebase-test-expo",

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: "https://expo-test-379a9.firebaseapp.com/__/auth/handler",

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();

    // Send the authorization code to your backend for verification
    const { id_token, nonce } = response;
    if (!id_token) {
      console.log("ANDROID NO ID TOKEN");
      return;
    }
    const appleCredential = auth.AppleAuthProvider.credential(id_token, nonce);
    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }

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

  function handleAppleSignIn(
    response: FirebaseAuthTypes.UserCredential | undefined,
  ) {
    if (response === undefined) {
      return;
    }

    console.log("Apple sign-in complete!");
    console.log(response.user);

    const newUser = {
      email: response.user.email ?? "email not found",
      displayName: response.user.displayName ?? "name not fonud",
      uid: response.user.uid,
    };

    updateUser({ ...newUser });

    router.replace("/home/");
    // if false => send to account setup => create firestore and local
    // if true => send to loading screen => update firestore with local
  }

  return (
    <View>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE_OUTLINE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 305,
          height: 45,
          margin: 20,
        }}
        onPress={() =>
          buttonPress().then((response) => handleAppleSignIn(response))
        }
      />
    </View>
  );
}
