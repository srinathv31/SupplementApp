// Source Imports
import React, { useRef } from "react";
import { Dimensions, View } from "react-native";
import { Modalize } from "react-native-modalize";

import WebView from "react-native-webview";
import { WebModalProps } from "../../interfaces/WebModalProps";

export default function WebModal({ modalizeRef, url, setModalizeRefStatus, index, setModalVisible }: WebModalProps): JSX.Element {
    const webViewRef = useRef<WebView>(null);
    const { height: initialHeight } = Dimensions.get("window");
    const height = initialHeight;
    
    function webModalClose() {
        if(setModalizeRefStatus !== undefined) {
            setModalizeRefStatus(false);
        }
        setModalVisible({ modal: "hide-modal" });
    }

    return(
        <View>
            <Modalize ref={modalizeRef} modalHeight={index === 2 ? height*0.65 : height*0.70} onClosed={() => webModalClose()} >
                <WebView
                    ref={webViewRef}
                    source={{ uri: url }}
                    style={{ height }}
                />
            </Modalize>
        </View>
    );
}
