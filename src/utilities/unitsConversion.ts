export default function unitsConversion(selectedUnits: "ml" | "oz", measure: number) {
    if (selectedUnits === "ml") {
        return measure;
    }
    return mlToOz(measure);
}

export function ozToMl(measure: number) {
    return Math.round(measure * 29.574);
}

function mlToOz(measure: number) {
    return Math.round(measure / 29.574);
}
