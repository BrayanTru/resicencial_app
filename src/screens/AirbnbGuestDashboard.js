import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AirbnbGuestDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛏️ Panel Airbnb</Text>
      <Text style={styles.subtitle}>Información de tu estancia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#555", marginTop: 10 },
});
