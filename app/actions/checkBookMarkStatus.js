'use server';

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";


async function checkBookmarkStatus (propertyId) {
    await connectDB()
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
    console.log("User id for bookmark: ", userId);

    if(!sessionUser || !userId) {
        throw new Error("Session without id not allowed.");
    }

    const user = await User.findById(userId)
    let isBookmared = user.bookMarks.includes(propertyId)

    return {
        isBookmared
    }
}

export default checkBookmarkStatus;