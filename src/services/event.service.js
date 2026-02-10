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
