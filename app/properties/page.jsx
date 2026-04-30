import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

const Properties = async () => {
  await connectDB();
  // Using lean() optimises query performance by returning plain javascript object instead of mongoose document.
  // It can be used for as long as we want our response read only and don't want to use mongoose methods.
  // const session = await getSessionUser();

  // const {userId} = session

  // if(!userId) {
  //   throw new Error("User Id is required.");
  // }

  const properties = await Property.find({}).lean(); 
  console.log("check props: ", properties)

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>'No Properties found...'</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((item) => (
              <PropertyCard key={item._id} property={item}/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
