import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import { Authenticated, Unauthenticated } from "convex/react";
import Button from "@/components/Button";

const Index = () => {
  const { signOut } = useClerk();
  return (
    <View className="flex items-center  justify-center h-screen">
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
