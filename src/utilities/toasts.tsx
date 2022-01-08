// Source Imports
import Toast from "react-native-toast-message";
import Supplement from "../interfaces/Supplement";

export const showAddToast = (item: Supplement, daySelected: string) => {
	Toast.show({
		type: "success",
		text1: `Added ${item.name} to ${daySelected}`,
		visibilityTime: 4000
	});
};
