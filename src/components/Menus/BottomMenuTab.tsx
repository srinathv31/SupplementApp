// Source Imports
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconI from "react-native-vector-icons/Ionicons";
import BottomMenuTabStyles from "../../styles/BottomMenuTab";
import ChangeMoodModal from "../Mood/ChangeMoodModal";
import MoodPicker from "../Mood/MoodPicker";
import { sharePlan, shareUrl } from "../../utilities/shareFunctions";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import MoodSlider from "../Mood/MoodSlider";
import MoodTimelinePicker from "../Mood/MoodTimelinePicker";
import useClientStore from "../../zustand/clientStore";

export default function BottomMenuTab(): JSX.Element {
    const { supplementMap, daySelected, selectedSupplement } = useContext(allPropsContext);

    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }));
    const updateMultipleAddMode = useClientStore(state => state.updateMultipleAddMode);
    const { showButtons, updateShowButtons } = useClientStore(state => ({ showButtons: state.showButtons, updateShowButtons: state.updateShowButtons }));
    const index = useClientStore(state => state.index);
    const updateIndex = useClientStore(state => state.updateIndex);

    const [open, setOpen] = useState(false);
    
    const MoodProps = {
        open,
        setOpen
    };

    useEffect(() => {
        showButtons ? fadeIn() : (fadeOut(), setOpen(false));
    }, [showButtons]);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    };
    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    function handleMoodOpen() {
        (supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood.length > 0) ? 
            updateModalVisible("mood-change-modal") :
            setOpen(!open);
    }

    return(
        <KeyboardAvoidingView
            behavior="position"
        >
            <View style={{ zIndex: 100 }}>
                <ChangeMoodModal
                    setOpen={setOpen}
                ></ChangeMoodModal>
                { open && <MoodPicker
                    {...MoodProps}
                    dropDirection="TOP"
                    mode="setting"
                ></MoodPicker> }
                <MoodSlider />
                <MoodTimelinePicker />
                
                <View style={{ backgroundColor: "transparent" }}>
                    {showButtons && <Animated.View style={{ opacity: fadeAnim }}>
                        <View style={BottomMenuTabStyles.secondaryButtonRow}>
                            <View style={{ flexDirection: "column" }}>
                                <Icon onPress={() => updateModalVisible("supplement-modal")}
                                    name="pill" size={30} color="white" style={{ textAlign: "center" }}/>
                                <Text style={{ color: "white", fontSize: 12 }}>{"Add Supp"}</Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Icon onPress={() => handleMoodOpen()} 
                                    name="emoticon-happy-outline" size={30} color={ supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood.length > 0 ? "lime" : "white" } style={{ textAlign: "center" }}/>
                                <Text style={{ color: "white", fontSize: 12 }}>{"Mood"}</Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <IconI onPress={() => sharePlan(supplementMap, daySelected)}
                                    name="share-outline" size={30} color="white" style={{ textAlign: "center" }}/>
                                <Text style={{ color: "white", fontSize: 12 }}>{"Share"}</Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Icon onPress={() => (updateModalVisible("supplement-modal"), updateMultipleAddMode(true))} 
                                    name="clock" size={30} color="white" style={{ textAlign: "center" }}/>
                                <Text style={{ color: "white", fontSize: 12 }}>{"Schedule"}</Text>
                            </View>
                        </View>
                    </Animated.View>}
                </View>
                <View style={BottomMenuTabStyles.mainButtonRow}>
                    <Pressable onPress={() => (updateIndex(0))} disabled={ showButtons ? true : false } style={{ flexDirection: "column", alignItems: "center" }}>
                        <Icon name={ index === 0 ? "calendar-text" : "calendar-text-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                        {index === 0 && <Text style={{ color: "white", fontSize: 12 }}>{"Calendar"}</Text>}
                    </Pressable>
                    <Pressable onPress={() => (updateIndex(1))} disabled={ showButtons ? true : false } style={{ flexDirection: "column", alignItems: "center" }}>
                        <Icon name={ index === 1 ? "home" : "home-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                        {index === 1 && <Text style={{ color: "white", fontSize: 12 }}>{"Home"}</Text>}
                    </Pressable>
                    {modalVisible !== "disable-header" ? 
                        <Pressable onPress={() => updateShowButtons(!showButtons)} disabled={ index === 3 ? true : false }>
                            <Icon name="plus-box-outline" size={30} color="white" style={{ padding: 5, opacity: index === 3 ? 0.5 : 1 }}/>
                        </Pressable> : 
                        <Pressable onPress={() => shareUrl(selectedSupplement.Supplement.url, selectedSupplement)} disabled={ index === 3 ? true : false }>
                            <IconI name="share-outline" size={30} color="white" style={{ padding: 5, opacity: index === 3 ? 0.5 : 1 }}/>
                        </Pressable>
                    }
                    <Pressable onPress={() => (updateIndex(2))} disabled={ showButtons ? true : false } style={{ flexDirection: "column", alignItems: "center" }}>
                        <Icon
                            name={ index === 2 ? "text-box-search" : "text-box-search-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                        {index === 2 && <Text style={{ color: "white", fontSize: 12 }}>{"Explore"}</Text>}
                    </Pressable>
                    <Pressable onPress={() => (updateIndex(3))} disabled={ showButtons ? true : false } style={{ flexDirection: "column", alignItems: "center" }}>
                        <Icon name={ index === 3 ? "heart-multiple" : "heart-multiple-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                        {index === 3 && <Text style={{ color: "white", fontSize: 12 }}>{"Analysis"}</Text>}
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
