import { PageType } from "./AppTypes";
import User from "./User";

export interface GlobalProps {
    setUserData: (u: User) => void,
    userData: User,
    setPage: (p: PageType) => void,
    page: PageType,
}
