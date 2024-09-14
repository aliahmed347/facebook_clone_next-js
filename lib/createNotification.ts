
import axios from "axios"
const CreateNotification = async ({ sender, receiver, status, group }: { sender: string, receiver: string, status: string, group?: string }) => {

    try {

        const { data } = await axios(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/Notification/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, data: {
                sender,
                receiver,
                status,
                group
            }
        })
        return data.notification
    } catch (error) {
        console.log("🚀 ~ CreateNotification ~ error:", error)

    }
}


export default CreateNotification