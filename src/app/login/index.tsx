import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import AppleSignIn from "../../components/AppleSignIn";
import GoogleButton from "../../components/GoogleButton";

export default function LoginScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>LOGIN SCREEN</Text>
      <AppleSignIn />
      <GoogleButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
