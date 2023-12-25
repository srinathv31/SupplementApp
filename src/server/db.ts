import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export function readDB() {
  const userId = auth().currentUser?.uid;
  return firestore()
    .collection("users")
    .doc(userId)
    .get()
    .then((res) => {
      console.log(res.data());
      return res.data() ?? "No Data found";
    })
    .catch((err) => {
      console.log(err);
      return "Some Error";
    });
}

export function writeDB() {
  const userId = auth().currentUser?.uid;

  firestore()
    .collection("users")
    .doc(userId)
    .set({ name: "Golden" })
    .catch((err) => {
      console.log(err);
    });
}
