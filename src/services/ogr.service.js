import { ref, get } from "firebase/database"
import { database } from "./../firebase/firebase"

export const getOrgNameById = async (id) => {
    try {
        const orgRef = ref(database, `users/${id}`);

        const snapshot = await get(orgRef);


        if (snapshot.exists()) {
            const data = snapshot.val()
            return data.displayName;
        } else {
            console.log("No data available with this id")
            return null
        }

    }
    catch (error) {
        console.error("Error fetching org by id:", error)
        return null
    }
}

