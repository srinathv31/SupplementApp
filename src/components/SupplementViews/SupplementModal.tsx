// Source Imports
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import SupplementListView from "./SupplementListView";

// Component Imports

// Design Imports

export default function SupplementModal( AllProps: AppProps ): JSX.Element {
	return(
		<Modal
			animationType="slide"
			transparent={true}
			visible={AllProps.modalVisible.modal === "supplement-modal" ? true : false}
			onRequestClose={() => {
				AllProps.setModalVisible({ modal: "hide-modal" });
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Supplement List</Text>
					<SupplementListView
						{...AllProps}
						fontSizeNumber={18}
						query={""}
					></SupplementListView>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => AllProps.setModalVisible({ modal: "hide-modal" })}
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
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: "25%",
		maxHeight: "55%"
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		paddingBottom: 15,
		paddingTop: 15,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		width: 125
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
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		width: 125,
		textDecorationLine: "underline"
	}
});
