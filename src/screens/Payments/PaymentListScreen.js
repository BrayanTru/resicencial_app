import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { getPayments, registerPaymentAsPaid } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import PaymentCard from "./CardPayment";
import styles from "./PaymentStyles";
import PaymentForm from "./PaymentForm";

export default function PaymentListScreen() {
  const { token } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, [token]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await getPayments(token);
      setPayments(data);
    } catch (err) {
      Alert.alert("Error", err.error || "No se pudo obtener los pagos.");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (paymentId) => {
    try {
      await registerPaymentAsPaid(paymentId, token);
      Alert.alert("¡Listo!", "Pago registrado como realizado.");
      fetchPayments();
    } catch (err) {
      const msg =
        err?.error || err?.response?.data?.error || err?.message || "Error al registrar pago.";
      Alert.alert("Error", msg);
    }
  };

  return (
  <View style={styles.container}>
    <Text style={styles.title}>Pagos de administración</Text>
    <TouchableOpacity style={styles.formButton} onPress={() => setShowForm(true)}>
      <Text style={styles.formButtonText}>Agregar pago</Text>
    </TouchableOpacity>

    {showForm && (
      <PaymentForm
        onClose={() => {
          setShowForm(false);
          fetchPayments(); // recarga datos al cerrar el modal/formulario
        }}
      />
    )}

    {loading ? (
      <ActivityIndicator size="large" color="#004272" />
    ) : (
      <FlatList
        data={payments}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay pagos registrados este mes.</Text>
        }
        renderItem={({ item }) => (
          <PaymentCard payment={item} onPay={handlePay} />
        )}
      />
    )}
  </View>
);
}
