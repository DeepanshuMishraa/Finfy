import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  buttonContainer: {
    width: "100%",
  },
  googleButton: {
    backgroundColor: "#4285F4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
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
  },
});
