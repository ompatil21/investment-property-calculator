'use client'

import { useState } from 'react'
import Step1BasicInfo from './Step1BasicInfo'
import Step2PurchaseDetails from './Step2PurchaseDetails'
import Step3RentalInfo from './Step3RentalInfo'
import Step4Expenses from './Step4Expenses'
import ConfirmationScreen from './ConfirmationScreen'
import { createProperty } from '@/services/api'


type PropertyFormData = {
    title: string
    location: string
    type: string
    purchase_price: number
    deposit: number
    loan_amount: number
    interest_rate: number
    loan_term: number
    rent: number
    vacancy_rate: number
    council_rates: number
    insurance: number
    maintenance: number
    property_manager: number

}
export default function PropertyForm() {
    const [step, setStep] = useState(1)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [formData, setFormData] = useState<PropertyFormData>({
        title: '',
        location: '',
        type: '',
        purchase_price: 0,
        deposit: 0,
        loan_amount: 0,
        interest_rate: 0,
        loan_term: 0,
        rent: 0,
        vacancy_rate: 0,
        council_rates: 0,
        insurance: 0,
        maintenance: 0,
        property_manager: 0,
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
                                purchase_price: 0,
                                deposit: 0,
                                loan_amount: 0,
                                interest_rate: 0,
                                loan_term: 0,
                                rent: 0,
                                vacancy_rate: 0,
                                council_rates: 0,
                                insurance: 0,
                                maintenance: 0,
                                property_manager: 0,
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

                {/* Left: Sidebar */}
                <div className="w-full md:w-1/3 bg-blue-700 text-white p-6 relative">
                    <h3 className="uppercase text-sm font-bold mb-8 tracking-widest">Step {step} of 4</h3>
                    <ul className="space-y-6 text-sm font-medium">
                        <li className={`${step === 1 ? 'text-white font-bold' : 'text-blue-200'}`}>
                            <span className="inline-block w-5 h-5 mr-2 rounded-full border-2 border-white text-xs text-center">
                                1
                            </span>
                            Basic Info
                        </li>
                        <li className={`${step === 2 ? 'text-white font-bold' : 'text-blue-200'}`}>
                            <span className="inline-block w-5 h-5 mr-2 rounded-full border-2 border-white text-xs text-center">
                                2
                            </span>
                            Purchase
                        </li>
                        <li className={`${step === 3 ? 'text-white font-bold' : 'text-blue-200'}`}>
                            <span className="inline-block w-5 h-5 mr-2 rounded-full border-2 border-white text-xs text-center">
                                3
                            </span>
                            Rental Info
                        </li>
                        <li className={`${step === 4 ? 'text-white font-bold' : 'text-blue-200'}`}>
                            <span className="inline-block w-5 h-5 mr-2 rounded-full border-2 border-white text-xs text-center">
                                4
                            </span>
                            Expenses
                        </li>
                    </ul>

                    <div className="absolute bottom-6 left-6 right-6 h-2 bg-blue-300 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-300"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Right: Form Step Content */}
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
                            onBack={() => setStep(2)}
                            onNext={() => setStep(4)}
                        />
                    )}

                    {step === 4 && (
                        <Step4Expenses
                            data={formData}
                            updateFields={updateFields}
                            onBack={() => setStep(3)}
                            onSubmit={async () => {
                                try {
                                    const res = await createProperty(formData)
                                    console.log("Submitted to backend:", res)
                                    setIsSubmitted(true)
                                } catch (err) {
                                    alert("Submission failed. Try again.")
                                    console.error(err)
                                }
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )

}

