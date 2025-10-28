import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { login } from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
    return;
  }

  try {
      setLoading(true);
      const data = await login(email, password);

      const { user } = data;
      const { role } = user;

      Alert.alert("Bienvenido", `Hola ${user.name} (${role})`);
      console.log("Token JWT:", data.token);

      // 🔹 Redirección por rol
      switch (role) {
        case "admin":
          navigation.replace("AdminDashboard");
          break;
        case "owner":
          navigation.replace("OwnerDashboard");
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
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", err.error || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    // Abre la página web de registro
    Linking.openURL("https://tusitio-de-registro.com"); // 🔗 cámbialo por tu URL real
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingreso - Conjunto Residencial</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginBottom: 20 }}
        />
      ) : (
        <Button title="Iniciar sesión" onPress={handleLogin} />
      )}

      {/* Bloque estético para el registro */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
   passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  registerText: {
    color: "#333",
    fontSize: 15,
  },
  registerButton: {
    backgroundColor: "#75ade9ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
