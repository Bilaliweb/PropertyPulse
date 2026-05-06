'use server'
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty (property_id, formData) {
    await connectDB();

    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    if(!sessionUser || !sessionUser.userId) {
        throw new Error("Session without id not allowed.");
    }

    const existingProperty = await Property.findById(property_id);

    if(existingProperty.owner.toString() !== userId) {
        throw new Error("You are not the owner of this property.");
    }

    const property = {
        owner: userId,
        name: formData.get('name'),
        type: formData.get('type'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode')
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        rates: {
            weekly: formData?.get('rates.weekly'),
            monthly: formData?.get('rates.monthly'),
            nightly: formData?.get('rates.nightly')
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
        amenities: formData.getAll('amenities'),
    }

    const updatedProperty = await Property.findByIdAndUpdate(property_id, property)
    console.log("Updated property: ", updateProperty)
    revalidatePath('/', 'layout');
    redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;