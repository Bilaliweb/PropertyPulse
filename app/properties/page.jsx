import PaginationComponent from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const Properties = async ({ searchParams: { page = 1, pageSize = 4 } }) => {
  /**
   * page -> Represents page number. i.e; By default page number would be 1
   * pageSize -> Represents the entities limit on page. i.e; 2 entities per page and so on
   */

  await connectDB();
  // Using lean() optimises query performance by returning plain javascript object instead of mongoose document.
  // It can be used for as long as we want our response read only and don't want to use mongoose methods.
  // const session = await getSessionUser();

  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  // Pagination should be shown if our total no. of documents is greater than pageSize
  const showPagination = total > pageSize;

  const properties = await Property.find({}).skip(skip).limit(pageSize);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>'No Properties found...'</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((item) => (
              <PropertyCard key={item._id} property={item} />
            ))}
          </div>
        )}
        {showPagination && (
          <PaginationComponent
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default Properties;
