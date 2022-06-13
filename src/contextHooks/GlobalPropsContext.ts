import { createContext } from "react";
import { userDefaultValue } from "../interfaces/DefaultValues";
import { GlobalProps } from "../interfaces/Props";

export const globalPropsContext = createContext<GlobalProps>({
    setUserData: () => userDefaultValue,
    userData: userDefaultValue,
    setPage: () => "login-screen",
    page: "login-screen",
});
