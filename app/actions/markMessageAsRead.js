'use server';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead (messageId) {
    await connectDB()
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
    console.log("User id for bookmark: ", userId);

    if(!sessionUser || !userId) {
        throw new Error("Session without id not allowed.");
    }

    const message = await Message.findById(messageId);

    if(!message) {
        throw new Error('Message not found')
    }

    // Verify ownership
    if(message.recipient.toString() !== userId) {
        throw new Error('Un-authorized')
    }

    // Set read value as dynamic so can be set to true from flase and false from true
    message.read = !message.read
    revalidatePath('/messages', 'page')

    await message.save()

    return message.read;
}

export default markMessageAsRead;