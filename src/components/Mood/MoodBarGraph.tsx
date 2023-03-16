// Source Imports
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryBar, VictoryLine } from "victory-native";
import useClientStore from "../../zustand/clientStore";

export default function MoodBarGraph({ graphType }: {
    graphType: string,
}): JSX.Element {
    const supplementMap = useClientStore(state => state.supplementMap);
    const daySelected = useClientStore(state => state.daySelected);
    const week = useClientStore(state => state.week);

    function grabDailyGraph() {
        const dailyGraph: { quarter: string; earnings: number; }[] = [];

        if (supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood !== undefined) {
            Object.values(supplementMap[daySelected].DailyMood).forEach(item => {
                dailyGraph.push({ quarter: item.mood, earnings: item.range });
            });
            return dailyGraph;
        }
        return [
            { quarter: "", earnings: 0 },
            { quarter: "", earnings: 0 },
            { quarter: "", earnings: 0 },
        ];
    }

    const data2013 = [
        { quarter: 1, earnings: 12 },
        { quarter: 2, earnings: 5 },
        { quarter: 3, earnings: 7 },
        { quarter: 4, earnings: 14 },
        { quarter: 5, earnings: 3 },
        { quarter: 6, earnings: 6 },
        { quarter: 7, earnings: 11 }
    ];
      
    const data2014 = grabDailyGraph();

    const data2015 = [
        { quarter: 1, earnings: 12 },
        { quarter: 2, earnings: 15 },
        { quarter: 3, earnings: 6 },
        { quarter: 4, earnings: 7 }
    ];
    
    function grabGraph() {
        switch (graphType) {
        case "data0":
            return data2013;
        case "data1":
            return data2014;
        case "data2":
            return data2015;
        }
        return data2014;
    }

    function grabTickFormatList() {
        const selectGraph = grabGraph();
        const tickFormatList: string [] = [];

        if (selectGraph !== undefined){
            Object.values(selectGraph).forEach(item => {
                tickFormatList.push(`${item.quarter}`);
            });
        }

        return tickFormatList;
    }

    function grabTickValuesList() {
        const selectGraph = grabGraph();
        const tickValuesList: number [] = [];
        let count = 0;

        if (selectGraph !== undefined){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.values(selectGraph).forEach(item => {
                count++;
                tickValuesList.push(count);
            });
        }

        return tickValuesList;
    }

    function grabWeekDays() {
        const tickFormatList: string [] = [];

        if (week !== undefined){
            Object.values(week).forEach(item => {
                tickFormatList.push(`${item.month}/${item.date}`);
            });
        }

        return tickFormatList;
    }

    function grabMoodForEachDay() {
        const dataList: { time: string, intensity: number }[] = [];
        week.forEach(day => {
            const moodValue = !supplementMap[day.dateString] ? 0 : supplementMap[day.dateString].DailyMood["Focus"].range;
            dataList.push({ time: day.dateString, intensity: moodValue });
        });
        return dataList;
    }

    return(
        <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>{daySelected}</Text>
            <VictoryChart
                // adding the material theme provided with Victory
                theme={VictoryTheme.material}
                domainPadding={20}
            
            >
                <VictoryAxis
                    tickValues={grabTickValuesList()}
                    tickFormat={graphType === "data0" ? grabWeekDays() : grabTickFormatList()}
                    style={{ grid : { stroke: "transparent" }, axis: { stroke: "white" }, tickLabels: { fill: "white" } }}
                />
                <VictoryAxis
                    animate={{ duration: 500 }}
                    dependentAxis
                    tickFormat={(x) => (`${x}`)}
                    style={{ grid : { stroke: "silver" }, axis: { stroke: "white" }, tickLabels: { fill: "white" } }}
                />
                {/* <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={[
                        { x: "2/20/2023", y: 1 },
                        { x: "2/20/2023", y: 4 },
                        { x: "2/20/2023", y: 2 },
                        { x: "2/20/2023", y: "2/23/2023" },
                        { x: "2/20/2023", y: "2/24/2023" }
                    ]}
                /> */}
                <VictoryBar
                    animate={{ duration: 500 }}
                    data={grabMoodForEachDay()}
                    x="time"
                    y="intensity"
                    style={{ data: { fill: "#04d9ff" } }}
                    cornerRadius={10}
                />
            </VictoryChart>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0B172A",
    }
});
