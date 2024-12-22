import React from "react";
import { useSignIn } from "@clerk/clerk-expo";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import OAuthButton from "@/components/OAuthButton";

export default function SignInScreen() {
  const { isLoaded } = useSignIn();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={require("@/assets/images/bg.jpeg")}
          style={styles.backgroundImage}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)"]}
            style={styles.gradient}
          >
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <MaterialCommunityIcons
                  name="finance"
                  size={80}
                  color="#ffffff"
                />
              </View>
              <Text style={styles.title}>Welcome to Finfy</Text>
              <ThemedText style={styles.subtitle}>
                Track your expenses and budget
              </ThemedText>

              <View style={styles.buttonContainer}>
                <OAuthButton strategy="oauth_google">
                  <View style={styles.buttonContent}>
                    <MaterialCommunityIcons
                      name="google"
                      size={24}
                      color="#ffffff"
                    />
                    <ThemedText style={styles.buttonText}>
                      Sign in with Google
                    </ThemedText>
                  </View>
                </OAuthButton>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black", // This ensures no white space is visible
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Satoshi-Bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", // This ensures no white space is visible during loading
  },
});
