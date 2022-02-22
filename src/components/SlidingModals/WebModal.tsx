// Source Imports
import React, { useRef } from "react";
import { Dimensions, View } from "react-native";
import { Modalize } from "react-native-modalize";

import WebView from "react-native-webview";
import { WebModalProps } from "../../interfaces/WebModalProps";

export default function WebModal({ modalizeRef, url, setModalizeRefStatus, index }: WebModalProps): JSX.Element {
    const webViewRef = useRef<WebView>(null);
    const { height: initialHeight } = Dimensions.get("window");
    const height = initialHeight;
    
    return(
        <View>
            <Modalize ref={modalizeRef} modalHeight={index === 2 ? height*0.65 : height*1.05} onClosed={ setModalizeRefStatus !== undefined ? () => setModalizeRefStatus(false) : () => console.log("Cheese")} >
                <WebView
                    ref={webViewRef}
                    source={{ uri: url }}
                    style={{ height }}
                />
            </Modalize>
        </View>
    );
}
