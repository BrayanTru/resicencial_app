import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUsers } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import styles from "./ResidentStyles";

const RESIDENT_TYPES = [
  { key: "all", label: "Todos" },
  { key: "owner", label: "Dueño" },
  { key: "tenant", label: "Arrendatario" },
  { key: "airbnb_guest", label: "Airbnb" },
];

export default function ResidentListScreen() {
  const { token } = useContext(AuthContext);
  const [residents, setResidents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchResidents();
  }, [token]);

  const fetchResidents = async () => {
    setLoading(true);
    try {
      const data = await getUsers(token);
      setResidents(data);
    } catch (err) {
      Alert.alert("Error", err.error || "No se pudo obtener los residentes.");
    } finally {
      setLoading(false);
    }
  };

  // Actualización: filtrado compuesto
  const filteredResidents = residents.filter((r) => {
    const matchesRole = filter === "all" || r.role === filter;
    const matchesSearch = r.name.toLowerCase().includes(search.trim().toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Residentes del conjunto</Text>
      <View style={styles.filterBar}>
        {RESIDENT_TYPES.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[
              styles.filterBtn,
              filter === t.key && styles.filterBtnSelected
            ]}
            onPress={() => setFilter(t.key)}
          >
            <Text
              style={[
                styles.filterText,
                filter === t.key && styles.filterTextSelected
              ]}
            >{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#00628b" />
      ) : (
        <FlatList
          data={filteredResidents}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay residentes en esta categoría.</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Ionicons
                name={item.role === "owner" ? "person-circle" :
                      item.role === "tenant" ? "people-circle" : "home"}
                size={32}
                color={item.role === "owner" ? "#25b884" :
                      item.role === "tenant" ? "#e6c863" : "#009acf"}
                style={styles.cardIcon}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSub}>{item.email}</Text>
                <Text style={styles.cardType}>
                  {item.role === "owner"
                    ? "Dueño"
                    : item.role === "tenant"
                    ? "Arrendatario"
                    : "Airbnb"}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
