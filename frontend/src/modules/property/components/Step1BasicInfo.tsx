// src/modules/property/components/Step1BasicInfo.tsx

'use client'

import { useForm } from 'react-hook-form'

type Props = {
    data: {
        title: string
        location: string
        type: string
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onNext: () => void
}

export default function Step1BasicInfo({ data, updateFields, onNext }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: data,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (values: any) => {
        updateFields(values)
        onNext()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-md p-8">
            <div>
                <label className="block font-medium text-gray-700 mb-1">Property Name</label>
                <input
                    {...register('title', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Ocean View Apartment"
                />
                {errors.title && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Location</label>
                <input
                    {...register('location', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Sydney, NSW"
                />
                {errors.location && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Property Type</label>
                <select
                    {...register('type', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Townhouse">Townhouse</option>
                </select>
                {errors.type && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Next
                </button>
            </div>
        </form>
    )
}
