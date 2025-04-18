'use client'

import { useForm } from 'react-hook-form'
import { ReceiptText, ShieldCheck, Wrench, UserCog } from 'lucide-react'

type Props = {
    data: {
        council_rates: number | undefined
        insurance: number | undefined
        maintenance: number | undefined
        property_manager: number | undefined
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onNext: () => void  // ✅ changed from onSubmit
    onBack: () => void
}

export default function Step4Expenses({ data, updateFields, onNext, onBack }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: data,
        mode: 'onChange',
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleNext = (values: any) => {
        updateFields(values)
        onNext()  // ✅ move to next step (Step 5)
    }

    return (
        <form
            onSubmit={handleSubmit(handleNext)}
            className="space-y-6 transition-all duration-300"
        >
            {/* Council Rates */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <ReceiptText size={18} /> Council Rates ($/year)
                </label>
                <input
                    type="number"
                    {...register('council_rates', { required: true, min: 0 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.council_rates
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 1800"
                />
                {errors.council_rates && (
                    <p className="text-red-500 text-sm mt-1">Required</p>
                )}
            </div>

            {/* Insurance */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <ShieldCheck size={18} /> Insurance ($/year)
                </label>
                <input
                    type="number"
                    {...register('insurance', { required: true, min: 0 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.insurance
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 1200"
                />
                {errors.insurance && (
                    <p className="text-red-500 text-sm mt-1">Required</p>
                )}
            </div>

            {/* Maintenance */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <Wrench size={18} /> Maintenance ($/year)
                </label>
                <input
                    type="number"
                    {...register('maintenance', { required: true, min: 0 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.maintenance
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 800"
                />
                {errors.maintenance && (
                    <p className="text-red-500 text-sm mt-1">Required</p>
                )}
            </div>

            {/* Property Manager Fees */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <UserCog size={18} /> Property Manager ($/year)
                </label>
                <input
                    type="number"
                    {...register('property_manager', { required: true, min: 0 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.property_manager
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 1500"
                />
                {errors.property_manager && (
                    <p className="text-red-500 text-sm mt-1">Required</p>
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
                    className={`px-6 py-2 rounded-md text-white font-semibold transition ${isValid
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
