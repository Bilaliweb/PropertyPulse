/**
 * There is a term known as 'Catch all routes' which means whatever the endpoint is added after the id, same content will be shown
 * from this file.
 * For this we have to rename the folder as: [...id] -> /properties/${id}/${extended end points}
 * i.e: /properties/50/hi/test/world/nice
 */

import BookMarkButton from "@/components/BookMarkButton";
import ContactForm from "@/components/ContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

/**
 * Utilising default SSR component as CSR using 'use client'.
 * There are several hooks from Next.js navigation such as:
 * 1. useRouter
 */
// 'use client'

// import { useRouter, useParams, useSearchParams, usePathname } from "next/navigation";

// const PropertyDetailPage = () => {
//     /**
//      * useRouter provides us various methods we can utilise to perform on our page.
//      */
//     const router = useRouter();
//     console.log("router: ", router);
//     // Example usage:
//     // return (
//     //     <div>
//     //         <h1 className="text-2xl">Properties Detail Page</h1>
//     //         <button onClick={() => router.replace('/')}>Go To Home</button>
//     //     </div>
//     // )

//     /**
//      * useParams is used for getting the params from the URL.
//      * This will be the object with the property as our folder name.
//      * In our case it would be id. i.e: params.id
//      */
//     const params = useParams();
//     console.log("params: ", params);
//     // Example usage:
//     // return (
//     //     <div>
//     //         <h1 className="text-2xl">Properties Detail Page {params.id}</h1>
//     //     </div>
//     // )

//     /**
//      * useSearchParams is used to get the value of specific param from the URL
//      * by utilising built-in methods from this hook.
//      */
//     const searchParams = useSearchParams();
//     console.log("searchParams: ", searchParams);
//     // Example: For the URL: /properties?name=test
//     // return (
//     //     <div>
//     //         <h1 className="text-2xl">Properties Detail Page {searchParams.get('name')}</h1>
//     //     </div>
//     // )

//     /**
//      * usePathname is used to get the pathname.
//      */
//     const pathname = usePathname();
//     console.log("pathname: ", pathname);
//     // Example: For the URL: /properties?name=test

//     return (
//         <div>
//             <h1 className="text-2xl">Properties Detail Page {pathname}</h1>
//         </div>
//     )
// }

/**
 * Default SSR component.
 * We can just pass as props or destructure whatever we want such as: params, searchParams etc instead of using hooks.
 * We also don't need to use methods for some of those like searchParams and we can just do: searchParams.name
 */
const PropertyDetailPage = async ({ params }) => {
  await connectDB();
  const propertyDocConversion = await Property.findById(params.id).lean();
  const property = convertToSerializableObject(propertyDocConversion);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Property not found.</h1>
    )
  }

  return (
    <div>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowAltCircleLeft className="mr-1" /> Back to Properties
          </Link>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookMarkButton property={property} />
              <ShareButtons property={property} />
              <ContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </div>
  );
};

export default PropertyDetailPage;
