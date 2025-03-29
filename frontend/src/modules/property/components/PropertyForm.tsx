'use client'

import { useState } from 'react'
import Step1BasicInfo from './Step1BasicInfo'
import { createProperty } from '@/services/api'

type PropertyFormData = {
    title: string
    location: string
    type: string
}

export default function PropertyForm() {
    const [formData, setFormData] = useState<PropertyFormData>({
        title: '',
        location: '',
        type: '',
    })

    const updateFields = (fields: Partial<PropertyFormData>) => {
        setFormData(prev => ({ ...prev, ...fields }))
    }

    const handleFinalSubmit = async () => {
        try {
            const response = await createProperty(formData)
            console.log('Property created:', response)
            alert('Property created successfully!')
            // Optionally reset or redirect here
        } catch (err) {
            console.error(err)
            alert('Something went wrong while saving the property.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center">Add Property</h2>
                <Step1BasicInfo
                    data={formData}
                    updateFields={updateFields}
                    onNext={handleFinalSubmit}
                />
            </div>
        </div>
    )
}
