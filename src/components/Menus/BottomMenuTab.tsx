// Source Imports
import React from "react";
import { KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconI from "react-native-vector-icons/Ionicons";
import IconA from "react-native-vector-icons/AntDesign";
import BottomMenuTabStyles from "../../styles/BottomMenuTab";
import MoodPicker from "../Mood/MoodPicker";
import { shareUrl } from "../../utilities/shareFunctions";
import MoodSlider from "../Mood/MoodSlider";
import useClientStore from "../../zustand/clientStore";

export default function BottomMenuTab(): JSX.Element {
    const index = useClientStore(state => state.index);
    const modalVisible = useClientStore(state => state.modalVisible);
    const updateIndex = useClientStore(state => state.updateIndex);
    const selectedSupplement = useClientStore(state => state.selectedSupplement);
    const updateCategorySelect = useClientStore(state => state.updateCategorySelect);
    const categorySelect = useClientStore(state => state.categorySelect);
    const openMoodPicker = useClientStore(state => state.openMoodPicker);

    function homeButton() {
        if (index !== 1) {
            updateIndex(1);
            return;
        }
        updateCategorySelect("Home");
    }

    return(
        <KeyboardAvoidingView
            behavior="position"
        >
            <View style={{ zIndex: 100 }}>
                { openMoodPicker && <MoodPicker
                    dropDirection="TOP"
                    mode="setting"
                ></MoodPicker> }
                <MoodSlider />
                
                <View style={BottomMenuTabStyles.mainButtonRow}>
                    <Pressable onPress={() => updateIndex(0)} style={{ flexDirection: "column", alignItems: "center" }}>
                        <Icon name={ index === 0 ? "calendar-text" : "calendar-text-outline"} size={30} color="white" style={{ padding: 5, overflow: "hidden" }}/>
                        {index === 0 && <Text style={{ color: "white", fontSize: 12 }}>{"Calendar"}</Text>}
                    </Pressable>
                    {modalVisible !== "disable-header" ? 
                        <Pressable onPress={() => homeButton()} style={{ flexDirection: "column", alignItems: "center" }}>
                            {categorySelect === "Home"
                                ? <IconA name="appstore1" size={30} color="white" style={{ padding: 5 }}/>
                                : <IconA name="appstore-o" size={30} color="white" style={{ padding: 5 }}/>
                            }
                            {index === 1 && <Text style={{ color: "white", fontSize: 12 }}>{"Home"}</Text>}
                        </Pressable> : 
                        <Pressable onPress={() => shareUrl(selectedSupplement.Supplement.url, selectedSupplement)} style={{ flexDirection: "column", alignItems: "center" }}>
                            <IconI name="share-outline" size={30} color="white" style={{ padding: 5, opacity: index === 3 ? 0.5 : 1 }}/>
                            <Text style={{ color: "white", fontSize: 12 }}>{"Share"}</Text>
                        </Pressable>
                    }
                    <Pressable onPress={() => updateIndex(2)} style={{ flexDirection: "column", alignItems: "center" }}>
                        <Icon
                            name={ index === 2 ? "text-box-search" : "text-box-search-outline"} size={30} color="white" style={{ padding: 5, overflow: "hidden" }}/>
                        {index === 2 && <Text style={{ color: "white", fontSize: 12 }}>{"Explore"}</Text>}
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
