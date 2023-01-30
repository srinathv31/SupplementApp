import User from "../../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ClientState } from "../../zustand/clientStore";

export const saveLoggedInKey = async (userData: User) => {
    if (userData.userAuthObj !== undefined){
        const isLoggedInKey = {
            loggedIn: true,
            uid: userData.userAuthObj
        };
        try {
            //save user
            await AsyncStorage.setItem("isLoggedIn", JSON.stringify(isLoggedInKey));
            
        } catch (e) {
            console.log("Error: " + e);
        }
    }
};

export const removeLoggedInKey = async () => {
    const isLoggedInKey = {
        loggedIn: false,
        uid: undefined
    };

    try {
        //save user
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(isLoggedInKey));
        
    } catch (e) {
        console.log("Error: " + e);
    }
};

export const retrieveLoggedInKey = async (updatePage: ClientState["updatePage"], setUserData: ClientState["updateUserData"], userData: ClientState["userData"]) => {
    
    try {
        const userCopy = { ...userData };

        //save user
        const JsonIsLoggedInKey = await AsyncStorage.getItem("isLoggedIn");
        
        if (JsonIsLoggedInKey !== null) {
            // Parsing loggedInKey
            const isLoggedInKey = JSON.parse(JsonIsLoggedInKey) as { loggedIn: boolean, uid: FirebaseAuthTypes.User };
            if(isLoggedInKey.loggedIn === true) {
                userCopy.userAuthObj = isLoggedInKey.uid;
                setUserData(userCopy);
                updatePage("loading-screen");
            }
        }
        
    } catch (e) {
        console.log("Error: " + e);
    }
};
