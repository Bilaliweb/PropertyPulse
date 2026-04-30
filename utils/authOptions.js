import connectDB from '@/config/database';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User';

export const authOptions = {
    // We can use as many provider as we want like; google, github etc. For now we are using Google.
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // We are adding authorisation to avoid auth to login using last signed in google account as we want to make it work for different accounts
            authorization: {
                // As per Next Auth Documentation
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    callbacks: {
        // 1. This will be invoked on successful sign in
        async signIn({ profile }) {
            console.log("Signing in....")
            /**
             * 1. Connect to database
             * 2. Check if user exists
             * 3. If user doesn't exists, create it
             * 4. Return true to allow sign in
             */
            await connectDB();
            console.log("DB connected...")
            const userExists = await User.findOne({ email: profile.email })
            console.log("User exists or not: ", userExists);

            if (!userExists) {
                // Truncate the username if name is too long
                const username = profile.name.slice(0, 25); // Limited to max 20 characters

                const newUser = await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
                console.log("New created user: ", newUser)
            }

            return true;

        },

        // 2. This will be used for modifying the session object
        async session({ session }) {
            /**
             * 1. Get the user from the database
             * 2. Assign user id from the session
             * 3. Return the session
             */
            console.log("Check session for login: ", session)
            const user = await User.findOne({email: session.user.email})
            console.log("User for session exists: ", user);
            session.user.id = user._id.toString()
            return session
        }
    }
}