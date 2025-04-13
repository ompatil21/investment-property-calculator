'use client'

import { useForm } from 'react-hook-form'
import { DollarSign, Percent, Calendar, Banknote } from 'lucide-react'

type Props = {
    data: {
        purchase_price: number
        deposit: number
        loan_amount: number
        interest_rate: number
        loan_term: number
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onNext: () => void
    onBack: () => void
}

export default function Step2PurchaseDetails({ data, updateFields, onNext, onBack }: Props) {
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
            {/* Purchase Price */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <DollarSign size={18} /> Purchase Price
                </label>
                <input
                    type="number"
                    {...register('purchase_price', { required: true, min: 1 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.purchase_price ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 500000"
                />
                {errors.purchase_price && <p className="text-red-500 text-sm mt-1">Required</p>}
            </div>

            {/* Deposit */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <Banknote size={18} /> Deposit
                </label>
                <input
                    type="number"
                    {...register('deposit', { required: true, min: 0 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.deposit ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 100000"
                />
                {errors.deposit && <p className="text-red-500 text-sm mt-1">Required</p>}
            </div>

            {/* Loan Amount */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <DollarSign size={18} /> Loan Amount
                </label>
                <input
                    type="number"
                    {...register('loan_amount', { required: true, min: 0 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.loan_amount ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 400000"
                />
                {errors.loan_amount && <p className="text-red-500 text-sm mt-1">Required</p>}
            </div>

            {/* Interest Rate */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <Percent size={18} /> Interest Rate
                </label>
                <input
                    type="number"
                    step="0.01"
                    {...register('interest_rate', { required: true, min: 0 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.interest_rate ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 5.25"
                />
                {errors.interest_rate && <p className="text-red-500 text-sm mt-1">Required</p>}
            </div>

            {/* Loan Term */}
            <div>
                <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-2">
                    <Calendar size={18} /> Loan Term (Years)
                </label>
                <input
                    type="number"
                    {...register('loan_term', { required: true, min: 1 })}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.loan_term ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="e.g. 30"
                />
                {errors.loan_term && <p className="text-red-500 text-sm mt-1">Required</p>}
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
