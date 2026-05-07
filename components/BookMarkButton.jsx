"use client";
import bookmarkProperty from "@/app/actions/bookMarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookMarkStatus";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const BookMarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    const getStatus = async () => {
      try {
        const status = await checkBookmarkStatus(property._id);

        if (status) {
          setIsBookMarked(status?.isBookmared);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    getStatus();
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("User not logged in");
    }

    try {
      const result = await bookmarkProperty(property?._id);

      if (result) {
        setIsBookMarked(result?.isBookmared);
        toast.success(result?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaSpinner className="mr-2" /> Loading Bookmark
        </button>
      </div>
    );
  }

  return isBookMarked ? (
    <div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        onClick={handleClick}
      >
        <FaBookmark className="mr-2" /> Remove Bookmark Property
      </button>
    </div>
  ) : (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        onClick={handleClick}
      >
        <FaRegBookmark className="mr-2" /> Bookmark Property
      </button>
    </div>
  );
};

export default BookMarkButton;
