// Calculates age with a passed in Date Object
export default function getAge(birthday: Date) {
    const today = new Date();
    let thisYear = 0;
    if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
    } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
    }
    const age = today.getFullYear() - birthday.getFullYear() - thisYear;
    return age;
}
