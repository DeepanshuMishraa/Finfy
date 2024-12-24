// app/(app)/_layout.tsx
import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AppLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-budget"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
