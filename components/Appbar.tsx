import React from "react";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Link, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Appbar() {
  const { signOut } = useClerk();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Ionicons name="wallet-outline" size={24} color="#4A90E2" />
          <Text style={styles.logo}>Finfy</Text>
        </View>
        <View style={styles.buttons}>
          <Link href="/create-budget" asChild>
            <TouchableOpacity style={styles.createButton}>
              <Ionicons name="add-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </Link>
          {isSignedIn && (
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={() => signOut()}
            >
              <Ionicons name="log-out-outline" size={20} color="#4A90E2" />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "black",
  },
  container: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
    marginLeft: 8,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 4,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4A90E2",
  },
  signOutButtonText: {
    color: "#4A90E2",
    fontWeight: "600",
    marginLeft: 4,
  },
});
