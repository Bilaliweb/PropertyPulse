'use client';
import { useFormStatus } from "react-dom";

const EditPropertyButton = () => {
    const { pending } = useFormStatus()

    return (
        <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
              disabled={pending}
            >
              {pending ? 'Updating...' : 'Update Property'}
            </button>
          </div>
    )
}

export default EditPropertyButton;