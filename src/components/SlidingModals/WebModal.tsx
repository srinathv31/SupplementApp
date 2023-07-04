// Source Imports
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";

import WebView from "react-native-webview";
import { WebModalProps } from "../../interfaces/WebModalProps";
import useClientStore from "../../zustand/clientStore";
import AboutSupplementDetails from "./AboutSupplementDetails";
import LoadingWebModal from "./LoadingWebModal";

/**
 * info? - if true, shows about supplements. if false, shows web page of supplement
 */
export default function WebModal({ modalizeRef, url, setModalizeRefStatus, index, info }: WebModalProps): JSX.Element {
    const [infoMode, setInfoMode] = useState<boolean>(!info ? false : true);

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
    
    // Resetting infoMode whenever a new supplement is selected
    const resetInfoState = () => {
        setInfoMode(true);
    };

    return(
        <View>
            <Modalize ref={modalizeRef} modalHeight={height*0.69} onClosed={() => webModalClose()} onClose={resetInfoState}>
                {infoMode ? <AboutSupplementDetails setInfoMode={setInfoMode} /> : 
                    <View style={styles.webContainer}>
                        <WebView
                            ref={webViewRef}
                            source={{ uri: url }}
                            style={{ flex: 1 }}
                            startInLoadingState={true}
                            renderLoading={() => <LoadingWebModal />}
                        />
                    </View>}
            </Modalize>
        </View>
    );
}

const styles = StyleSheet.create({
    webContainer: {
        minHeight: "100%",
    },
});
