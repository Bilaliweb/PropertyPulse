"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";

const MessageCard = ({ message }) => {
  const [formattedDate, setFormattedDate] = useState(null);
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    // This only runs on the client, avoiding the mismatch
    setFormattedDate(new Date(message.createdAt).toLocaleString());
  }, []);

  // Handler for Read button
  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    console.log("check read value: ", read);

    setIsRead(read);
    toast.success(`Message marked as ${read ? "read" : "new"}.`);
  };

  // Handler for Delete button
  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    toast.success("Message deleted successfully");
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {formattedDate}
        </li>
      </ul>

      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark as new" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
