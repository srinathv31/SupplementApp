import { PageType } from "./AppTypes";
import { SupplementMapObject } from "./Supplement";
import User from "./User";

export interface AppProps extends GlobalProps {
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
}

export interface GlobalProps {
    setUserData: (u: User) => void,
    userData: User,
    setPage: (p: PageType) => void,
    page: PageType,
}
