import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import { useClientStore } from "../zustand/store";

export default function HomePage(): JSX.Element {
  const updateSelectedDate = useClientStore(
    (state) => state.updateSelectedDate,
  );
  const selectedDate = useClientStore((state) => state.selectedDate);

  function nextDay() {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const dateStr = nextDate.toISOString().split("T")[0];
    updateSelectedDate(dateStr);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={nextDay}>
        <Text>Next Day</Text>
      </Pressable>
      <Text>{selectedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
