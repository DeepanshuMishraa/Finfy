import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { Slot, Stack } from "expo-router";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import "./globals.css";
import { ConvexReactClient } from "convex/react";
import * as SecureStore from "expo-secure-store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme.web";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL as string,
  {
    unsavedChangesWarning: false,
  }
);

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function RootLayoutNav() {
  const { isSignedIn, isLoaded } = useAuth();
  const colorScheme = useColorScheme();

  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {isSignedIn ? <Slot /> : <Stack.Screen name="(auth)" />}
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ClerkLoaded>
          <RootLayoutNav />
        </ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
