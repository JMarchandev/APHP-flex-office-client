export function constructEventObject(data) {
    let object = [];

    for (let i = 0; i < data.length; i++) {
        let constructObject = {
            title: data[i].room.roomIdentifier,
            start: data[i].eventDate,
            end: data[i].eventDate,
            allDay: true,
            ressource: {
                event: data[i]
            }
        }
        object.push(constructObject)
    }
    return object
}