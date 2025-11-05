import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./EventStyles";
import { AuthContext } from "../../context/AuthContext";
import { deleteEvent, updateEvent } from "../../services/api";
import EventForm from "./EventForm"; // El formulario para editar evento

export default function EventCard({ event, onEdit, onDeleted }) {
  const { token } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Iconos dinámicos según tipo
  let icon = "calendar-outline";
  let iconColor = "#2586b8";
  if (event.type && event.type.toLowerCase().includes("manten")) {
    icon = "build-outline";
    iconColor = "#ee9738";
  } else if (event.type && event.type.toLowerCase().includes("fiesta")) {
    icon = "beer-outline";
    iconColor = "#5c3eee";
  } else if (event.type && event.type.toLowerCase().includes("reuni")) {
    icon = "people-outline";
    iconColor = "#3eb063";
  }

  // Eliminar evento/mantenimiento
  const handleDelete = () => {
    Alert.alert(
      "¿Eliminar mantenimiento?",
      "Esta acción es irreversible.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: async () => {
            await deleteEvent(event.id, token);
            onDeleted && onDeleted();
          } }
      ]
    );
  };

  // Helper para fecha:
  const date = event.scheduledDate
    ? new Date(event.scheduledDate).toLocaleDateString()
    : "Sin fecha";

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onLongPress={() => setShowOptions(true)}
      >
        <Ionicons name={icon} size={30} color={iconColor} style={styles.cardIcon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <Text style={styles.cardDesc} numberOfLines={2}>{event.description}</Text>
          <Text style={styles.cardTypeDate}>
            {event.type ? event.type.toUpperCase() : "MANTENIMIENTO"} · {date}
          </Text>
          <Text style={styles.cardTypeDate}>
            Área: {event.area}
          </Text>
        </View>
      </TouchableOpacity>
      
      <Modal visible={showOptions} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.modalOptionBtn}
              onPress={() => { setShowEditForm(true); setShowOptions(false); }}
            >
              <Ionicons name="pencil" size={19} color="#004272" />
              <Text style={styles.modalOptionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOptionBtn, styles.modalOptionDanger]}
              onPress={() => { handleDelete(); setShowOptions(false); }}
            >
              <Ionicons name="trash" size={19} color="#bb3131" />
              <Text style={[styles.modalOptionText, { color: "#bb3131" }]}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowOptions(false)}>
              <Text style={styles.modalCloseBtn}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showEditForm && (
        <EventForm
          event={event}
          onClose={() => { setShowEditForm(false); onEdit && onEdit(); }}
          mode="edit"
        />
      )}
    </>
  );
}
