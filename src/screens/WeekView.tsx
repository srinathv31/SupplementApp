// Source Imports
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconI from "react-native-vector-icons/Ionicons";
import { AppProps } from "../interfaces/Props";
import { SupplementObject } from "../interfaces/Supplement";
import { convertWeekDayToDateData, generateNextWeek, generatePrevWeek, generateWeekList, getDateString, grabMonth } from "../utilities/getCurrentDate";
import handleCalendar from "../utilities/handleCalendarEvents";
import { WeekDay } from "../interfaces/WeekDay";
import GestureRecognizer from "react-native-swipe-gestures";
import Modal from "react-native-modal";
// Component Imports

// Design Imports

export default function WeeklySupplementModal({ setModalVisible, modalVisible, setSupplementMap, supplementMap, setDaySelected, daySelected, setSelectedDates, selectedDates, setObjDaySelected, setWeek, week, setMonthText, monthText, setSwipeAnimation, swipeAnimation, setSelectedSupplement, selectedSupplement, setIndex }: AppProps): JSX.Element {
	const [showStatusButtons, setShowStatusButtons] = useState<boolean>(false);

	function removeSupplement(item: SupplementObject, parentData: WeekDay) {
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
			setSwipeAnimation("slideInRight");
		} else if (direction === "prev") {
			const prevWeek = generatePrevWeek(week);
			setWeek(prevWeek);
			setMonthText(grabMonth(prevWeek));
			setSwipeAnimation("slideInLeft");
		}
	}

	function handleDayClick(weekDay: WeekDay) {
		const weekDayDateData = convertWeekDayToDateData(weekDay);

		setSwipeAnimation("fadeIn");

		setObjDaySelected(weekDayDateData);
		setDaySelected(getDateString(weekDayDateData));

		const selectedDatesCopy = handleCalendar(selectedDates, weekDayDateData.dateString);
		setSelectedDates(selectedDatesCopy);

		setWeek(generateWeekList(weekDayDateData));
		setMonthText(grabMonth(generateWeekList(weekDayDateData)));
	}

	function changeTime(item: SupplementObject, parentData: WeekDay) {
		handleDayClick(parentData);
		setSelectedSupplement(item);
		setIndex(1);
		setModalVisible({ modal: "time-modal" });
	}

	function getRadioButtonStatus(taken: SupplementObject["taken"]) {
		switch(taken) {
		case "not-taken":
			return "radio-button-off-outline";
		case "taken-off-time":
		case "missed":
			return "radio-button-on-outline";
		case "taken-on-time":
			return "checkmark-circle";
		}
	}
	function getRadioButtonColor(taken: SupplementObject["taken"]) {
		switch(taken) {
		case "not-taken":
			return "#EEE";
		case "taken-off-time":
			return "#fcc623";
		case "missed":
			return "red";
		case "taken-on-time":
			return "#28c916";
		}
	}

	function handleStatusToggle(item: SupplementObject) {
		setSwipeAnimation("fadeIn");
		setSelectedSupplement(item);
		setShowStatusButtons(!showStatusButtons);
	}

	function toggleTakenStatus(taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time", item: SupplementObject) {
		const supplementMapCopy = { ... supplementMap };

		item.taken = taken;
		setSupplementMap(supplementMapCopy);
		setShowStatusButtons(false);
	}

	return(
		<Modal
			animationIn={swipeAnimation}
			animationOut="slideOutDown"
			isVisible={modalVisible.modal === "weekly-modal" ? true : false}
			useNativeDriver={true}
			backdropTransitionOutTiming={0}
			hideModalContentWhileAnimating
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					{/* <Text style={{ fontSize: 24, color: "white", padding: 10, textAlign: "center" }}>Swipe</Text> */}
					<Text style={{ fontSize: 24, color: "white", padding: 10, textAlign: "center" }}>{monthText}</Text>
					<View style={{ flexDirection: "row" }}>
						<Icon onPress={() => switchWeek("prev")}
							name="chevron-left" style={styles.IconWeek}/>
						<FlatList
							style={{ padding: 10, maxHeight: 70 }}
							contentOffset={{ x: 15, y: 0 }}
							scrollEnabled
							showsHorizontalScrollIndicator={false}
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
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => { 
								const parentData = item; 
								return (
									<GestureRecognizer
										onSwipeLeft={() => switchWeek("next")}
										onSwipeRight={() => switchWeek("prev")}
									>
										<TouchableHighlight key={item.date}>
											<View style={styles.ListItem}>
												<Pressable onPress={() => (handleDayClick(item), setModalVisible({ modal: "hide-modal" }), setIndex(1))}>
													<Text style={{ fontSize: 24, color: daySelected === item.dateString ? "orange" : "white" }}>{item.date}</Text>
												</Pressable>
												<Text style={{ fontSize: 18, fontWeight: "600", color: daySelected === item.dateString ? "orange" : "white" }}>{item.day}</Text>
												<FlatList
													data={supplementMap[item.dateString] === undefined ? [] : supplementMap[item.dateString].SupplementSchedule}
													renderItem={({ item }) => (
														<TouchableHighlight key={item.Supplement.name}>
															<View style={styles.SuppItem}>
																{ (selectedSupplement === item && showStatusButtons) && <View style={{ flexDirection: "row", marginHorizontal: 3 }}>
																	<IconI onPress={() => toggleTakenStatus("not-taken", item)} name={"radio-button-off-outline"} style={[styles.IconPadding, { color: "#EEE" }]}></IconI>
																	<IconI onPress={() => toggleTakenStatus("taken-off-time", item)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#fcc623" }]}></IconI>
																	<IconI onPress={() => toggleTakenStatus("missed", item)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "red" }]}></IconI>
																	<IconI onPress={() => toggleTakenStatus("taken-on-time", item)} name={"checkmark-circle"} style={[styles.IconPadding, { color: "#28c916" }]}></IconI>
																</View> }
																<IconI onPress={() => handleStatusToggle(item)}
																	name={getRadioButtonStatus(item.taken)} style={[styles.IconPadding, { color: getRadioButtonColor(item.taken) }]}></IconI>
																{item.time === "" && <Icon onPress={() => changeTime(item, parentData)} name="clock" style={styles.IconPadding}/>}
																<Text onPress={() => changeTime(item, parentData)} style={styles.ListName}>{item.time !== "" && item.time +":"} </Text>
																<Text style={styles.ListName}> {item.Supplement.name}</Text>
																<Icon onPress={() => removeSupplement(item, parentData)}
																	name="delete-forever" style={styles.IconPadding}/>
															</View>
														</TouchableHighlight>
													)}
												></FlatList>
											</View>
										</TouchableHighlight>
									</GestureRecognizer>
								);}}
						></FlatList>
					</View>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => (setModalVisible({ modal: "hide-modal" }), setSwipeAnimation("fadeIn"))}
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
