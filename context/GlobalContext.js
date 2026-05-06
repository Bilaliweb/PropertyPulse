'use client';
import getUnreadMessagesCount from "@/app/actions/getUnreadMsgCount";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react"

// Create context
const GlobalContext = createContext()

// Create Provider and whole app will be wrapped in it
export function GlobalProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0);
    const { data: session } = useSession()

    useEffect(() => {
        if (session && session.user) {
            const getCount = async () => {
                try {
                    const result = await getUnreadMessagesCount()
                    setUnreadCount(result.count)
                } catch (error) {
                    throw new Error(error)
                }
            }
            getCount()
        }
    }, [getUnreadMessagesCount, session])

    // Whatever is passed in value prop can be destructured in any other component utilising following function. (useGlobalContext)
    return (
        <GlobalContext.Provider value={{
            unreadCount,
            setUnreadCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}