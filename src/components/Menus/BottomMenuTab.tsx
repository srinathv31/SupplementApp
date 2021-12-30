// Source Imports
import React, { useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Component Imports

// Design Imports
import BottomMenuTabStyles from "../../styles/BottomMenuTab";

export default function BottomMenuTab({ setVisiblePage, visiblePage, setModalVisible, showButtons, setShowButtons }: {
    setVisiblePage: (v: string) => void, visiblePage: string
    setModalVisible: (s: string) => void,
	setShowButtons: (b: boolean) => void, showButtons: boolean
}): JSX.Element {


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
		showButtons ? (fadeOut(), setShowButtons(false)) : (fadeIn(), setShowButtons(true));
	}

	return(
		<View style={{ zIndex: 100 }}>
			<Animated.View style={{ opacity: fadeAnim }}>
				{ showButtons && <View style={BottomMenuTabStyles.secondaryButtonRow}>
					<Icon onPress={() => setModalVisible("2")}
						name="pill" size={30} color="white"/>
					<Icon name="emoticon-happy-outline" size={30} color="white"/>
					<Icon name="silverware-fork-knife" size={30} color="white"/>
					<Icon name="weight-lifter" size={30} color="white" onPress={() => console.log("hello")}/>
				</View> }
			</Animated.View>
			<View style={BottomMenuTabStyles.mainButtonRow}>
				<Pressable onPress={() => setVisiblePage("1")} disabled={ showButtons ? true : false }>
					<Icon
						name={ visiblePage === "1" ? "home" : "home-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
				</Pressable>
				<Icon onPress={buttonHandle}
					name="plus-box-outline" size={30} color="white" style={{ padding: 5 }}/>
				<Pressable onPress={() => setVisiblePage("2")} disabled={ showButtons ? true : false }>
					<Icon
						name={ visiblePage === "2" ? "text-box-search" : "text-box-search-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
				</Pressable>
			</View>
		</View>
	);
}
