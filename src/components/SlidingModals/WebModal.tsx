// Source Imports
import React, { useRef } from "react";
import { Dimensions, View } from "react-native";
import { Modalize } from "react-native-modalize";

import WebView from "react-native-webview";
import { WebModalProps } from "../../interfaces/WebModalProps";

export default function WebModal({ modalizeRef, url, modalHeight }: WebModalProps): JSX.Element {
    const webViewRef = useRef<WebView>(null);
    const { height: initialHeight } = Dimensions.get("window");
    const height = initialHeight;
    
    return(
        <View>
            <Modalize ref={modalizeRef} modalHeight={modalHeight ? modalHeight : 550} >
                <WebView
                    ref={webViewRef}
                    source={{ uri: url }}
                    style={{ height }}
                />
            </Modalize>
        </View>
    );
}
