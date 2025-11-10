import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const actions = [
  {
    key: "reports",
    label: "Reportes",
    icon: "document-text-outline",
    onPress: (navigation) => navigation.navigate("ReportListScreen"),
  },
  {
    key: "notifications",
    label: "Notificaciones",
    icon: "notifications-outline",
    onPress: (navigation) => navigation.navigate("OwnerNotificationScreen"),
  },
];

export default function OwnerDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="home" size={52} color="#008bb0" style={styles.icon} />
        <Text style={styles.title}>Panel del Propietario</Text>
        <Text style={styles.subtitle}>Tus reportes y notificaciones</Text>
      </View>

      {/* Carrusel horizontal de tarjetas (igual que el admin) */}
      <FlatList
        data={actions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.carouselContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.widget}
            onPress={() => item.onPress(navigation)}
            activeOpacity={0.75}
          >
            <Ionicons name={item.icon} size={32} color="#008bb0" />
            <Text
              style={styles.widgetLabel}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={25} color="#2586b8" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.cardTitle}>Consejos y novedades</Text>
          <Text style={styles.cardText}>
            Recuerda reportar cualquier novedad y revisar tus notificaciones.
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
  title: { fontSize: 26, fontWeight: "bold", color: "#008bb0", marginBottom: 4 },
  subtitle: { fontSize: 17, color: "#5f7796", marginBottom: 22 },

  carouselContainer: {
    paddingVertical: 18,
    paddingLeft: 6,
  },
  widget: {
    backgroundColor: "#fff",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    minWidth: 120,
    maxWidth: 140,
    marginRight: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  widgetLabel: {
    marginTop: 7,
    color: "#008bb0",
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
    color: "#2586b8",
    fontWeight: "bold",
    fontSize: 15,
  },
  cardText: {
    color: "#4a6373",
    fontSize: 13,
    marginTop: 2,
  },
});
