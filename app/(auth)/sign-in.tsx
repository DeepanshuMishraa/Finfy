import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, ActivityIndicator, TextInput } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/constants/styles";
import OAuthButton from "@/components/OAuthButton";

export default function SignInScreen() {
  const { isLoaded } = useSignIn();
  const router = useRouter();

  if (!isLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.authScreen}>
      <View style={styles.authForm}>
        <ThemedView style={{ marginVertical: 16, alignItems: "center" }}>
          <ThemedText type="title">Sign into Finfy</ThemedText>
          <ThemedText type="default">
            Welcome back! Please sign in to continue
          </ThemedText>
        </ThemedView>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <OAuthButton strategy="oauth_google">
              <MaterialCommunityIcons name="google" size={18} /> Google
            </OAuthButton>
          </View>
        </View>
      </View>
    </View>
  );
}
