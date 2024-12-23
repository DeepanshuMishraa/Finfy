import { Text, View } from "react-native";
import React from "react";
import { Link, Redirect, useRouter } from "expo-router";
import { useClerk, useAuth } from "@clerk/clerk-expo";
import Button from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import Appbar from "@/components/Appbar";

const Index = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <Appbar />
    </>
  );
};

export default Index;
