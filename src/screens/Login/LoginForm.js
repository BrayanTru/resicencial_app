import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./LoginStyles";

export default function LoginForm({ onLogin, loading, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#B0B8BF"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#B0B8BF"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={22}
            color="#8DA1B9"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => onLogin(email, password)}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={onRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
