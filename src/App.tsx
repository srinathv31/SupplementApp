
import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";

import { LogBox } from "react-native";
import InfoForm from "./components/UserSetup/InfoForm";
import { PageType } from "./interfaces/AppTypes";
import { userDefaultValue } from "./interfaces/DefaultValues";
import User from "./interfaces/User";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import OnboardingTour from "./screens/OnboardingTour";
import { retrieveLoggedInKey } from "./utilities/saveLoadFunctions/updateIsLoggedIn";

import { globalPropsContext } from "./contextHooks/GlobalPropsContext";

LogBox.ignoreLogs(["Sending"]);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App = () => {
    const [userData, setUserData] = useState<User>(userDefaultValue);
    const [page, setPage] = useState<PageType>("login-screen");

    const GlobalProps = { setUserData, userData, setPage, page };

    // If User is previously logged in => continue to loading screen with previous account
    useEffect(() => {
        retrieveLoggedInKey(setPage, setUserData, userData);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <StatusBar barStyle={"light-content"} />
            <globalPropsContext.Provider value={GlobalProps}>
                { page === "login-screen" && 
                    <LoginScreen />
                }
                { page === "form-screen" && 
                    <InfoForm />
                }
                {page === "onboarding-screen" && 
                    <OnboardingTour />
                }
                {(page === "loading-screen" || page === "app-screen") && 
                    <MainScreen />
                }
            </globalPropsContext.Provider>
        </View>
    );
};

export default App;
