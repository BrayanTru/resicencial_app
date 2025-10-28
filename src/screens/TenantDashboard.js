import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TenantDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍👩‍🦱 Panel del Arrendatario</Text>
      <Text style={styles.subtitle}>Consulta de pagos y reportes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#555", marginTop: 10 },
});
