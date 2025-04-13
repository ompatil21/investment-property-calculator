'use client'

import { useForm } from 'react-hook-form'
import { TrendingDown, Wallet } from 'lucide-react'

type Props = {
    data: {
        rent: number
        vacancy_rate: number
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onNext: () => void
    onBack: () => void
}

export default function Step3RentalInfo({ data, updateFields, onNext, onBack }: Props) {
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
        onNext()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 transition-all duration-300"
        >
            {/* Rent */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <Wallet size={18} /> Monthly Rent ($)
                </label>
                <input
                    type="number"
                    {...register('rent', { required: true, min: 1 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.rent ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 2000"
                />
                {errors.rent && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>

            {/* Vacancy Rate */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <TrendingDown size={18} /> Vacancy Rate (%)
                </label>
                <input
                    type="number"
                    step="0.1"
                    {...register('vacancy_rate', { required: true, min: 0, max: 100 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.vacancy_rate ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 5"
                />
                {errors.vacancy_rate && (
                    <p className="text-red-500 text-sm mt-1">Required (0–100%)</p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
                >
                    ← Back
                </button>

                <button
                    type="submit"
                    disabled={!isValid}
                    className={`px-6 py-2 rounded-md text-white font-semibold transition ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    Next →
                </button>
            </div>
        </form>
    )
}
