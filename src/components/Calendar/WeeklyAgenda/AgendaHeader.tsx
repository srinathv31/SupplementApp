// Source Imports
import React, { useContext } from "react";
import { View, FlatList, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { allPropsContext } from "../../../contextHooks/AllPropsContext";
import { styles } from "../../../styles/WeekStyles";
import { generateNextWeek, generatePrevWeek, grabMonth } from "../../../utilities/getCurrentDate";
import useClientStore from "../../../zustand/clientStore";

export default function AgendaHeader(): JSX.Element {
    const { setWeek, week, setMonthText } = useContext(allPropsContext);

    const updateSwipeAnimation = useClientStore(state => state.updateSwipeAnimation);
    const daySelected = useClientStore(state => state.daySelected);

    function switchWeek(direction: string) {
        if (direction === "next") {
            const nextWeek = generateNextWeek(week);
            setWeek(nextWeek);
            setMonthText(grabMonth(nextWeek));
            updateSwipeAnimation("slideInRight");
        } else if (direction === "prev") {
            const prevWeek = generatePrevWeek(week);
            setWeek(prevWeek);
            setMonthText(grabMonth(prevWeek));
            updateSwipeAnimation("slideInLeft");
        }
    }

    return(
        <View style={{ flexDirection: "row" }}>
            <Icon onPress={() => switchWeek("prev")}
                name="chevron-left" style={styles.IconWeek}/>
            <FlatList
                style={{ padding: 10, maxHeight: 70 }}
                contentOffset={{ x: 25, y: 0 }}
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
    );
}
