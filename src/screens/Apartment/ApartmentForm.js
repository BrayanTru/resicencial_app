import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ApartmentStyles";
import { AuthContext } from "../../context/AuthContext";
import { updateApartment, createApartment } from "../../services/api";

export default function ApartmentForm({ onClose, apartment = null, mode = "create" }) {
  const { token } = useContext(AuthContext);
  const [number, setNumber] = useState(apartment?.number ?? "");
  const [tower, setTower] = useState(apartment?.tower ?? "");
  const [floor, setFloor] = useState(apartment?.floor?.toString() ?? "");
  const [type, setType] = useState(apartment?.type ?? "");
  const [status, setStatus] = useState(apartment?.status ?? "owner_occupied");

  const handleSubmit = async () => {
  try {
    const floorInt = parseInt(floor, 10);
    if (mode === "create") {
      await createApartment({ number, tower, floor: floorInt, type, status }, token);
    } else {
      await updateApartment(apartment.id, { number, tower, floor: floorInt, type, status }, token);
    }
    onClose();
  } catch (err) {
    // err puede ser un objeto ({error, ...}) o un string
    let msg = (
      err?.error ||
      err?.response?.data?.error || // error en data
      err?.toString() ||            // por si es string
      "No se pudo crear el apartamento. Por favor revisa los datos."
    );
    // Traducimos errores técnicos a lenguaje claro para usuarios:
    if (msg.includes("Ya existe un apartamento")) {
      msg = "Ya existe un apartamento registrado con ese número, torre y piso.";
    }
    if (msg.includes("El piso indicado no existe")) {
      msg = "El piso seleccionado no existe en esa torre.";
    }
    Alert.alert("¡Atención!", msg);
  }
};

  return (
    <Modal visible animationType="slide">
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Registrar apartamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Número"
          value={number}
          onChangeText={setNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Torre"
          value={tower}
          onChangeText={setTower}
        />
        <TextInput
          style={styles.input}
          placeholder="Piso"
          value={floor}
          keyboardType="number-pad"
          onChangeText={setFloor}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo (ej. familiar, estudio)"
          value={type}
          onChangeText={setType}
        />

        {/* Selección de estatus */}
        <View style={styles.statusSelector}>
          <Text
            style={status === "owner_occupied" ? styles.selectedStatus : styles.statusOption}
            onPress={() => setStatus("owner_occupied")}
          >
            Propio
          </Text>
          <Text
            style={status === "rented" ? styles.selectedStatus : styles.statusOption}
            onPress={() => setStatus("rented")}
          >
            Arrendado
          </Text>
          <Text
            style={status === "airbnb" ? styles.selectedStatus : styles.statusOption}
            onPress={() => setStatus("airbnb")}
          >
            Airbnb
          </Text>
        </View>
        <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
          <Ionicons name={mode === "edit" ? "pencil" : "save"} size={20} color="#fff" />
          <Text style={styles.formButtonText}>{mode === "edit" ? "Actualizar" : "Guardar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
