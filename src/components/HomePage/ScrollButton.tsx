import React from "react";
import { TouchableOpacity } from "react-native";
import IconI from "react-native-vector-icons/Ionicons";

export default function ScrollButton({ downButtonVisible, scrollToEnd }: {
    downButtonVisible: boolean,
    scrollToEnd: () => void
}): JSX.Element {
    return(
        <TouchableOpacity onPress={() => scrollToEnd()} style={{ backgroundColor: "transparent", position: "absolute", bottom: "5%", right: "5%" }}>
            {downButtonVisible 
                ? <IconI name="md-chevron-down-circle" color={"white"} size={25} />
                : null
            }
        </TouchableOpacity>
    );
}
