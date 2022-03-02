// Source Imports
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryBar } from "victory-native";
import { AppProps } from "../../interfaces/Props";

export default function MoodBarGraph({ graphType, week }: {
    graphType: string,
    week: AppProps["week"]
}): JSX.Element {

    const data2013 = [
        { quarter: 1, earnings: 12 },
        { quarter: 2, earnings: 5 },
        { quarter: 3, earnings: 7 },
        { quarter: 4, earnings: 14 },
        { quarter: 5, earnings: 3 },
        { quarter: 6, earnings: 6 },
        { quarter: 7, earnings: 11 }
    ];
      
    const data2014 = [
        { quarter: 1, earnings: 3 },
        { quarter: 2, earnings: 1 },
        { quarter: 3, earnings: 5 }
    ];

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
                tickFormatList.push(`Mood: ${item.quarter}`);
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

    return(
        <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 20 }}>{graphType}</Text>
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
                <VictoryBar
                    animate={{ duration: 500 }}
                    data={grabGraph()}
                    x="quarter"
                    y="earnings"
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
        borderColor: "white",
        borderWidth: 1
    }
});
