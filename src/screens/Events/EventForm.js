import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { createEvent, updateEvent } from "../../services/api";
import styles from "./EventStyles";
import { Ionicons } from "@expo/vector-icons";

export default function EventForm({ onClose, event, mode = "create", onUpdated }) {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [type, setType] = useState("");

  // ESTO ES LO QUE FALTABA
  useEffect(() => {
    if (mode === "edit" && event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setArea(event.area || "");
      setEventDate(event.scheduledDate ? event.scheduledDate.split('T')[0] : "");
      setType(event.type || "");
    }
    if (mode !== "edit") {
      setTitle(""); setDescription(""); setArea(""); setEventDate(""); setType("");
    }
  }, [event, mode]);

  const handleSubmit = async () => {
    if (!title || !area) {
      Alert.alert("Campos obligatorios", "Debes ingresar el título y el área.");
      return;
    }
    try {
      if (mode === "edit" && event) {
        // Usar updateEvent en modo edición
        await updateEvent(event.id, {
          title, description, area, scheduledDate: eventDate, type
        }, token);
        Alert.alert("¡Listo!", "Mantenimiento editado correctamente.");
        onUpdated && onUpdated();
      } else {
        // Crear uno nuevo
        await createEvent({
          title, description, area, scheduledDate: eventDate, type
        }, token);
        Alert.alert("¡Listo!", "Mantenimiento registrado correctamente.");
      }
      onClose && onClose();
    } catch (err) {
      Alert.alert("Error", err.error || "No se pudo guardar el mantenimiento.");
    }
  };

  return (
    <Modal visible animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            <Ionicons name="build-outline" size={18} color="#2586b8" />
            {mode === "edit" ? " Editar mantenimiento" : " Registrar mantenimiento"}
          </Text>
          <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} multiline />
          <TextInput style={styles.input} placeholder="Área (piscina, parque, etc.)" value={area} onChangeText={setArea} />
          <TextInput style={styles.input} placeholder="Fecha (YYYY-MM-DD)" value={eventDate} onChangeText={setEventDate} />
          <TextInput style={styles.input} placeholder="Tipo (mantenimiento, fiesta, etc)" value={type} onChangeText={setType} />
          <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
            <Text style={styles.formButtonText}>{mode === "edit" ? "Guardar cambios" : "Guardar"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
