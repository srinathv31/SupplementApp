import { createContext } from "react";
import { ListOfAchievements } from "../interfaces/Achievements";
import { selectedSupplementDefaultValue, supplementMapDefaultValue, userDefaultValue } from "../interfaces/DefaultValues";
import { AppProps } from "../interfaces/Props";
import getCurrentDate, { generateCurrentDateObject, generateWeekList, grabMonth } from "../utilities/getCurrentDate";

const weekString = generateWeekList(generateCurrentDateObject());

export const allPropsContext = createContext<AppProps>({
    setUserData: () => userDefaultValue,
    userData: userDefaultValue,
    setDaySelected: () => getCurrentDate,
    daySelected: getCurrentDate(),
    setModalVisible: () => "hide-modal",
    modalVisible: "hide-modal",
    setSupplementMap: () => supplementMapDefaultValue,
    supplementMap: supplementMapDefaultValue,
    setObjDaySelected: () => generateCurrentDateObject,
    objDaySelected: generateCurrentDateObject(),
    setShowButtons: () => false,
    showButtons: false,
    setPage: () => "login-screen",
    page: "login-screen",
    setWeek: () => weekString,
    week: weekString,
    setMonthText: () => grabMonth(weekString),
    monthText: grabMonth(weekString),
    setSwipeAnimation: () => "fadeIn",
    swipeAnimation: "fadeIn",
    setSelectedSupplement: () => selectedSupplementDefaultValue,
    selectedSupplement: selectedSupplementDefaultValue,
    setMultipleAddMode: () => false,
    multipleAddMode: false,
    setMood: () => "",
    mood: "",
    setCompletedAchievements: () => ListOfAchievements,
    completedAchievements: ListOfAchievements
});
