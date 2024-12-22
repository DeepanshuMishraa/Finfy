import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { Platform, TouchableOpacity, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

type Props = {
  strategy: string;
  children: React.ReactNode;
};

WebBrowser.maybeCompleteAuthSession();

export default function OAuthButton({ strategy, children }: Props) {
  React.useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      if (Platform.OS !== "android") return;

      void WebBrowser.coolDownAsync();
    };
  }, []);

  const { startOAuthFlow } = useOAuth({ strategy });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/", { scheme: "myapp" }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
