import axios from "axios";

const API = "http://192.168.80.13:4000";

// LOGIN 
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

// GET ALL APARTMENTS
export const getApartments = async (token) => {
  try {
    const res = await axios.get(`${API}/api/apartments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data; // ajusta si tu backend devuelve otra estructura
  } catch (err) {
    console.error("Error al obtener apartamentos:", err.response?.data || err.message);
    throw err.response?.data || { error: "Error de conexión" };
  }
};

// CREATE APARTMENT
export const createApartment = async (apartmentData, token) => {
  try {
    const res = await axios.post(`${API}/api/apartments`, apartmentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data; // para mostrar apartamento creado
  } catch (err) {
    console.error("Error al crear apartamento:", err.response?.data || err.message);
    throw err.response?.data || { error: "Error de conexión" };
  }
};

// EDITAR APARTAMENTO
export const updateApartment = async (id, apartmentData, token) => {
  try {
    const res = await axios.put(`${API}/api/apartments/${id}`, apartmentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (err) {
    console.error("Error al actualizar apartamento:", err.response?.data || err.message);
    throw err.response?.data || { error: "Error de conexión" };
  }
};

// ELIMINAR APARTAMENTO
export const deleteApartment = async (id, token) => {
  try {
    const res = await axios.delete(`${API}/api/apartments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error al eliminar apartamento:", err.response?.data || err.message);
    throw err.response?.data || { error: "Error de conexión" };
  }
};

export const createPayment = async (paymentData, token) => {
  try {
    const res = await axios.post(`${API}/api/payments`, paymentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { error: "Error de conexión" };
  }
};

export const getPayments = async (token, month) => {
  try {
    const res = await axios.get(
      `${API}/api/payments${month ? `?month=${month}` : ""}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { error: "Error de conexión" };
  }
};

export const registerPaymentAsPaid = async (paymentId, token) => {
  try {
    const res = await axios.put(
      `${API}/api/payments/${paymentId}/pay`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { error: "Error de conexión" };
  }
};

export const getUsers = async (token) => {
  try {
    const res = await axios.get(`${API}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.data; // ajusta si tu backend devuelve otra estructura
  } catch (err) {
    throw err.response?.data || { error: "Error de conexión" };
  }
};

export const getEvents = async (token) => {
  try {
    const res = await axios.get(`${API}/api/maintenance`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { error: "Error de conexión" };
  }
};

export const createEvent = async (payload, token) => {
  try {
    const res = await axios.post(`${API}/api/maintenance`, payload, { headers: { Authorization: `Bearer ${token}` } });
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { error: "Error de conexión" };
  }
};

// NUEVO: Eliminar mantenimiento por id
export const deleteEvent = async (id, token) => {
  try {
    const res = await axios.delete(`${API}/api/maintenance/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data; // Devuelve mensaje de éxito
  } catch (err) {
    throw err.response?.data || { error: "Error de conexión" };
  }
};

// Editar evento/mantenimiento
export const updateEvent = async (id, payload, token) => {
  try {
    const res = await axios.put(`${API}/api/maintenance/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { error: "Error de conexión" };
  }
};