'use server';
import connectDB from "@/config/database";
import cloudinay from "@/config/cloudinary";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function deleteProperty (id) {
    await connectDB();
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    if(!sessionUser || !userId) {
        throw new Error("Session without id not allowed.");
    }

    const property = await Property.findById(id);
    if(!property) {
        throw new Error("Property not found.");
    }

    if(property.owner.toString() !== userId) {
        throw new Error("You are not the owner of this property.");
    }
    
    // Extract public_id from the image url
    const publicIds = property.images.map((image) => {
        const parts = image.split('/'); // Will split the image url into an array of parts
        return parts.at(-1).split('.').at(0); // Will get the last part of the array and split it by the dot and get the first part
    })
    
    // Delete images from cloudinary
    if(publicIds.length > 0) {
        for(const publicId of publicIds) {
            await cloudinay.uploader.destroy('propertyPulse/' + publicId);
        }
    }

    await property.deleteOne();
    revalidatePath('/', 'layout');
}

export default deleteProperty;