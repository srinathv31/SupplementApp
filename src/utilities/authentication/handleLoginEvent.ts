import { AppProps } from "../../interfaces/Props";
import { checkIfSaveExistsOnLocal } from "../saveLoadFunctions/storageChecker";

export async function handleLoginButton(setPage: AppProps["setPage"], uid: string) {
    const saveExists = await checkIfSaveExistsOnLocal(uid);
    saveExists === true ? setPage({ page: "loading-screen" }) : setPage({ page: "form-screen" });
}
