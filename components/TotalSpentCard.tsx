import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TotalSpendCardProps = {
  totalSpent: number;
};

const TotalSpendCard: React.FC<TotalSpendCardProps> = ({ totalSpent }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Total Spent</Text>
      <Text style={styles.amount}>₹{totalSpent.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default TotalSpendCard;
