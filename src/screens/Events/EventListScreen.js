import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getEvents } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import EventForm from "./EventForm";
import EventCard from "./EventCard";
import styles from "./EventStyles";

export default function EventListScreen() {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents(token);
      setEvents(data);
    } catch (err) {
      Alert.alert("Error", err.error || "No se pudieron obtener los eventos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos & mantenimientos</Text>
      <TouchableOpacity style={styles.formButton} onPress={() => setShowForm(true)}>
        <Text style={styles.formButtonText}>
          <Ionicons name="add-circle-outline" size={18} color="#fff" /> Agregar evento
        </Text>
      </TouchableOpacity>
      {showForm && (
        <EventForm
          onClose={() => {
            setShowForm(false);
            fetchEvents();
          }}
        />
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#004272" />
      ) : (
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onEdit={fetchEvents}      // <- recarga tras editar
              onDeleted={fetchEvents}   // <- recarga tras eliminar
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay eventos registrados.</Text>}
        />
      )}
    </View>
  );
}
