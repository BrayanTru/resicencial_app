import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./PaymentStyles";

export default function CardPayment({ payment, onPay }) {
  const getStatusColor = (status) => {
    if (status === "paid") return "#39c079";
    if (status === "pending") return "#eac73f";
    if (status === "late") return "#ed4b4b";
    return "#4a6373";
  };

  return (
    <View style={styles.card}>
      <Ionicons
        name={
          payment.status === "paid"
            ? "checkmark-circle"
            : payment.status === "pending"
            ? "alert-circle"
            : "close-circle"
        }
        size={26}
        color={getStatusColor(payment.status)}
        style={styles.cardIcon}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>
          {payment.apartment
            ? `Torre ${payment.apartment.tower}, Apto ${payment.apartment.number}`
            : "Sin apartamento"}
        </Text>
        <Text style={styles.cardDesc}>
          {payment.user?.name || "Usuario"} — {payment.concept}
        </Text>
        <Text style={styles.cardStatus}>
          {payment.status === "paid"
            ? "AL DÍA"
            : payment.status === "pending"
            ? "PENDIENTE"
            : "MORA"}
          {" · Vence: "}
          {payment.dueDate
            ? new Date(payment.dueDate).toLocaleDateString()
            : "N/A"}
        </Text>
      </View>
      <Text style={[styles.cardAmount, { color: getStatusColor(payment.status) }]}>
        ${payment.amount.toLocaleString()}
      </Text>
      {(payment.status === "pending" || payment.status === "late") && (
        <TouchableOpacity style={styles.payBtn} onPress={() => onPay(payment.id)}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Registrar pago</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
