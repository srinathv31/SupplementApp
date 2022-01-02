// Source Imports
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, TouchableHighlight, View, Modal } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppProps } from "../interfaces/Props";
import Supplement from "../interfaces/Supplement";
import { convertWeekDayToDateData, generateNextWeek, generatePrevWeek, generateWeek, getDateString, grabMonth } from "../utilities/getCurrentDate";
import GestureRecognizer from "react-native-swipe-gestures";
import handleCalendar from "../utilities/handleCalendarEvents";
import { WeekDay } from "../interfaces/WeekDay";

// Component Imports

// Design Imports

export default function WeeklySupplementModal({ setModalVisible, modalVisible, setSupplementMap, supplementMap, setDaySelected, daySelected, setSelectedDates, selectedDates, setObjDaySelected, setWeek, week, setMonthText, monthText }: AppProps): JSX.Element {

	function removeSupplement(item: Supplement, parentData: WeekDay) {
		const supplementMapCopy = { ...supplementMap };
		const parentDataMapKey = parentData.dateString;
		const parentDayDateData = convertWeekDayToDateData(parentData);

		supplementMapCopy[parentDataMapKey].SupplementSchedule = supplementMapCopy[parentDataMapKey].SupplementSchedule.filter(listItem => listItem !== item);
		removeDate(parentDayDateData, supplementMapCopy, parentDataMapKey);
		if (Object.values(supplementMapCopy[parentDataMapKey].SupplementSchedule).length === 0 && supplementMapCopy[parentDataMapKey].JournalEntry === "") {
			delete supplementMapCopy[parentDataMapKey];
		}
		setSupplementMap(supplementMapCopy);
		handleDayClick(parentData);
	}

	function removeDate(day: DateData, supplementMap: AppProps["supplementMap"], parentDataMapKey: string){
		const selectedDatesCopy = { ...selectedDates };
		const stringDate = day.dateString;
		if (Object.values(supplementMap[parentDataMapKey].SupplementSchedule).length === 0){
			selectedDatesCopy[stringDate].dots = selectedDatesCopy[stringDate].dots.filter(item => item.key !== "supplementCheck") as [{key: string, color: string}];
		}
		setSelectedDates(selectedDatesCopy);
	}

	function switchWeek(direction: string) {
		if (direction === "next") {
			const nextWeek = generateNextWeek(week);
			setWeek(nextWeek);
			setMonthText(grabMonth(nextWeek));
		} else if (direction === "prev") {
			const prevWeek = generatePrevWeek(week);
			setWeek(prevWeek);
			setMonthText(grabMonth(prevWeek));
		}
	}

	function handleDayClick(weekDay: WeekDay) {
		const weekDayDateData = convertWeekDayToDateData(weekDay);

		setObjDaySelected(weekDayDateData);
		setDaySelected(getDateString(weekDayDateData));

		const selectedDatesCopy = handleCalendar(selectedDates, weekDayDateData.dateString);
		setSelectedDates(selectedDatesCopy);

		setWeek(generateWeek(weekDayDateData));
		setMonthText(grabMonth(generateWeek(weekDayDateData)));
	}

	return(
		<Modal
			animationType={"slide"}
			transparent={true}
			visible={modalVisible === "weekly-modal" ? true : false}
			// animationInTiming={1500}
			// animationOut={"slideOutRight"}
			// animationOutTiming={1500}
			onRequestClose={() => {
				setModalVisible("hide-modal");
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					{/* <GestureRecognizer
						onSwipeRight={() => switchWeek("prev")}
						onSwipeLeft={() => switchWeek("next")}
					> */}
					{/* <Text style={{ fontSize: 24, color: "white", padding: 10, textAlign: "center" }}>Swipe</Text> */}
					<Text style={{ fontSize: 24, color: "white", padding: 10, textAlign: "center" }}>{monthText}</Text>
					<View style={{ flexDirection: "row" }}>
						<Icon onPress={() => switchWeek("prev")}
							name="chevron-left" style={styles.IconWeek}/>
						<FlatList
							style={{ padding: 10, maxHeight: 70 }}
							contentOffset={{ x: 15, y: 0 }}
							scrollEnabled={false}
							horizontal
							data={week}
							renderItem={({ item }) => (
								<View style={{ padding: 10 }}>
									<Text style={{ color: daySelected === item.dateString ? "orange" : "white", textAlign: "center", fontSize: 13 }}>{item.date}</Text>
									<Text style={{ color: daySelected === item.dateString ? "orange" : "white", fontSize: 13 }}>{item.day}</Text>
								</View>
							)}
						></FlatList>
						<Icon onPress={() => switchWeek("next")}
							name="chevron-right" style={styles.IconWeek}/>
					</View>
					<View style={{ flex: 1 }}>
						<FlatList
							data={week}
							renderItem={({ item }) => { 
								const parentData = item; 
								return (
									<TouchableHighlight key={item.date}>
										<View style={styles.ListItem}>
											<Pressable onPress={() => handleDayClick(item)}>
												<Text style={{ fontSize: 24, color: daySelected === item.dateString ? "orange" : "white" }}>{item.date}</Text>
											</Pressable>
											<Text style={{ fontSize: 18, fontWeight: "600", color: daySelected === item.dateString ? "orange" : "white" }}>{item.day}</Text>
											<FlatList
												data={supplementMap[item.dateString] === undefined ? [] : supplementMap[item.dateString].SupplementSchedule}
												renderItem={({ item }) => (
													<TouchableHighlight key={item.name}>
														<View style={styles.SuppItem}>
															<Text style={styles.ListName}>{item.time}: {item.name}</Text>
															<Icon onPress={() => removeSupplement(item, parentData)}
																name="delete-forever" style={styles.IconPadding}/>
														</View>
													</TouchableHighlight>
												)}
											></FlatList>
										</View>
									</TouchableHighlight>
								);}}
						></FlatList>
					</View>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => setModalVisible("hide-modal")}
					>
						<Text style={styles.textStyle}>Close</Text>
					</Pressable>
					{/* </GestureRecognizer> */}
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
		width: "95%",
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
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		textDecorationLine: "underline",
		color: "white",
		fontSize: 20
	},
	ListItem: {
		textAlign: "center",
		padding: 10,
		margin: 10,
		width: "95%",
		color: "white",
		borderBottomColor: "white",
		borderBottomWidth: 1,
		overflow:"hidden",
		flexDirection: "row",
		
	},
	SuppItem: {
		textAlign: "center",
		padding: 5,
		margin: 5,
		width: "95%",
		color: "white",
		borderRadius: 10,
		overflow:"hidden",
		flexDirection: "row",
	},
	ListName: {
		fontSize: 18,
		fontWeight: "600",
		color: "white"
	},
	IconPadding: {
		padding: 1,
		margin: 1,
		fontSize: 18,
		color: "white"
	},
	IconWeek: {
		padding: 1,
		margin: 1,
		fontSize: 18,
		color: "white",
		alignSelf: "center"
	}
});
