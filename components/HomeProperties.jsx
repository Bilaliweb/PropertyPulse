import properties from "@/properties.json";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

const HomeProperties = async () => {
  await connectDB();
  // const session = await getSessionUser();

  // const {userId} = session

  // if(!userId) {
  //   throw new Error("User Id is required.");
  // }
  const recentProperties = await Property.find({}).sort({createdAt: -1}).limit(3).lean();
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {recentProperties.length === 0 ? (
            <p>'No Properties found...'</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((item) => (
                <PropertyCard key={item._id} property={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-6 px-6">
        <Link
          href={"/properties"}
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View all properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
