import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View className="flex items-center justify-center h-screen">
      <Link href="/sign-in">
        <Text>Sign in</Text>
      </Link>
      <Link href="/sign-up">
        <Text>Sign up</Text>
      </Link>
    </View>
  );
};

export default Index;
