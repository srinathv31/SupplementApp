import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { View, Text } from "./Themed";
import { useClientStore } from "../zustand/store";

export default function BottomMenuTab(): JSX.Element {
  const index = useClientStore((state) => state.index);
  const updateIndex = useClientStore((state) => state.updateIndex);

  const menuIcons: {
    icon:
      | keyof typeof MaterialCommunityIcons.glyphMap
      | keyof typeof AntDesign.glyphMap;
    iconSelected:
      | keyof typeof MaterialCommunityIcons.glyphMap
      | keyof typeof AntDesign.glyphMap;
    label: string;
    iconType: string;
  }[] = [
    {
      icon: "calendar-text-outline",
      iconSelected: "calendar-text",
      label: "Calendar",
      iconType: "material",
    },
    {
      icon: "appstore-o",
      iconSelected: "appstore1",
      label: "Home",
      iconType: "antdesign",
    },
    {
      icon: "text-box-search-outline",
      iconSelected: "text-box-search",
      label: "Explore",
      iconType: "material",
    },
  ];

  return (
    <View style={styles.mainButtonRow}>
      {menuIcons.map((icon, idx) => {
        return (
          <Pressable
            key={idx}
            onPress={() => updateIndex(idx)}
            style={{ flexDirection: "column", alignItems: "center" }}
          >
            {icon.iconType === "material" ? (
              <MaterialCommunityIcons
                // @ts-expect-error Union type issue
                name={index === idx ? icon.iconSelected : icon.icon}
                size={30}
                color="white"
                style={{ padding: 5, overflow: "hidden" }}
              />
            ) : (
              <AntDesign
                // @ts-expect-error Union type issue
                name={index === idx ? icon.iconSelected : icon.icon}
                size={30}
                color="white"
                style={{ padding: 5, overflow: "hidden" }}
              />
            )}
            {index === idx && (
              <Text style={{ color: "white", fontSize: 12 }}>{icon.label}</Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainButtonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
