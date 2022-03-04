
import React, { useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import { LogBox } from "react-native";
import InfoForm from "./components/UserSetup/InfoForm";
import Page from "./interfaces/Page";
import User from "./interfaces/User";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import OnboardingTour from "./screens/OnboardingTour";

LogBox.ignoreLogs(["Sending"]);

const App = () => {
    const [userData, setUserData] = useState<User>({ name: "", lastName: "", age: "", picture: "", data: { supplementMap: {}, selectedDates: {} }, premiumStatus: true, isLoggedIn: true, achievements: [] });
    const [page, setPage] = useState<Page>({ page: "login-screen" });

    return (
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <SafeAreaView style={{ flex: 1 }}>
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

            </SafeAreaView>
        </View>
    );
};

export default App;
