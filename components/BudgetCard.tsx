import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface BudgetCardProps {
  name: string;
  amount: number;
  spent?: number;
  category: string;
  onPress?: () => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  name,
  amount,
  spent = 0,
  category,
  onPress,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View
      entering={FadeInUp}
      style={[styles.container, animatedStyle]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Spent</Text>
            <Text style={styles.amount}>₹{amount.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  category: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountContainer: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  totalAmount: {
    fontSize: 14,
    color: "#666",
  },
});

export default BudgetCard;
