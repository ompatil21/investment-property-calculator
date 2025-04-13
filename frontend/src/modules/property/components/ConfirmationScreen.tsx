/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Home } from 'lucide-react'

type Props = {
    data: any
    onDone: () => void
}

const formatCurrency = (value: number | string) =>
    new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        maximumFractionDigits: 0,
    }).format(Number(value))

const calculateROI = (data: any) => {
    const totalInvestment =
        Number(data.deposit) +
        Number(data.council_rates) +
        Number(data.insurance)
    const annualRent =
        Number(data.rent) * 12 * (1 - Number(data.vacancy_rate) / 100)
    return ((annualRent / totalInvestment) * 100).toFixed(2)
}

const calculateMonthlyCashFlow = (data: any) => {
    const income = Number(data.rent)
    const expenses =
        (Number(data.council_rates) +
            Number(data.insurance) +
            Number(data.maintenance) +
            Number(data.property_manager)) /
        12
    return formatCurrency(income - expenses)
}

export default function ConfirmationScreen({ data, onDone }: Props) {
    const roi = calculateROI(data)
    const cashFlow = calculateMonthlyCashFlow(data)

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 rounded-2xl shadow-xl text-center"
        >
            {/* Animated Checkmark */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                className="flex justify-center mb-6 text-green-600"
            >
                <CheckCircle size={64} strokeWidth={1.5} />
            </motion.div>

            {/* Headings */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Property Added Successfully
            </h2>
            <p className="text-gray-500 mb-6">Here’s a quick financial summary</p>

            {/* Quick Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 border rounded-lg p-6 text-left text-sm text-gray-700">
                <div>
                    <h4 className="font-semibold mb-1">🏡 Basic Info</h4>
                    <p><strong>Title:</strong> {data.title}</p>
                    <p><strong>Location:</strong> {data.location}</p>
                    <p><strong>Type:</strong> {data.type}</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-1">📊 Financials</h4>
                    <p><strong>ROI:</strong> {roi}%</p>
                    <p><strong>Cash Flow (est.):</strong> {cashFlow}/mo</p>
                    <p><strong>Loan Term:</strong> {data.loan_term} yrs</p>
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
                <button
                    onClick={onDone}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
                >
                    <span className="inline-flex items-center gap-2">
                        <Home size={16} /> Add Another Property
                    </span>
                </button>
            </div>
        </motion.div>
    )
}
