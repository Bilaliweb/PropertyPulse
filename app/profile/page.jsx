import ProfilePropertiesListing from "@/components/ProfilePropertiesListing";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import Image from "next/image";
import Link from "next/link";

const Profile = async () => {
  await connectDB();
  const session = await getSessionUser();

  const { userId } = session;

  if (!userId) {
    throw new Error("User Id is required.");
  }

  console.log("Get user for profile: ", session);

  const userProperties = await Property.find({ owner: userId }).lean();
  console.log("User properties: ", userProperties);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={session.user.image}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {session.user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                {session.user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <ProfilePropertiesListing userProperties={userProperties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
