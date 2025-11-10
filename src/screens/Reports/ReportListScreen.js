import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getMyReports } from "../../services/api";
import ReportCard from "./ReportCard";
import ReportForm from "./ReportForm";
import styles from "./Styles";
import { AuthContext } from "../../context/AuthContext";

export default function ReportListScreen() {
  const { token } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getMyReports(token);
      setReports(data);
    } catch (err) {
      Alert.alert("Error", err.error || "No se pudieron obtener los reportes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reportes de daño</Text>
      <TouchableOpacity style={styles.formButton} onPress={() => setShowForm(true)}>
        <Ionicons name="add-circle-outline" size={18} color="#fff" />
        <Text style={styles.formButtonText}>Crear reporte</Text>
      </TouchableOpacity>
      {showForm && (
        <ReportForm
          onClose={() => {
            setShowForm(false);
            fetchReports();
          }}
        />
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#2586b8" />
      ) : (
        <FlatList
          data={reports}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ReportCard report={item} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay reportes aún.</Text>}
        />
      )}
    </View>
  );
}
