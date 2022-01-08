// Source Imports
import React from "react";
import { View } from "react-native";


export default function Divider({ length, color }: {
	length: "full" | "medium" | "small",
	color?: string
} ): JSX.Element {
	
    function grabLength(): string | number | undefined {
        let size = "";
        switch(length){
        case "full":
            size = "95%";
            break;
        case "medium":
            size = "50%";
            break;
        case "small":
            size = "25%";
            break;
        }
        return size;
    }

    return(
        <View style={{ backgroundColor: color === undefined ? "white" : color, minHeight: 1, width: grabLength(), alignSelf: "center" }}></View>
    );
}
