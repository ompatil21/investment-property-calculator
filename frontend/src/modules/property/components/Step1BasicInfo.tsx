'use client'

import { useForm } from 'react-hook-form'
import { Home, MapPin, Building } from 'lucide-react'

type Props = {
    data: {
        title: string
        location: string
        type: string
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onSuccess: () => void
}

export default function Step1BasicInfo({ data, updateFields, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: data,
        mode: 'onChange',
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (values: any) => {
        updateFields(values)
        onSuccess()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 transition-all duration-300"
        >
            {/* Property Title */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <Home size={18} /> Property Name
                </label>
                <input
                    {...register('title', { required: true })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. Cozy Beach Apartment"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>

            {/* Location */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <MapPin size={18} /> Location
                </label>
                <input
                    {...register('location', { required: true })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.location ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. Melbourne, VIC"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>

            {/* Type */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <Building size={18} /> Property Type
                </label>
                <select
                    {...register('type', { required: true })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.type ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                >
                    <option value="">Select type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Townhouse">Townhouse</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>

            {/* Button */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={!isValid}
                    className={`px-6 py-2 rounded-md text-white font-semibold shadow-sm transition ${isValid
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    Next →
                </button>
            </div>
        </form>
    )
}
