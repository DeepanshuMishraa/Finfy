import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, StyleSheet } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Appbar from "@/components/Appbar";
import TotalSpendCard from "@/components/TotalSpentCard";
import BudgetCard from "@/components/BudgetCard";

const Index = () => {
  const spent = useQuery(api.budget.getBudget);
  const totalSpent =
    spent?.reduce((acc, budget) => acc + budget.amount, 0) || 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Appbar />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TotalSpendCard totalSpent={totalSpent} budget={5000} />
        {spent?.map((budget) => (
          <BudgetCard
            key={budget._id}
            name={budget.name}
            amount={budget.amount}
            category={budget.category}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollContent: {
    padding: 16,
  },
});

export default Index;
