/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";
LogBox.ignoreLogs([
    "Require cycle: node_modules/victory",
]);

AppRegistry.registerComponent(appName, () => App);
