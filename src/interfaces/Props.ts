import User from "./User";

export interface GlobalProps {
    setUserData: (u: User) => void,
    userData: User,
}
