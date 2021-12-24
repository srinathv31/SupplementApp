// Source Imports
import React, { useRef, useState } from "react";
import { Alert, Animated, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Component Imports

// Design Imports

export default function BottomMenuTab(): JSX.Element {
    const [showButtons, setShowButons] = useState<boolean>(false);


    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
    };
    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();
      };

    function buttonHandle(){
        showButtons ? (fadeOut(), setShowButons(false)) : (fadeIn(), setShowButons(true));
    }

    return(
        <View>
            <Animated.View style={{opacity: fadeAnim}}>
                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                        <Icon name="pill" size={30} color="white"/>
                    <Icon name="emoticon-happy-outline" size={30} color="white"/>
                    <Icon name="silverware-fork-knife" size={30} color="white"/>
                    <Icon name="weight-lifter" size={30} color="white" onPress={() => console.log('hello')}/>
                </View>
            </Animated.View>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                <Icon name="pill" size={30} color="white" style={{opacity: showButtons ? 0.5 : 1 }}/>
                <Icon onPress={buttonHandle}
                name="plus-box-outline" size={30} color="white"/>
                <Icon name="magnify" size={30} color="white" style={{opacity: showButtons ? 0.5 : 1 }}/>
            </View>
        </View>
    );
}
