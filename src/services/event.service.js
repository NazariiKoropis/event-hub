import { ref, get, update, push, set } from "firebase/database"
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

export const getEventByOrgId = async (id) => {
    try {
        const eventsRef = ref(database, `events/`);
        const snapshot = await get(eventsRef);
        if (snapshot.exists()) {
            const data = snapshot.val()

            const eventsArray = Object.keys(data).map((key) => {
                return {
                    id: key,
                    ...data[key],
                }
            })
            const filteredEvents = eventsArray.filter((event) => event.organizerId === id)
            return filteredEvents
        } else {
            console.log("No data available")
            return []
        }

    } catch (error) {
        console.error("Error fetching event by org id:", error)
        return []
    }
}

export const editEventById = async (id, data) => {
    try {
        const eventRef = ref(database, `events/${id}`)
        await update(eventRef, {
            ...data
        })
        return id
    } catch (error) {
        console.error("Error editing event:", error)
        return null
    }
}

export const addEvent = async (data) => {
    try {
        const eventRef = ref(database, `events/`)

        const newEventRef = push(eventRef)
        await set(newEventRef, {
            ...data,
            soldTickets: 0,
            status: 'active'
        })

        return newEventRef.key
    } catch (error) {
        console.error("Error creating event:", error)
        return null
    }
}