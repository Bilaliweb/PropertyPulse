// For server specific files to use server functions we have to write 'use server'
'use server'
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage (previousState, formData) {

    await connectDB();

    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    if(!sessionUser || !sessionUser.userId) {
        throw new Error("Session without id not allowed.");
    }

    const recipient = formData.get('recipient')

    if (userId === recipient) {
        return {
            error: 'You cannot send message to yourself.'
        }
    }

    const newMessage = new Message({
        sender: userId,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('message'),
    })

    await newMessage.save()

    return {
        submitted: true
    }
}

export default addMessage;