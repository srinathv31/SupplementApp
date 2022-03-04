import { AppProps } from "../../interfaces/Props";
import { checkIfSaveExistsOnLocal } from "../saveLoadFunctions/storageChecker";

export async function handleLoginButton(setPage: AppProps["setPage"], userData: AppProps["userData"], setUserData: AppProps["setUserData"]) {
    const saveExists = await checkIfSaveExistsOnLocal(""+userData.userAuthObj?.uid);
    setUserData(userData);
    saveExists === true ? setPage({ page: "loading-screen" }) : setPage({ page: "form-screen" });
}
