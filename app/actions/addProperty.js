// For server specific files to use server functions we have to write 'use server'
'use server'
import cloudinay from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function addProperty (formData) {

    await connectDB();

    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;

    if(!sessionUser || !sessionUser.userId) {
        throw new Error("Session without id not allowed.");
    }

    const amenities = formData.getAll('amenities')
    const images = formData.getAll('images').filter((item) => item.name !== '')

    const property = {
        owner: userId,
        name: formData.get('name'),
        type: formData.get('type'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipCode: formData.get('location.zipCode')
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
        amenities,
    }

    // Loop through whole images array as we are using cloudinary for storing images
    const imagesUrls = []

    for (const imageFile of images) {
        const imageBuffer = await imageFile.arrayBuffer()
        
        const imageArray = Array.from(new Uint8Array(imageBuffer))
        
        const imageData = Buffer.from(imageArray)

        // Base64 conversion
        const imageBase64 = imageData.toString('base64')

        // Make request to cloudinary
        const result = await cloudinay.uploader.upload(`data:image/png;base64,${imageBase64}`, {
            folder: 'propertyPulse'
        })

        imagesUrls.push(result.secure_url)
    }

    property.images = imagesUrls

    // const newProperty = new Property(formData)
    // await newProperty.save()

    const newProperty = await Property.create(property)

    revalidatePath('/', 'layout')
    redirect(`/properties/${newProperty._id}`)
}

export default addProperty;