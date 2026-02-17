import { ref, set, push } from "firebase/database"
import { database } from "./../firebase/firebase"

export const createRequest = async (data) => {
    try {
        const requestRef = ref(database, "requests");
        const newRequestRef = push(requestRef);

        await set(newRequestRef, {
            ...data
        })
        return newRequestRef.key

    } catch (error) {
        console.error("Error creating request:", error)
        return null
    }
}