import axios from "axios";

const API = "http://192.168.80.13:4000"; 

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API}/api/auth/login`, { email, password });
    // el backend devuelve los datos en res.data.data
    return res.data.data;
  } catch (err) {
    console.error("Error en login:", err.response?.data || err.message);
    throw err.response?.data || { error: "Error de conexión" };
  }
};
