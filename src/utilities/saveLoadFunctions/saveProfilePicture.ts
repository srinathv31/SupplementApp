import { firebase } from "@react-native-firebase/storage";
import User from "../../interfaces/User";

export function saveProfilePictureToCloud(userData: User, uploadUri: string, localImagePath: string, setIsLoading: (i: boolean) => void){
    firebase
        .storage()
        .ref(`profilePictures/${userData.userAuthObj?.uid}-profile-pic.png`)
        .putFile(uploadUri)
        .then(() => {
        //You can check the image is now uploaded in the storage bucket
            console.log(`${localImagePath} has been successfully uploaded.`);
            setIsLoading(false);
        })
        .catch((e) => console.log("uploading image error => ", e));
}
