import PropertyCard from "@/components/PropertyCard";
import SearchProperty from "@/components/SearchProperty";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResults = async ({ searchParams }) => {
  await connectDB();
  const { location, propertyType } = searchParams;

  // We'll have location pattern so whatever is typed in input field it would be able to search and match in either of fields of properties so we don't have to put separate filters.
  const locationPattern = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const results = await Property.find(query).lean();
  const properties = convertToSerializableObject(results);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchProperty />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href={"/properties"}
            className="flex items-center text-blue-500 hover:text-blue-600 mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to properties
          </Link>
        </div>

        <h1 className="text-2xl mb-4">Search Results</h1>
        {properties.length === 0 ? (
          <p>No relevant properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((item) => (
              <PropertyCard key={item._id} property={item} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default SearchResults;
