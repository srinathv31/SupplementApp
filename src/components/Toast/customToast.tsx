// Source Imports
import React from "react";
import { Pressable, Text } from "react-native";

import Toast, { BaseToast, BaseToastProps, ErrorToast, ToastConfig } from "react-native-toast-message";

/*
  1. Create the config
*/
const toastConfig: ToastConfig = {
    /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
    success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "skyblue" }}
            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: "#112442" }}
            text1Style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white"
            }}
        />
    ),
    /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
    error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: "skyblue", borderColor: "red" }}
            contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: "#112442", height: 100 }}
            text1Style={{
                fontSize: 18,
                fontWeight: "400",
                color: "white",
                padding: 5
            }}
            text2Style={{
                fontSize: 18,
                fontWeight: "400",
                color: "white",
                padding: 5
            }}
        />
    ),
    /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
    tomatoToast: ({ text1, text2, onPress }) => (
        <Pressable 
            onPress={onPress}
            style={{ backgroundColor: "#112442", padding: 20, margin: 5, borderRadius: 5, height: 100, width: "95%", borderWidth: 5, borderColor: "skyblue", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 18, padding: 5 }}>{text1}</Text>
            <Text style={{ color: "white", fontSize: 18, padding: 5 }}>{text2}</Text>
        </Pressable>
    )
};

export default function CustomToast() {
    return(
        <>
            <Toast config={toastConfig} />
        </>
    );
}
