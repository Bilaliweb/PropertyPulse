'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const bookmarkProperty = async (propertyId) => {
    await connectDB();

    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    if(!sessionUser || !userId) {
        throw new Error("Session without id not allowed.");
    }

    const user = await User.findById(userId)
    let isBookmared = user.bookMarks.includes(propertyId)

    let message = ''

    if (isBookmared) {
        user.bookMarks.pull(propertyId)
        message = 'Bookmark removed'
        isBookmared = false
    }
    else {
        user.bookMarks.push(propertyId)
        message = 'Bookmark added'
        isBookmared = true 
    }

    await user.save()
    revalidatePath('/properties/saved', 'page')

    return {
        message,
        isBookmared
    }
}

export default bookmarkProperty;