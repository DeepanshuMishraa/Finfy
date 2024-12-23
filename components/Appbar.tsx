import { useAuth, useClerk } from "@clerk/clerk-expo";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { Link, Redirect } from "expo-router";

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
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>Finfy</Text>
      </View>
      <View style={styles.buttons}>
        {isSignedIn && <Button onPress={() => signOut()}>Sign Out</Button>}
        <Link href="/create-budget">
          <Text>Create Budget</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
