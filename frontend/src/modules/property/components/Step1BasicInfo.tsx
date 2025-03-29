'use client'

import { useForm } from 'react-hook-form'
import { createProperty } from '@/services/api'

type Props = {
    data: {
        title: string
        location: string
        type: string
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onSuccess?: () => void
}

export default function Step1BasicInfo({ data, updateFields, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: data,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (values: any) => {
        updateFields(values)

        try {
            const res = await createProperty(values)
            console.log("Property created:", res)
            alert("Property created successfully!")
            onSuccess?.()
        } catch (err) {
            console.error(err)
            alert("Something went wrong while saving.")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-md p-8">
            <div>
                <label className="block font-medium text-gray-700 mb-1">Property Name</label>
                <input
                    {...register('title', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.title && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Location</label>
                <input
                    {...register('location', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.location && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Type</label>
                <select
                    {...register('type', { required: true })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                >
                    <option value="">Select</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Townhouse">Townhouse</option>
                </select>
                {errors.type && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md">
                Submit
            </button>
        </form>
    )
}
