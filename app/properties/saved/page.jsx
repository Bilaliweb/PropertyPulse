import PropertyCard from "@/components/PropertyCard";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedProperties = async () => {
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
    console.log("User id for bookmark: ", userId);

    if(!sessionUser || !userId) {
        throw new Error("Session without id not allowed.");
    }

    // Used populate so that we get the whole property object instead of just user id from user model
    const {bookMarks} = await User.findById(userId).populate('bookMarks')
    console.log("Book marks : ", bookMarks)

    return (
        <section className="px-4 py-6">
            <div className="container lg:container m-auto px-4 py-6">
                <h1 className="text-2xl mb-4">
                    Saved Properties
                </h1>
                {
                    bookMarks.length === 0 ? (
                    <p>No Svaed Properties to show...</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bookMarks.map((item) => (
                        <PropertyCard key={item._id} property={item} />
                    ))}
                </div>
                )
                }
            </div>
        </section>
    )
}

export default SavedProperties;