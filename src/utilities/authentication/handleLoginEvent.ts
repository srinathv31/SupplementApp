import { AppProps } from "../../interfaces/Props";
import { checkForCloudSave, grabCloudSave } from "../saveLoadFunctions/checkForCloudSave";
import { checkIfSaveExistsOnLocal } from "../saveLoadFunctions/storageChecker";
import { saveLoggedInKey } from "../saveLoadFunctions/updateIsLoggedIn";

export async function handleLoginButton(setPage: AppProps["setPage"], userData: AppProps["userData"], setUserData: AppProps["setUserData"]) {
    const saveExists = await checkIfSaveExistsOnLocal(""+userData.userAuthObj?.uid);
    const cloudSaveExists = await checkForCloudSave(""+userData.userAuthObj?.uid);
    setUserData(userData);
    saveLoggedInKey(userData);

    if (saveExists === true) {
        setPage("loading-screen");
        return;
    }

    if (cloudSaveExists === true) {
        console.log("cloud exists... loading cloud data...");
        grabCloudSave(""+userData.userAuthObj?.uid, userData, setUserData)
            .then(() => setPage("loading-screen"));
        return;
    }

    setPage("form-screen");
}
