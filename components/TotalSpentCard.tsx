import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Svg, Circle } from "react-native-svg";

type TotalSpendCardProps = {
  totalSpent: number;
  budget: number;
};

const TotalSpendCard: React.FC<TotalSpendCardProps> = ({
  totalSpent = 0,
  budget = 1,
}) => {
  const [fontsLoaded] = useFonts({
    "Satoshi-Variable": require("@/assets/fonts/Satoshi-Variable.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const progress = Math.min(totalSpent / budget, 1);
  const remainingPercentage =
    budget > 0
      ? Math.max(((budget - totalSpent) / budget) * 100, 0).toFixed(0)
      : "0";

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withSpring(1.05, { damping: 2, stiffness: 80 });
    const timer = setTimeout(() => {
      scale.value = withSpring(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [totalSpent, scale]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Animated.View entering={FadeIn} style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={["#4A00E0", "#8E2DE2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Total Spent</Text>
            <Text style={styles.amount}>₹{totalSpent.toFixed(2)}</Text>
            <Text style={styles.budget}>of ₹{budget.toFixed(2)} budget</Text>
          </View>
          <View style={styles.progressContainer}>
            <Svg width="80" height="80" style={styles.progressSvg}>
              <Circle
                cx="40"
                cy="40"
                r="35"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="10"
                fill="none"
              />
              <Circle
                cx="40"
                cy="40"
                r="35"
                stroke="#FFFFFF"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${progress * 220} 220`}
                strokeLinecap="round"
                rotation="-90"
                origin="40, 40"
              />
            </Svg>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageText}>{remainingPercentage}%</Text>
              <Text style={styles.percentageLabel}>left</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
    fontFamily: "Satoshi-Variable",
  },
  amount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Satoshi-Variable",
    marginBottom: 4,
  },
  budget: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Satoshi-Variable",
  },
  progressContainer: {
    position: "relative",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  progressSvg: {
    transform: [{ rotateZ: "0deg" }],
  },
  percentageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Satoshi-Variable",
  },
  percentageLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Satoshi-Variable",
  },
});

export default TotalSpendCard;
