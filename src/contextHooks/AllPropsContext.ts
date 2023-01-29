import { createContext } from "react";
import { supplementMapDefaultValue, userDefaultValue } from "../interfaces/DefaultValues";
import { AppProps } from "../interfaces/Props";
import { generateCurrentDateObject, generateWeekList, grabMonth } from "../utilities/getCurrentDate";

const weekString = generateWeekList(generateCurrentDateObject());

export const allPropsContext = createContext<AppProps>({
    setUserData: () => userDefaultValue,
    userData: userDefaultValue,
    setSupplementMap: () => supplementMapDefaultValue,
    supplementMap: supplementMapDefaultValue,
    setPage: () => "login-screen",
    page: "login-screen",
    setWeek: () => weekString,
    week: weekString,
    setMonthText: () => grabMonth(weekString),
    monthText: grabMonth(weekString),
});
