// Source Imports
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { AppProps } from "../../interfaces/Props";
import SupplementPage from "./SupplementPage";

export default function DetailedSupplementModal({ setModalVisible, modalVisible, selectedSupplement }: AppProps): JSX.Element {
	return(
		<Modal
			animationIn="slideInUp"
			animationOut="slideOutDown"
			isVisible={modalVisible.modal === "info-modal"}
			useNativeDriver
			backdropTransitionOutTiming={0}
			hideModalContentWhileAnimating
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<SupplementPage
						supplementObj={selectedSupplement}
					></SupplementPage>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => (setModalVisible({ modal: "hide-modal" }))}
					>
						<Text style={styles.textStyle}>Close</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	modalView: {
		width: "110%",
		height: "85%",
		margin: 20,
		backgroundColor: "#0B172A",
		borderRadius: 20,
		padding: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		margin: 10,
		elevation: 2,
		width: 125,
		alignSelf: "center"
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	}
});
