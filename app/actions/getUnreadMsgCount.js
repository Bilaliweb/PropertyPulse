'use server';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


async function getUnreadMessagesCount () {
    await connectDB()
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    if(!sessionUser || !userId) {
        throw new Error("Session without id not allowed.");
    }

    const count = await Message.countDocuments({
        recipient: userId,
        read: false
    });

    return { count };
}

export default getUnreadMessagesCount;