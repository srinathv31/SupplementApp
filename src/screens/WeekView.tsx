// Source Imports
import React, { useContext, useRef, useState } from "react";
import { Animated, PanResponder, Pressable, Text, View } from "react-native";
import { generateNextWeek, generatePrevWeek, grabMonth } from "../utilities/getCurrentDate";
import Modal from "react-native-modal";
import { styles } from "../styles/WeekStyles";
import { WeekProps } from "../interfaces/WeekProps";
import AgendaHeader from "../components/Calendar/WeeklyAgenda/AgendaHeader";
import AgendaBody from "../components/Calendar/WeeklyAgenda/AgendaBody";
import CustomToast from "../components/Toast/customToast";
import { allPropsContext } from "../contextHooks/AllPropsContext";
import useClientStore from "../zustand/clientStore";

export default function WeeklySupplementModal(): JSX.Element {
    const { setWeek, week, setMonthText, monthText, setSwipeAnimation, swipeAnimation } = useContext(allPropsContext);
    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }));

    const [showStatusButtons, setShowStatusButtons] = useState<boolean>(false);
    
    const WeekPropValues: WeekProps = {
        setShowStatusButtons,
        showStatusButtons,
    };

    function switchWeek(direction: string) {
        if (direction === "next") {
            const nextWeek = generateNextWeek(week);
            setWeek(nextWeek);
            setMonthText(grabMonth(nextWeek));
            setSwipeAnimation("slideInRight");
        } else if (direction === "prev") {
            const prevWeek = generatePrevWeek(week);
            setWeek(prevWeek);
            setMonthText(grabMonth(prevWeek));
            setSwipeAnimation("slideInLeft");
        }
    }

    // Animation Functions
    const pan = useRef(new Animated.ValueXY()).current;
    pan.addListener(() => { 
        if (+JSON.stringify(pan.x) > 220) {
            switchWeek("prev");
        }
        if (+JSON.stringify(pan.x) < -220) {
            switchWeek("next");
        }
    });

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            {   // x,y are Animated.Value
                dx: pan.x,
            },
        ], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            Animated.timing(
                pan, // Auto-multiplexed
                {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                } // Back to zero
            ).start();
        },
    });

    return(
        <Modal
            animationIn={swipeAnimation}
            animationOut="slideOutDown"
            isVisible={modalVisible === "weekly-modal" ? true : false}
            useNativeDriver={true}
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating
        >
            <Animated.View
                {...panResponder.panHandlers}
                style={[pan.getLayout(), { flex: 1 }]}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 24, color: "white", padding: 10, textAlign: "center" }}>{monthText}</Text>
                        <AgendaHeader />
                        <AgendaBody {...WeekPropValues}/>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => (updateModalVisible("hide-modal"), setSwipeAnimation("fadeIn"))}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
            <CustomToast />
        </Modal>
    );
}
