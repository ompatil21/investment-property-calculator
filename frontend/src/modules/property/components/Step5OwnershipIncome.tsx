/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { User, Percent, DollarSign, PlusCircle, Trash2, Info } from 'lucide-react'

type Owner = {
    name: string
    ownership: number | undefined
    income: number | undefined
}

type Props = {
    data: {
        owners: Owner[]
        wage_growth: number | undefined
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onBack: () => void
    onSubmit: (finalData: any) => void
}

export default function Step5OwnershipIncome({ data, onBack, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            owners: data.owners.length > 0 ? data.owners : [],
            wage_growth: data.wage_growth ?? undefined,
        },
        mode: 'onChange',
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'owners',
    })

    const [submitting, setSubmitting] = useState(false)

    const watchOwners = watch('owners')
    const totalOwnership = watchOwners?.reduce((acc: number, owner: Owner) => {
        return acc + (Number(owner.ownership) || 0)
    }, 0)

    const handleFinalSubmit = (values: any) => {
        if (submitting) return
        setSubmitting(true)

        const validOwners = values.owners.filter(
            (owner: any) =>
                owner.name.trim() !== '' &&
                owner.ownership !== undefined &&
                owner.income !== undefined &&
                owner.ownership > 0 &&
                owner.income > 0
        )

        const totalOwnership = validOwners.reduce(
            (acc: number, owner: any) => acc + Number(owner.ownership),
            0
        )

        if (validOwners.length === 0) {
            alert('Please add at least one valid owner.')
            setSubmitting(false)
            return
        }

        if (totalOwnership !== 100) {
            alert(`Total ownership must be exactly 100%. Currently: ${totalOwnership}%`)
            setSubmitting(false)
            return
        }

        const parsedValues = {
            wage_growth: Number(values.wage_growth),
            owners: validOwners.map((owner: any) => ({
                name: owner.name.trim(),
                ownership: Number(owner.ownership),
                income: Number(owner.income),
            })),
        }

        const combined = {
            ...data,
            ...parsedValues,
        }

        console.log("🚀 Submitting to backend:", combined)
        onSubmit(combined)
    }

    return (
        <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">👥 Ownership Structure</h3>

            {/* Ownership summary pill */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Info size={16} className="text-blue-500" />
                    Total ownership must equal 100%
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${totalOwnership === 100
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                >
                    Ownership: {totalOwnership || 0}%
                </span>
            </div>

            {/* Owner blocks */}
            {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md space-y-3 bg-gray-50 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Owner Name */}
                        <div>
                            <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                                <User size={16} /> Owner Name
                            </label>
                            <input
                                {...register(`owners.${index}.name`, { required: true, minLength: 1 })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="e.g. John Doe"
                            />
                            {errors.owners?.[index]?.name && (
                                <p className="text-sm text-red-500">Name is required</p>
                            )}
                        </div>

                        {/* Ownership % */}
                        <div>
                            <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                                <Percent size={16} /> Ownership %
                            </label>
                            <input
                                type="number"
                                {...register(`owners.${index}.ownership`, {
                                    required: true,
                                    min: 0,
                                    max: 100,
                                })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                            {errors.owners?.[index]?.ownership && (
                                <p className="text-sm text-red-500">Must be between 0 and 100</p>
                            )}
                        </div>

                        {/* Income */}
                        <div>
                            <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                                <DollarSign size={16} /> Income ($)
                            </label>
                            <input
                                type="number"
                                {...register(`owners.${index}.income`, { required: true, min: 0 })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                            {errors.owners?.[index]?.income && (
                                <p className="text-sm text-red-500">Required</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={() =>
                    append({ name: '', ownership: undefined, income: undefined })
                }
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
                <PlusCircle size={18} /> Add Owner
            </button>

            {/* Wage Growth Input */}
            <div className="pt-6">
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                    📈 Wage Growth Rate (%)
                </label>
                <input
                    type="number"
                    step="0.1"
                    {...register('wage_growth', { required: true, min: 0 })}
                    className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.wage_growth && (
                    <p className="text-sm text-red-500">Required</p>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
                >
                    ← Back
                </button>

                <button
                    type="submit"
                    disabled={!isValid || submitting || totalOwnership !== 100}
                    className={`px-6 py-2 rounded-md text-white font-semibold transition ${isValid && totalOwnership === 100 && !submitting
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    Submit →
                </button>
            </div>
        </form>
    )
}
