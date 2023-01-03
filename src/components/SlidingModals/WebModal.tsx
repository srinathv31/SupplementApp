// Source Imports
import React, { useRef } from "react";
import { Dimensions, View } from "react-native";
import { Modalize } from "react-native-modalize";

import WebView from "react-native-webview";
import { WebModalProps } from "../../interfaces/WebModalProps";
import useClientStore from "../../zustand/clientStore";

export default function WebModal({ modalizeRef, url, setModalizeRefStatus, index }: WebModalProps): JSX.Element {
    const webViewRef = useRef<WebView>(null);
    const { height: initialHeight } = Dimensions.get("window");
    const height = initialHeight;
    
    const updateModalVisible = useClientStore(state => state.updateModalVisible);

    function webModalClose() {
        if(setModalizeRefStatus !== undefined) {
            setModalizeRefStatus(false);
        }
        if (index === 2){
            // disable-header only activates on the explore page for web modal
            updateModalVisible("hide-modal");            
        }
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
