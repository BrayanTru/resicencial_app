import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AdminDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="business" size={52} color="#004272" style={styles.icon} />
        <Text style={styles.title}>Panel del Administrador</Text>
        <Text style={styles.subtitle}>Gestión completa del conjunto</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.widget}>
          <Ionicons name="people-outline" size={32} color="#004272" />
          <Text style={styles.widgetLabel}>Residentes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.widget}
          onPress={() => navigation.navigate("ApartmentList")}
        >
          <Ionicons name="archive-outline" size={32} color="#004272" />
          <Text style={styles.widgetLabel}>Apartamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.widget}>
          <Ionicons name="cash-outline" size={32} color="#004272" />
          <Text style={styles.widgetLabel}>Pagos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={25} color="#008bb0" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.cardTitle}>Últimas novedades</Text>
          <Text style={styles.cardText}>
            Próximamente: reportes, estadísticas, notificaciones…
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8", padding: 22 },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  icon: {
    backgroundColor: "#e4ebf7",
    borderRadius: 24,
    padding: 8,
    marginBottom: 10,
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#004272", marginBottom: 4 },
  subtitle: { fontSize: 17, color: "#5f7796", marginBottom: 22 },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 40,
    marginHorizontal: 10,
  },
  widget: {
    backgroundColor: "#fff",
    borderRadius: 14,
    alignItems: "center",
    padding: 18,
    width: 100,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 6,
  },
  widgetLabel: {
    marginTop: 7,
    color: "#004272",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#e9f2f6",
    borderRadius: 10,
    alignItems: "center",
    padding: 16,
    marginTop: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  cardTitle: {
    color: "#008bb0",
    fontWeight: "bold",
    fontSize: 15,
  },
  cardText: {
    color: "#4a6373",
    fontSize: 13,
    marginTop: 2,
  },
});
