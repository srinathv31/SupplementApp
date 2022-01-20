import { IHandles } from "react-native-modalize/lib/options";

export interface WebModalProps {
    modalizeRef: React.RefObject<IHandles>, 
    url: string,
    modalHeight?: number,
    setModalizeRefStatus?: (m: boolean) => void
}
