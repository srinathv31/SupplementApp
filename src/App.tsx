import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { LogBox } from "react-native";
import InfoForm from "./components/UserSetup/InfoForm";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import OnboardingTour from "./screens/OnboardingTour";
import { retrieveLoggedInKey } from "./utilities/saveLoadFunctions/updateIsLoggedIn";
import useClientStore from "./zustand/clientStore";
import shallow from "zustand/shallow";
import { QueryClient, QueryClientProvider } from "react-query";

LogBox.ignoreLogs(["Sending"]);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App = () => {
    const queryClient = new QueryClient();
    
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const { page, updatePage } = useClientStore(state => ({ page: state.page, updatePage: state.updatePage }), shallow);

    // If User is previously logged in => continue to loading screen with previous account
    useEffect(() => {
        retrieveLoggedInKey(updatePage, updateUserData, userData);
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
                <StatusBar barStyle={"light-content"} />
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
            </View>
        </QueryClientProvider>
    );
};

export default App;
