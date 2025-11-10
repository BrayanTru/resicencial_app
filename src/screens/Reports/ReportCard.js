import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Styles";

export default function ReportCard({ report }) {
  return (
    <View style={styles.card}>
      <Ionicons name="alert-circle-outline" size={28} color="#ee9738" style={styles.cardIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{report.title}</Text>
        <Text style={styles.cardDesc}>{report.description}</Text>
        <Text style={styles.cardMeta}>
          Prioridad: {report.priority} • Estado: {report.status.toUpperCase()}
        </Text>
        <Text style={styles.cardMeta}>
          {new Date(report.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
