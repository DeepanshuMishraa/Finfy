import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Button from "@/components/Button";
import { router, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

function CreateBudget() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const createBudget = useMutation(api.budget.createBudget);
  const [loading, setLoading] = useState(false);

  const [loaded, error] = useFonts({
    "Supreme-Variable": require("@/assets/fonts/Supreme-Variable.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const handleSubmit = async () => {
    if (!name || !amount || !category) {
      Alert.alert("Oops!", "Please fill in all fields to create your budget.");
      return;
    }

    try {
      setLoading(true);
      await createBudget({ name, amount: Number(amount), category });
      Alert.alert("Success!", "Your expense has been recorded successfully.");
      setName("");
      setAmount("");
      setCategory("");
      router.push("/(app)");
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Error",
        "We couldn't record your expense. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <LinearGradient colors={["#4A00E0", "#8E2DE2"]} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Track Your Spending</Text>
            <Text style={styles.subtitle}>Keep your finances in check</Text>

            <View style={styles.card}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Expense Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g., Grocery Shopping"
                  placeholderTextColor="#A0AEC0"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Spent Amount</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  placeholderTextColor="#A0AEC0"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select a category" value="" />
                    <Picker.Item label="Food" value="food" />
                    <Picker.Item
                      label="Transportation"
                      value="transportation"
                    />
                    <Picker.Item label="Entertainment" value="entertainment" />
                    <Picker.Item label="Utilities" value="utilities" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
              </View>

              <Button
                style={styles.button}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Add Expense</Text>
                )}
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Supreme-Variable",
  },
  subtitle: {
    fontSize: 18,
    color: "#E2E8F0",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Supreme-Variable",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: 8,
    fontFamily: "Supreme-Variable",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#2D3748",
    backgroundColor: "#F7FAFC",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F7FAFC",
  },
  picker: {
    color: "#2D3748",
    height: 50,
    padding:30,
  },
  button: {
    backgroundColor: "#4A00E0",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Supreme-Variable",
  },
});

export default CreateBudget;
