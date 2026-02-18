import { get, ref, set, push, update } from "firebase/database"
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

export const getAllRequests = async () => {

    try {
        const requestsRef = ref(database, "requests")

        const snapshot = await get(requestsRef)

        if (snapshot.exists()) {
            const data = snapshot.val()

            const formattedRequests = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))

            return formattedRequests
        } else {
            console.log("No requests data available")
            return []
        }

    } catch (error) {
        console.error("Error fetching requests:", error)
        return []
    }

}

export const approveRequest = async (request) => {
    try {
        const updates = {};

        updates[`/requests/${request.id}/status`] = 'approved';

        updates[`/users/${request.userId}/role`] = 'organization';

        await update(ref(database), updates);
        return true;
    } catch (error) {
        console.error("Error approving:", error);
        return false;
    }
}


export const rejectRequest = async (requestId) => {
    try {
        const reqRef = ref(database, `requests/${requestId}`);
        await update(reqRef, { status: 'rejected' });
        return true;
    } catch (error) {
        console.error("Error rejecting:", error);
        return false;
    }
}