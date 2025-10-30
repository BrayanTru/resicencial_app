import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import ApartmentForm from "./ApartmentForm";
import ApartmentCard from "./ApartmentCard";
import styles from "./ApartmentStyles";
import { getApartments } from "../../services/api";
import { AuthContext } from "../../context/AuthContext"; 

export default function ApartmentListScreen() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { token } = useContext(AuthContext);

  // Filtros
  const [filter, setFilter] = useState({ tower: "Todos", status: "Todos" });
  // Obtén torres únicas dinámicamente de la BD:
  const torreOptions = [
    { label: "Todas las Torres", value: "Todos" },
    ...[...new Set(apartments.map(a => a.tower))]
      .sort((a, b) => a - b)
      .map((t) => ({ label: `Torre ${t}`, value: t }))
  ];

  // Etiquetas de tipo en español
  const statuses = [
    { label: "Todos", value: "Todos" },
    { label: "Dueño", value: "owner_occupied" },
    { label: "Arrendado", value: "rented" },
    { label: "Airbnb", value: "airbnb" }
  ];

  useEffect(() => {
    if (token) fetchApartments();
  }, [token]);

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const data = await getApartments(token);
      setApartments(data);
    } catch (err) {
      console.error("Error al obtener apartamentos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Lógica de filtrado
  const filteredApartments = apartments.filter(a => {
    const byTower = filter.tower === "Todos" || a.tower === filter.tower;
    const byStatus = filter.status === "Todos" || a.status === filter.status;
    return byTower && byStatus;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apartamentos</Text>

      {/* Banner/Barra de filtros */}
      <View style={localStyles.filterContainer}>
        <RNPickerSelect
          placeholder={{ label: "Todas las Torres", value: "Todos" }}
          value={filter.tower}
          onValueChange={(value) => setFilter(current => ({ ...current, tower: value }))}
          items={torreOptions}
          style={{
            inputIOS: localStyles.pickerInput,
            inputAndroid: localStyles.pickerInput,
          }}
        />
      </View>
      
      <View style={localStyles.gridStatusBar}>
        {statuses.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              localStyles.gridStatusChip,
              filter.status === item.value && localStyles.selectedChip
            ]}
            onPress={() => setFilter(current => ({ ...current, status: item.value }))}
          >
            <Text style={{
              color: filter.status === item.value ? "#fff" : "#004272",
              fontWeight: "bold",
              textAlign: "center"
            }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#004272" />
      ) : (
        <FlatList
          data={filteredApartments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ApartmentCard
              apartment={item}
              onEdit={fetchApartments}
              onDeleted={fetchApartments}
            />
          )}
        />
      )}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setShowForm(true)}
      >
        <Ionicons name="add" size={22} color="#fff" />
        <Text style={styles.createButtonText}>Crear apartamento</Text>
      </TouchableOpacity>

      {showForm && (
        <ApartmentForm
          onClose={() => {
            setShowForm(false);
            fetchApartments();
          }}
        />
      )}
    </View>
  );
}

// Puedes poner este bloque en ApartmentStyles o aquí como localStyles
const localStyles = StyleSheet.create({
  filterContainer: {
    marginVertical: 10,
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  pickerInput: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#BBC7D0",
    borderRadius: 8,
    color: "#004272",
    backgroundColor: "#fff",
    marginBottom: 7,
  },
  gridStatusBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  gridStatusChip: {
    width: "24%",
    minWidth: 75,
    marginVertical: 4,
    marginHorizontal: 2,
    backgroundColor: "#e4ebf7",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedChip: {
    backgroundColor: "#004272",
  },
});
