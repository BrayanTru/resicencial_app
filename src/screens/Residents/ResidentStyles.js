import { StyleSheet } from "react-native";
export default StyleSheet.create ({
    container: { flex: 1, backgroundColor: "#f4f6f8", padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#004272" },
    filterBar: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
    filterBtn: { backgroundColor: "#e8ecf2", borderRadius: 14, paddingHorizontal: 15, paddingVertical: 8, marginHorizontal: 4 },
    filterBtnSelected: { backgroundColor: "#25b884" },
    filterText: { color: "#444", fontWeight: "bold", fontSize: 15 },
    filterTextSelected: { color: "#fff" },
    
    card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 1,
    },

    cardIcon: { marginRight: 14 },
    cardTitle: { fontWeight: "bold", color: "#004272", fontSize: 16 },
    cardSub: { color: "#4a6373", fontSize: 14 },
    cardType: { color: "#5f7796", fontWeight: "bold", fontSize: 13 },
    emptyText: { textAlign: "center", marginTop: 40, color: "#5f7796" },

    searchInput: {
    borderWidth: 1,
    borderColor: "#d5e0ec",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: "#f7fafd",
    },
})