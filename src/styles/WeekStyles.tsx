import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    modalView: {
        width: "110%",
        height: "85%",
        margin: 20,
        backgroundColor: "#0B172A",
        borderRadius: 20,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        margin: 10,
        elevation: 2,
        width: 125,
        alignSelf: "center"
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        textDecorationLine: "underline",
        color: "white",
        fontSize: 20
    },
    ListItem: {
        textAlign: "center",
        padding: 10,
        margin: 10,
        width: "95%",
        color: "white",
        borderBottomColor: "white",
        borderBottomWidth: 1,
        overflow:"hidden",
        flexDirection: "row",
		
    },
    SuppItem: {
        textAlign: "center",
        padding: 5,
        margin: 5,
        width: "95%",
        color: "white",
        borderRadius: 10,
        overflow:"hidden",
        flexDirection: "row",
    },
    ListName: {
        fontSize: 18,
        fontWeight: "600",
        color: "white"
    },
    IconPadding: {
        padding: 1,
        margin: 1,
        fontSize: 18,
        color: "white"
    },
    IconWeek: {
        padding: 1,
        margin: 1,
        fontSize: 18,
        color: "white",
        alignSelf: "center"
    },
    IconDrag: {
        padding: 0,
        margin: 0,
        fontSize: 20,
        color: "white",
        alignSelf: "center"
    }
});
