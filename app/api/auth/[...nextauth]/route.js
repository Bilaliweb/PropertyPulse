import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

// Instance for Next Auth
const handler = NextAuth(authOptions);
// console.log("Check handler: ", handler)

// We can export our handler as per what request would be made
export { handler as GET, handler as POST }