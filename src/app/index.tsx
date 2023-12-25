import { Redirect } from "expo-router";
import auth from "@react-native-firebase/auth";

export default function Index(): JSX.Element {
  const user = auth().currentUser;

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/home" />;
}
