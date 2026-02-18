import { ref, get } from "firebase/database"
import { database } from "../firebase/firebase"

export const getSystemStats = async () => {
    try {

        const [usersSnap, eventsSnap, bookingsSnap] = await Promise.all([
            get(ref(database, 'users')),
            get(ref(database, 'events')),
            get(ref(database, 'bookings'))
        ])

        const usersCount = usersSnap.exists() ? Object.keys(usersSnap.val()).length : 0

        const eventsData = eventsSnap.exists() ? Object.values(eventsSnap.val()) : []
        const eventsCount = eventsData.length

        const bookingsData = bookingsSnap.exists() ? Object.values(bookingsSnap.val()) : []

        let totalRevenue = 0
        let totalTicketsSold = 0

        bookingsData.forEach(booking => {

            if (booking.status === 'confirmed' || booking.status === 'completed' || booking.status === 'active') {
                totalRevenue += Number(booking.totalPrice) || 0
                totalTicketsSold += Number(booking.ticketCount) || 0
            }
        })

        const categoryStats = {}
        eventsData.forEach(event => {
            const cat = event.category || 'Other'

            categoryStats[cat] = (categoryStats[cat] || 0) + 1
        })

        return {
            usersCount,
            eventsCount,
            totalRevenue,
            totalTicketsSold,
            categoryStats
        }

    } catch (error) {
        console.error("Error fetching stats:", error)
        return null
    }
}