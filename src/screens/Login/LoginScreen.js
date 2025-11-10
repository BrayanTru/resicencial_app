import React, { useState } from "react";
import { View, Text, Alert, Linking, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoginForm from "./LoginForm";
import styles from "./LoginStyles";
import { login } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = React.useContext(AuthContext); // <--- Agregado setUser

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
      return;
    }
    try {
      setLoading(true);
      const data = await login(email, password);

      setToken(data.token);
      setUser(data.user); // <--- ESTO ES LO CRÍTICO: guardar el usuario completo

      const { user } = data;
      const { role } = user;
      let mensaje = "";

      switch (role) {
        case "admin":
          mensaje = `👨‍💼 Bienvenido, ${user.name}\nIngresaste como Administrador.\nGestiona el conjunto, los apartamentos y recibe notificaciones importantes.`;
          break;
        case "owner":
          mensaje = `🏠 ¡Bienvenido, ${user.name}!\nPropietario activo del conjunto.\nPuedes monitorear y administrar tu(s) apartamento(s) fácilmente.`;
          break;
        case "tenant":
          mensaje = `🧑‍💼 Hola ${user.name}, bienvenido(a) como Arrendatario.\nAquí podrás consultar tus pagos, reportar mantenimientos y acceder a tus notificaciones.`;
          break;
        case "airbnb_guest":
          mensaje = `🌎 ¡Bienvenido(a) ${user.name}!\nDisfruta tu experiencia como huésped.\nAccede a información de tu estadía y servicios del conjunto.`;
          break;
        default:
          mensaje = `Hola ${user.name}, tu rol no está reconocido.\nPor favor contacta a soporte.`;
      }

      Alert.alert("¡Acceso exitoso!", mensaje);

      setTimeout(() => {
        switch (role) {
          case "admin":
            navigation.replace("AdminDrawer");
            break;
          case "owner":
            navigation.replace("OwnerDrawer"); // <--- Asegúrate que sea "OwnerDrawer" y no "OwnerDashboard"
            break;
          case "tenant":
            navigation.replace("TenantDashboard");
            break;
          case "airbnb_guest":
            navigation.replace("AirbnbGuestDashboard");
            break;
          default:
            Alert.alert("Error", "Rol no reconocido");
        }
      }, 400);
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", err.error || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    Linking.openURL("https://tusitio-de-registro.com");
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="business" size={60} color="#004272" />
      </View>
      <Text style={styles.title}>Ingreso</Text>
      <Text style={styles.subtitle}>Conjunto Residencial</Text>
      <LoginForm
        onLogin={handleLogin}
        loading={loading}
        onRegister={handleRegister}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color="#004272"
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}
