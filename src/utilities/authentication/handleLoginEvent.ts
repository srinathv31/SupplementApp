import { ClientState } from "../../zustand/clientStore";
import { checkForCloudSave, grabCloudSave } from "../saveLoadFunctions/checkForCloudSave";
import { checkIfSaveExistsOnLocal } from "../saveLoadFunctions/storageChecker";
import { saveLoggedInKey } from "../saveLoadFunctions/updateIsLoggedIn";

export async function handleLoginButton(updatePage: ClientState["updatePage"], userData: ClientState["userData"], setUserData: ClientState["updateUserData"]) {
    const saveExists = await checkIfSaveExistsOnLocal(""+userData.userAuthObj?.uid);
    const cloudSaveExists = await checkForCloudSave(""+userData.userAuthObj?.uid);
    setUserData(userData);
    saveLoggedInKey(userData);

    if (saveExists === true) {
        updatePage("loading-screen");
        return;
    }

    if (cloudSaveExists === true) {
        console.log("cloud exists... loading cloud data...");
        grabCloudSave(""+userData.userAuthObj?.uid, userData, setUserData)
            .then(() => updatePage("loading-screen"));
        return;
    }

    updatePage("form-screen");
}
