import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#004272" },

  // Botón formulario principal
  formButton: {
    backgroundColor: "#004272",   // Morena institucional
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 6,
    width: "100%",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
  },
  formButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 7,
    letterSpacing: 1,
  },

  // Tarjeta de evento/lista
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: { marginRight: 14 },
  cardTitle: { fontWeight: "bold", color: "#2586b8", fontSize: 16 },
  cardDesc: { color: "#4a6373", fontSize: 14, marginTop: 2 },
  cardTypeDate: { color: "#8e92a1", marginTop: 7, fontWeight: "bold", fontSize: 13 },

  // Modal formulario
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.22)",
    justifyContent: "center",
    alignItems: "center",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "90%",
    maxWidth: 400,
    padding: 25,
    elevation: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 13,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2586b8",
    marginBottom: 18,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d5e0ec",
    borderRadius: 8,
    backgroundColor: "#f7fafd",
    padding: 10,
    width: "100%",
    fontSize: 15,
    marginBottom: 8,
  },
  // Botón cancelar en formularios
  cancelButton: {
    backgroundColor: "#e4ebf7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%", // para que coincida el ancho si es necesario
  },
  cancelButtonText: {
    color: "#004272",
    fontWeight: "600",
    fontSize: 15,
  },

  // Modal opciones (eliminar/editar)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.32)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: "center",
    elevation: 8,
  },
  modalOptionBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#e4ebf7",
    width: "100%",
    justifyContent: "center",
  },
  modalOptionText: {
    color: "#004272",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 7,
    letterSpacing: 0.4,
  },
  modalOptionDanger: {
    backgroundColor: "#fde6e6",
  },
  modalCloseBtn: {
    marginTop: 15,
    color: "#999",
    fontWeight: "bold",
    fontSize: 15,
  },

  // Otros estilos auxiliares
  emptyText: { textAlign: "center", marginTop: 40, color: "#5f7796" },
});
