// Source Imports
import React, { useRef, useState } from "react";
import { Alert, Animated, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Component Imports

// Design Imports
import BottomMenuTabStyles from "../../styles/BottomMenuTab";

export default function BottomMenuTab({ setVisiblePage, setSuppModalVisible }: {
    setVisiblePage: (v: string) => void,
    setSuppModalVisible: (s: boolean) => void
}): JSX.Element {
    const [showButtons, setShowButons] = useState<boolean>(false);


    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false
        }).start();
    };
    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
      };

    function buttonHandle(){
        showButtons ? (fadeOut(), setShowButons(false)) : (fadeIn(), setShowButons(true));
    }

    return(
        <View>
            <Animated.View style={{opacity: fadeAnim}}>
                <View style={BottomMenuTabStyles.secondaryButtonRow}>
                    <Icon onPress={() => setSuppModalVisible(true)}
                        name="pill" size={30} color="white"/>
                    <Icon name="emoticon-happy-outline" size={30} color="white"/>
                    <Icon name="silverware-fork-knife" size={30} color="white"/>
                    <Icon name="weight-lifter" size={30} color="white" onPress={() => console.log('hello')}/>
                </View>
            </Animated.View>
            <View style={BottomMenuTabStyles.mainButtonRow}>
                <Icon onPress={() => setVisiblePage("1")}
                    name="home" size={30} color="white" style={{opacity: showButtons ? 0.5 : 1 }}/>
                <Icon onPress={buttonHandle}
                    name="plus-box-outline" size={30} color="white"/>
                <Icon onPress={() => setVisiblePage("2")}
                    name="magnify" size={30} color="white" style={{opacity: showButtons ? 0.5 : 1 }}/>
            </View>
        </View>
    );
}
