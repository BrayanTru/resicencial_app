import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView } from "react-native";
import styles from "./PaymentStyles";
import { AuthContext } from "../../context/AuthContext";
import { createPayment, getUsers, getApartments } from "../../services/api";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function PaymentForm({ onClose }) {
  const { token } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedApartment, setSelectedApartment] = useState("");
  const [users, setUsers] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState("Pago de administración");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchApartments();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers(token);
      setUsers(data);
    } catch (err) {}
  };

  const fetchApartments = async () => {
    try {
      const data = await getApartments(token);
      setApartments(data);
    } catch (err) {}
  };

  const handleSubmit = async () => {
    try {
      await createPayment(
        { userId: selectedUser, apartmentId: selectedApartment, amount, concept, dueDate },
        token
      );
      Alert.alert("¡Listo!", "Pago registrado exitosamente.");
      onClose && onClose();
    } catch (err) {
      const msg =
        err?.error ||
        err?.response?.data?.error ||
        err?.message ||
        "No se pudo crear el pago.";
      Alert.alert("Error", msg);
    }
  };

  return (
    <Modal visible animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            <Ionicons name="cash-outline" size={22} color="#00746a" /> Registrar pago de administración
          </Text>
          <ScrollView style={{width: "100%"}} keyboardShouldPersistTaps="handled">

            <Text style={styles.inputLabel}>Selecciona usuario</Text>
            <View style={[styles.input, { marginBottom: 10 }]}>
              <Picker
                selectedValue={selectedUser}
                onValueChange={setSelectedUser}
                style={{ width: "100%" }}
              >
                <Picker.Item label="Selecciona usuario..." value="" />
                {users.map(u => (
                  <Picker.Item
                    key={u.id}
                    label={`${u.name} (${u.email})`}
                    value={u.id}
                  />
                ))}
              </Picker>
            </View>

            <Text style={styles.inputLabel}>Selecciona apartamento</Text>
            <View style={[styles.input, { marginBottom: 10 }]}>
              <Picker
                selectedValue={selectedApartment}
                onValueChange={setSelectedApartment}
                style={{ width: "100%" }}
              >
                <Picker.Item label="Selecciona apartamento..." value="" />
                {apartments.map(a => (
                  <Picker.Item
                    key={a.id}
                    label={`Torre ${a.tower} #${a.number}`}
                    value={a.id}
                  />
                ))}
              </Picker>
            </View>

            <Text style={styles.inputLabel}>Monto</Text>
            <TextInput
              style={styles.input}
              placeholder="Monto a cobrar"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Concepto</Text>
            <TextInput
              style={styles.input}
              placeholder="Concepto (opcional)"
              value={concept}
              onChangeText={setConcept}
            />

            <Text style={styles.inputLabel}>Fecha de vencimiento</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={dueDate}
              onChangeText={setDueDate}
            />

            <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
              <Ionicons name="save" size={18} color="#fff" />
              <Text style={styles.formButtonText}>Registrar pago</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
