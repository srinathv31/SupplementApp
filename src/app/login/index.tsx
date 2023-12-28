import {
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Image,
  Platform,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { getRandomColor } from "../../constants/utils";
import AppleSignIn from "../../components/AppleSignIn";
import GoogleButton from "../../components/GoogleSignIn";
import { logoWithNameTransparent } from "../../assets/imageURLs/brandImageURLs";

export default function App() {
  const { width, height } = useWindowDimensions();

  const leftColor = useSharedValue("red");
  const rightColor = useSharedValue("blue");

  const colors = useDerivedValue(() => {
    return [leftColor.value, rightColor.value];
  }, []);

  useEffect(() => {
    const config = {
      duration: 4000,
      easing: Easing.inOut(Easing.quad),
    };

    const interval = setInterval(() => {
      leftColor.value = withTiming(getRandomColor(), config);
      rightColor.value = withTiming(getRandomColor(), config);
    }, 3500);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Canvas style={styles.background}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={colors}
          />
        </Rect>
      </Canvas>
      {Platform.OS === "ios" ? (
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          <Image
            source={{ uri: logoWithNameTransparent }}
            style={{ height: 100, width: 275 }}
          />
          <AppleSignIn />
          <GoogleButton />
        </BlurView>
      ) : (
        <View style={styles.blurContainer}>
          <Image
            source={{ uri: logoWithNameTransparent }}
            style={{ height: 100, width: 275 }}
          />
          <AppleSignIn />
          <GoogleButton />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    maxHeight: "50%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  background: {
    flex: 1,
    flexWrap: "wrap",
    // @ts-expect-error This properly fills the entire background
    ...StyleSheet.absoluteFill,
  },
  box: {
    width: "25%",
    height: "20%",
  },
  boxEven: {
    backgroundColor: "orangered",
  },
  boxOdd: {
    backgroundColor: "gold",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
