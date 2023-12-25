import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import auth from "@react-native-firebase/auth";
import { Link, router } from "expo-router";

export default function HomeScreen(): JSX.Element {
  function signOut() {
    auth()
      .signOut()
      .then(() => {
        router.replace("/login/");
      });
  }

  const username = auth().currentUser?.displayName;
  const email = auth().currentUser?.email;

  return (
    <View style={styles.container}>
      <Text>HOME SCREEN</Text>
      <Text>USER: {username}</Text>
      <Text>Email: {email}</Text>
      <Link href="/(modals)/user">User setting</Link>
      <Pressable onPress={signOut}>
        <Text>Sign Out</Text>
      </Pressable>
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
