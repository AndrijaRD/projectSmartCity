export const api = "http://localhost:4001"

// Air Measurements Dictionary
// Measurements and there english and serbian names + there unit of measurement
export const AMD: { type: string, srb: string, unit: string }[] = [
    { type: "humidity", srb: "Vlaznost", unit: "%" },
    { type: "wind", srb: "Brzina Vetra", unit: "m/s" },
    { type: "gas", srb: "Gasovi", unit: "ppm" },
    { type: "methan", srb: "Metan", unit: "ppm" },
    { type: "radiation", srb: "Radiacija", unit: "µSv/h" },
    { type: "particles", srb: "Toksicne Cestice", unit: "µg/m³" }
]

// Week days shot form
export const weekDays: string[] = [ "Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned" ]

// What type of weathers are available
export const forecastTypes: string[] = [ "Suncano", "Oblacno", "Kisovito" ]