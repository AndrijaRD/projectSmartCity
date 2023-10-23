export type sensorsDataType = {
    active: boolean, 
    location: [number, number],
    id: number, 
    measurement: {
        [item: string]: string
    }
}
