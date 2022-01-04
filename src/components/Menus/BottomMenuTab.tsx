// Source Imports
import React, { useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppProps } from "../../interfaces/Props";

// Component Imports

// Design Imports
import BottomMenuTabStyles from "../../styles/BottomMenuTab";

export default function BottomMenuTab({ setModalVisible, showButtons, setShowButtons, index, setIndex, setPrevIndex, setMultipleAddMode }: AppProps): JSX.Element {


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
					<Icon onPress={() => setModalVisible("supplement-modal")}
						name="pill" size={30} color="white"/>
					<Icon name="emoticon-happy-outline" size={30} color="white"/>
					<Icon name="silverware-fork-knife" size={30} color="white"/>
					<Icon onPress={() => (setModalVisible("supplement-modal"), setMultipleAddMode(true))} 
						name="clock" size={30} color="white"/>
				</View> }
			</Animated.View>
			<View style={BottomMenuTabStyles.mainButtonRow}>
				<Pressable onPress={() => (setPrevIndex(index), setIndex(0))} disabled={ showButtons ? true : false }>
					<Icon name={ index === 0 ? "calendar-text" : "calendar-text-outline"} size={30} color="white"style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
				</Pressable>
				<Pressable onPress={() => (setPrevIndex(index), setIndex(1))} disabled={ showButtons ? true : false }>
					<Icon
						name={ index === 1 ? "home" : "home-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
				</Pressable>
				<Icon onPress={buttonHandle}
					name="plus-box-outline" size={30} color="white" style={{ padding: 5 }}/>
				<Pressable onPress={() => (setPrevIndex(index), setIndex(2))} disabled={ showButtons ? true : false }>
					<Icon
						name={ index === 2 ? "text-box-search" : "text-box-search-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
				</Pressable>
				<Pressable onPress={() => (setPrevIndex(index), setIndex(3))} disabled={ showButtons ? true : false }>
					<Icon name={ index === 3 ? "heart-multiple" : "heart-multiple-outline"} size={30} color="white"style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
				</Pressable>
			</View>
		</View>
	);
}
