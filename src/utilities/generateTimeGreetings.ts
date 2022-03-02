import convertDateTimeToStringTime from "./convertTime";

function grabTime() {
    const day = new Date();
    const time = convertDateTimeToStringTime(day);
    return time;
}

export function generateGreeting() {
    let time = grabTime();
    let greeting = "Hello, ";
    if (time.length === 7) {
        time = "0"+time;
    }
    // If it is 12AM/PM say Hello
    if (time.substring(0,2) === "12"){
        return greeting;
    }

    // After 3AM - 10AM say Good Morning
    if (time.substring(6,7) === "A"){
        if (time.substring(0,2) > "03" && time.substring(0,2) < "11"){
            greeting = "Good Morning, ";
        }
    }

    // 1PM - 5PM say Good Afternoon
    if (time.substring(6,7) === "P"){
        if (time.substring(0,2) < "05"){
            greeting = "Good Afternoon, ";
        }
    }

    // 5PM - 8PM say Good Evening
    if (time.substring(6,7) === "P"){
        if (time.substring(0,2) > "04" && time.substring(0,2) < "08"){
            greeting = "Good Evening, ";
        }
    }

    return greeting;
}

export function generateLoginPeriod() {
    let time = grabTime();
    let greeting = "Hello";
    if (time.length === 7) {
        time = "0"+time;
    }

    // 3AM - 7AM Early Bird achievement
    if (time.substring(6,7) === "A"){
        if (time.substring(0,2) > "03" && time.substring(0,2) < "07"){
            greeting = "Bird";
        }
    }

    // 1AM - 3AM Night Owl achievement
    if (time.substring(6,7) === "A"){
        if (time.substring(0,2) > "00" && time.substring(0,2) < "04"){
            greeting = "Owl";
        }
    }

    return greeting;
}
