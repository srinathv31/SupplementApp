import { createContext } from "react";
import { supplementMapDefaultValue, userDefaultValue } from "../interfaces/DefaultValues";
import { AppProps } from "../interfaces/Props";

export const allPropsContext = createContext<AppProps>({
    setUserData: () => userDefaultValue,
    userData: userDefaultValue,
    setSupplementMap: () => supplementMapDefaultValue,
    supplementMap: supplementMapDefaultValue,
    setPage: () => "login-screen",
    page: "login-screen",
});
