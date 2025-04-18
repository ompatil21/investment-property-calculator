'use client'

import { useState } from 'react'
import Step1BasicInfo from './Step1BasicInfo'
import Step2PurchaseDetails from './Step2PurchaseDetails'
import Step3RentalInfo from './Step3RentalInfo'
import Step4Expenses from './Step4Expenses'
import Step5OwnershipIncome from './Step5OwnershipIncome'
import ConfirmationScreen from './ConfirmationScreen'
import { createProperty } from '@/services/api'

type Owner = {
    name: string
    ownership: number | undefined
    income: number | undefined
}

type PropertyFormData = {
    title: string
    location: string
    type: string
    purchase_price: number | undefined
    deposit: number | undefined
    loan_amount: number | undefined
    interest_rate: number | undefined
    loan_term: number | undefined
    rent: number | undefined
    vacancy_rate: number | undefined
    council_rates: number | undefined
    insurance: number | undefined
    maintenance: number | undefined
    property_manager: number | undefined
    owners: Owner[]
    wage_growth: number | undefined
}

export default function PropertyForm() {
    const [step, setStep] = useState(1)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [formData, setFormData] = useState<PropertyFormData>({
        title: '',
        location: '',
        type: '',
        purchase_price: undefined,
        deposit: undefined,
        loan_amount: undefined,
        interest_rate: undefined,
        loan_term: undefined,
        rent: undefined,
        vacancy_rate: undefined,
        council_rates: undefined,
        insurance: undefined,
        maintenance: undefined,
        property_manager: undefined,
        owners: [{ name: '', ownership: undefined, income: undefined }],
        wage_growth: undefined
    })

    const updateFields = (fields: Partial<PropertyFormData>) => {
        setFormData(prev => ({ ...prev, ...fields }))
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                    <ConfirmationScreen
                        data={formData}
                        onDone={() => {
                            setFormData({
                                title: '',
                                location: '',
                                type: '',
                                purchase_price: undefined,
                                deposit: undefined,
                                loan_amount: undefined,
                                interest_rate: undefined,
                                loan_term: undefined,
                                rent: undefined,
                                vacancy_rate: undefined,
                                council_rates: undefined,
                                insurance: undefined,
                                maintenance: undefined,
                                property_manager: undefined,
                                owners: [{ name: '', ownership: undefined, income: undefined }],
                                wage_growth: undefined
                            })
                            setStep(1)
                            setIsSubmitted(false)
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Sidebar */}
                <div className="w-full md:w-1/3 bg-blue-700 text-white p-6 relative">
                    <h3 className="uppercase text-sm font-bold mb-8 tracking-widest">Step {step} of 5</h3>
                    <ul className="space-y-6 text-sm font-medium">
                        {['Basic Info', 'Purchase', 'Rental Info', 'Expenses', 'Ownership'].map((label, index) => (
                            <li key={label} className={`${step === index + 1 ? 'text-white font-bold' : 'text-blue-200'}`}>
                                <span className="inline-block w-5 h-5 mr-2 rounded-full border-2 border-white text-xs text-center">
                                    {index + 1}
                                </span>
                                {label}
                            </li>
                        ))}
                    </ul>
                    <div className="absolute bottom-6 left-6 right-6 h-2 bg-blue-300 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-300"
                            style={{ width: `${(step / 5) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="w-full md:w-2/3 p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Property</h2>

                    {step === 1 && (
                        <Step1BasicInfo
                            data={formData}
                            updateFields={updateFields}
                            onSuccess={() => setStep(2)}
                        />
                    )}

                    {step === 2 && (
                        <Step2PurchaseDetails
                            data={formData}
                            updateFields={updateFields}
                            onNext={() => setStep(3)}
                            onBack={() => setStep(1)}
                        />
                    )}

                    {step === 3 && (
                        <Step3RentalInfo
                            data={formData}
                            updateFields={updateFields}
                            onNext={() => setStep(4)}
                            onBack={() => setStep(2)}
                        />
                    )}

                    {step === 4 && (
                        <Step4Expenses
                            data={formData}
                            updateFields={updateFields}
                            onBack={() => setStep(3)}
                            onNext={() => setStep(5)}
                        />

                    )}

                    {step === 5 && (
                        <Step5OwnershipIncome
                            data={formData}
                            updateFields={updateFields}
                            onBack={() => setStep(4)}
                            onSubmit={async (finalData) => {
                                try {
                                    console.log("🚀 SENDING TO BACKEND:", finalData)
                                    const res = await createProperty(finalData)  // ✅ use finalData, not formData
                                    console.log("✅ Submitted to backend:", res)
                                    setIsSubmitted(true)
                                } catch (err) {
                                    console.error("❌ Submission failed:", err)
                                    alert("Submission failed: Please check all required fields.")
                                }
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
