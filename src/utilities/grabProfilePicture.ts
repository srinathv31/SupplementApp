import User from "../interfaces/User";

export default function grabProfilePicture(userData: User): string {
    return "../assets/images/"+userData.picture;
}
