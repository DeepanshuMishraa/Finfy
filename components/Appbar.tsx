import React, { useEffect } from "react";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Link, SplashScreen } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

export default function Appbar() {
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={true} />
      <LinearGradient
        colors={["#4A00E0", "#8E2DE2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Ionicons name="wallet-outline" size={24} color="#FFFFFF" />
            <Text style={styles.logo}>Finfy</Text>
          </View>
          <View style={styles.buttons}>
            <Link href="/create-budget" asChild>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="add-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </Link>
            {isSignedIn && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  signOut();
                }}
              >
                <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#4A00E0",
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 8,
    fontFamily: "Supreme-Variable",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
});
