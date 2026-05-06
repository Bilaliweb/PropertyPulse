import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export const getSessionUser = async () => {
    const session = await getServerSession(authOptions)
    console.log("Get session: ", session)

    if (!session || !session.user) {
        return null
    }

    return {
        user: session.user,
        userId: session.user.id
    }
}