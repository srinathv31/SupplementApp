// Source Imports
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryBar } from "victory-native";

export default function MoodBarGraph({ graphType }: {
    graphType: string
}): JSX.Element {

    const data2013 = [
        { quarter: 1, earnings: 15000 },
        { quarter: 2, earnings: 12500 },
        { quarter: 3, earnings: 19500 },
        { quarter: 4, earnings: 13000 }
    ];
      
    const data2014 = [
        { quarter: 1, earnings: 11500 },
        { quarter: 2, earnings: 13250 },
        { quarter: 3, earnings: 20000 },
        { quarter: 4, earnings: 15500 }
    ];

    const data2015 = [
        { quarter: 1, earnings: 18000 },
        { quarter: 2, earnings: 13250 },
        { quarter: 3, earnings: 15000 },
        { quarter: 4, earnings: 12000 }
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
    }

    return(
        <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 20 }}>{graphType}</Text>
            <VictoryChart
                // adding the material theme provided with Victory
                theme={VictoryTheme.material}
                domainPadding={20}
                animate={{ duration: 1000 }}
            >
                <VictoryAxis
                    tickValues={[1, 2, 3, 4]}
                    tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                    style={{ grid : { stroke: "silver" }, axis: { stroke: "white" }, tickLabels: { fill: "white" } }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`$${x / 1000}k`)}
                    style={{ grid : { stroke: "silver" }, axis: { stroke: "white" }, tickLabels: { fill: "white" } }}
                />
                <VictoryBar
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
