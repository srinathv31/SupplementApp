import { createContext } from "react";
import { userDefaultValue } from "../interfaces/DefaultValues";
import { AppProps } from "../interfaces/Props";

export const allPropsContext = createContext<AppProps>({
    setUserData: () => userDefaultValue,
    userData: userDefaultValue,
    setPage: () => "login-screen",
    page: "login-screen",
    supplementMap1: {}
});
