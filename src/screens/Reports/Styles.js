import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#004272" },

  // Botón principal (crear o enviar reporte)
  formButton: {
    backgroundColor: "#2586b8",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 14,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  formButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    marginLeft: 7,
  },

  // Modal y formulario
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
    color: "#ee9738", // color institucional para reportes de daño
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
  cancelButton: {
    backgroundColor: "#e4ebf7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  cancelButtonText: {
    color: "#004272",
    fontWeight: "600",
    fontSize: 15,
  },

  // Tarjeta individual del reporte
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
  cardTitle: { fontWeight: "bold", color: "#ee9738", fontSize: 16 },
  cardDesc: { color: "#4a6373", fontSize: 14, marginTop: 2 },
  cardMeta: { color: "#8e92a1", marginTop: 7, fontWeight: "bold", fontSize: 13 },

  emptyText: { textAlign: "center", marginTop: 40, color: "#5f7796" },
});
