import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ApartmentStyles";
import { AuthContext } from "../../context/AuthContext";
import { updateApartment, deleteApartment } from "../../services/api";
import ApartmentForm from "./ApartmentForm";

export default function ApartmentCard({ apartment, onEdit, onDeleted }) {
  const { token } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      "¿Eliminar apartamento?",
      "Esta acción es irreversible.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: async () => {
          await deleteApartment(apartment.id, token);
          onDeleted && onDeleted();
        } }
      ]
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onLongPress={() => setShowOptions(true)}
      >
        <Ionicons
          name={
            apartment.status === "owner_occupied"
              ? "person-circle-outline"
              : apartment.status === "rented"
              ? "home-outline"
              : "airplane-outline"
          }
          size={28}
          color="#004272"
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.apartmentLabel}>Apto. {apartment.number} - Torre {apartment.tower}</Text>
          <Text style={styles.apartmentSubLabel}>Piso {apartment.floor} • {apartment.status.replace("_", " ")}</Text>
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
        <ApartmentForm
          apartment={apartment}
          onClose={() => { setShowEditForm(false); onEdit && onEdit(); }}
          mode="edit"
        />
      )}
    </>
  );
}
