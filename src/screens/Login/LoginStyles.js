import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#F4F6F8",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#004272",
    textAlign: "center",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "#5f7796",
    textAlign: "center",
    marginBottom: 34,
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#BBC7D0",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    color: "#1a1a1a",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BBC7D0",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 22,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1a1a1a",
  },
  loginButton: {
    backgroundColor: "#004272",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  registerText: {
    color: "#7688a2",
    fontSize: 16,
  },
  registerButton: {
    marginLeft: 10,
  },
  registerButtonText: {
    color: "#004272",
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
