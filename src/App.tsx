
import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";

import { LogBox } from "react-native";
import InfoForm from "./components/UserSetup/InfoForm";
import { userDefaultValue } from "./interfaces/DefaultValues";
import Page from "./interfaces/Page";
import User from "./interfaces/User";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import OnboardingTour from "./screens/OnboardingTour";
import { retrieveLoggedInKey } from "./utilities/saveLoadFunctions/updateIsLoggedIn";

LogBox.ignoreLogs(["Sending"]);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App = () => {
    const [userData, setUserData] = useState<User>(userDefaultValue);
    const [page, setPage] = useState<Page>({ page: "login-screen" });

    // If User is previously logged in => continue to loading screen with previous account
    useEffect(() => {
        retrieveLoggedInKey(setPage, setUserData, userData);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <StatusBar barStyle={"light-content"} />
        
            { page.page === "login-screen" && 
                    <LoginScreen
                        setPage={setPage}
                        setUserData={setUserData}
                        userData={userData}
                    ></LoginScreen>
            }
            { page.page === "form-screen" && 
                    <InfoForm 
                        userData={userData} 
                        setUserData={setUserData} 
                        setPage={setPage}
                    ></InfoForm>
            }
            {page.page === "onboarding-screen" && 
                    <OnboardingTour
                        setPage={setPage}
                    ></OnboardingTour>
            }
            {(page.page === "loading-screen" || page.page === "app-screen") && 
                    <MainScreen
                        setPage={setPage}
                        page={page}
                        setUserData={setUserData}
                        userData={userData}
                    />
            }

        </View>
    );
};

export default App;
