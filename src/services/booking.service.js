import { ref, get, push, set } from "firebase/database"
import { database } from "../firebase/firebase"

export const getBookingsByUserID = async (userId) => {
    try {
        const ticketsRef = ref(database, 'bookings')

        const snapshot = await get(ticketsRef)

        if (snapshot.exists()) {
            const data = snapshot.val()

            const formattedTickets = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))

            const userTickets = formattedTickets.filter((ticket) => ticket.userId === userId);

            return userTickets
        } else {
            console.log("No bookings data available")
            return []
        }

    } catch (error) {
        console.error("Error fetching tickets:", error)
        return []
    }
}

export const createBooking = async (data) => {
    try {
        const bookingRef = ref(database, "bookings");
        const newBookingRef = push(bookingRef);

        await set(newBookingRef, {
            ...data
        })
        return newBookingRef.key

    } catch (error) {
        console.error("Error creating booking:", error)
        return null
    }
}