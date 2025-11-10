import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Styles";
import { AuthContext } from "../../context/AuthContext";
import { createDamageReport } from "../../services/api";

// Puedes pasar apartmentId como prop si tu lógica lo requiere
export default function ReportForm({ onClose, apartmentId }) {
  const { token, user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = async () => {
    if (!title) {
      Alert.alert("Campos obligatorios", "Debes ingresar el título del daño.");
      return;
    }
    try {
      await createDamageReport(
        {
          title,
          description,
          priority,
          images: [],
        },
        token
      );
      Alert.alert(
        "¡Enviado!",
        "Tu reporte fue enviado correctamente al administrador."
      );
      onClose && onClose();
    } catch (err) {
      Alert.alert("Error", err.error || "No se pudo crear el reporte.");
    }
  };

  return (
    <Modal visible animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            <Ionicons name="alert-circle-outline" size={19} color="#ee9738" />{" "}
            Reportar daño o novedad
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Título (ej. Alcantarilla dañada)"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción (detalle del daño, ubicación...)"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          {/* Selector simple de prioridad */}
          <View
            style={{ flexDirection: "row", marginTop: 7, marginBottom: 12 }}>
            {["low", "medium", "high"].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.formButton,
                  {
                    backgroundColor: priority === p ? "#ee9738" : "#e4ebf7",
                    marginRight: 7,
                    paddingVertical: 5,
                    width: 65,
                  },
                ]}
                onPress={() => setPriority(p)}>
                <Text
                  style={{
                    color: priority === p ? "#fff" : "#004272",
                    fontWeight: "bold",
                    fontSize: 13,
                  }}>
                  {p === "low" ? "Baja" : p === "medium" ? "Media" : "Alta"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
            <Ionicons name="send" size={17} color="#fff" />
            <Text style={styles.formButtonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
