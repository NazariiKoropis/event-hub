import { ref, get } from "firebase/database"
import { database } from "./../firebase/firebase"

export const getAllEvents = async () => {
    try {
        const eventsRef = ref(database, "events")

        const snapshot = await get(eventsRef)

        if (snapshot.exists()) {
            const data = snapshot.val()

            const eventsArray = Object.keys(data).map((key) => {
                return {
                    id: key,
                    ...data[key],
                }
            })
            return eventsArray
        } else {
            console.log("No data available")
            return []
        }
    } catch (error) {
        console.error("Error fetching events:", error)
        return []
    }
}


export const getEventById = async (id) => {
    try {

        const eventfRef = ref(database, `events/${id}`);

        const snapshot = await get(eventfRef);

        if (snapshot.exists()) {
            const data = snapshot.val()

            return { id: id, ...data };
        } else {
            console.log("No data available with this id")
            return null
        }

    } catch (error) {
        console.error("Error fetching event by id:", error)
        return null
    }
}