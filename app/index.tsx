import { View, Text } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { Authenticated, Unauthenticated } from "convex/react";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  const { signOut } = useClerk();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  return (
    <View className="flex items-center  justify-center h-screen">
      <StatusBar hidden={true} />
      <Link href="/(auth)/sign-in">
        <Unauthenticated>
          <Text className="text-2xl dark:text-white text-black">Sign in</Text>
        </Unauthenticated>
        <Authenticated>
          <Button onPress={() => signOut()}>Sign Out</Button>
        </Authenticated>
      </Link>
    </View>
  );
};

export default Index;
