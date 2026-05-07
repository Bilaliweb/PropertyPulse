import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";

const Messages = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  // if(!sessionUser || !sessionUser.userId) {
  //     throw new Error("Session without id not allowed.");
  // }

  const readMessages = await Message.find({ receipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({ receipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((msgDoc) => {
    const message = convertToSerializableObject(msgDoc)
    message.sender = convertToSerializableObject(msgDoc?.sender)
    message.property = convertToSerializableObject(msgDoc?.property)

    return message;
  })

  return <section className="bg-blue-50">
    <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">
                Your Messages
            </h1>
            <div className="space-y-4">
                {messages.length === 0 ? (<p>No Messages found.</p>) : (<div>
                    {
                        messages.map((item) => (
                            <MessageCard key={item._id} message={item}/>
                        ))
                    }
                </div>)}
            </div>
        </div>
    </div>
  </section>;
};

export default Messages;
