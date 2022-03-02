import { IHandles } from "react-native-modalize/lib/options";
import { AppProps } from "./Props";

export interface WebModalProps {
    modalizeRef: React.RefObject<IHandles>, 
    url: string,
    modalHeight?: number,
    setModalizeRefStatus?: (m: boolean) => void,
    index: number,
    setModalVisible: AppProps["setModalVisible"]
}
