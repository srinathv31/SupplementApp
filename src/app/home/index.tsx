import { SafeAreaView, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { View } from "../../components/Themed";
import { useState } from "react";
import { useClientStore } from "../../zustand/store";
import BottomMenuTab from "../../components/BottomMenuTab";
import Calendar from "../../components/Calendar";
import HomePage from "../../components/HomePage";

const FirstRoute = () => <Calendar />;

const SecondRoute = () => <HomePage />;

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: "skyblue" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const index = useClientStore((state) => state.index);
  const updateIndex = useClientStore((state) => state.updateIndex);

  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={updateIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={() => <BottomMenuTab />}
          tabBarPosition="bottom"
        />
      </SafeAreaView>
    </View>
  );
}
