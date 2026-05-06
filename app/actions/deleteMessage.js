'use server';
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage (messageId) {
    await connectDB();
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    if(!sessionUser || !userId) {
        throw new Error("Session without id not allowed.");
    }

    const message = await Message.findById(messageId)

    if(message.recipient.toString() !== userId) {
        throw new Error("Un-authorised")
    }

    await message.deleteOne();
   revalidatePath('/', 'layout') 
}

export default deleteMessage;