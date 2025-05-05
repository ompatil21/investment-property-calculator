'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { format } from 'date-fns'

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

interface Property {
    _id: string
    title: string
    type: string
    purchase_price: number
    created_at: string
    owners: { name: string; ownership: number }[]
}

export default function AdminDashboard() {
    const [properties, setProperties] = useState<Property[]>([])
    const [typeFilter, setTypeFilter] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await axios.get('/api/admin/properties')
                setProperties(res.data)
            } catch (err) {
                console.error('Error fetching properties:', err)
            }
        }
        fetchProperties()
    }, [])

    const filtered = properties.filter(p => {
        const matchType = typeFilter ? p.type === typeFilter : true
        const date = new Date(p.created_at)
        const matchStart = startDate ? date >= new Date(startDate) : true
        const matchEnd = endDate ? date <= new Date(endDate) : true
        return matchType && matchStart && matchEnd
    })

    const total = filtered.length
    const avgPrice = total > 0 ? filtered.reduce((sum, p) => sum + p.purchase_price, 0) / total : 0

    const pieData = {
        labels: [...new Set(filtered.map(p => p.type))],
        datasets: [
            {
                data: [...new Set(filtered.map(p => p.type))].map(
                    type => filtered.filter(p => p.type === type).length
                ),
                backgroundColor: ['#60a5fa', '#f87171', '#34d399', '#fbbf24']
            }
        ]
    }

    const barData = {
        labels: filtered.map(p => p.title),
        datasets: [
            {
                label: 'Purchase Price',
                data: filtered.map(p => p.purchase_price),
                backgroundColor: '#3b82f6'
            }
        ]
    }

    const recentProperties = [...filtered]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)

    const ownerStats = filtered.flatMap(p => p.owners || []).reduce((acc, owner) => {
        if (!owner?.name) return acc
        if (!acc[owner.name]) {
            acc[owner.name] = 0
        }
        acc[owner.name] += 1
        return acc
    }, {} as Record<string, number>)

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-end">
                <div>
                    <label className="block text-sm text-gray-600">Property Type</label>
                    <select
                        value={typeFilter}
                        onChange={e => setTypeFilter(e.target.value)}
                        className="border px-3 py-2 rounded w-48"
                    >
                        <option value="">All</option>
                        <option value="House">House</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Apartment">Apartment</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-600">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="border px-3 py-2 rounded"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500 text-sm">Total Properties</p>
                    <p className="text-xl font-bold">{total}</p>
                </div>
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500 text-sm">Average Purchase Price</p>
                    <p className="text-xl font-bold">${avgPrice.toFixed(2)}</p>
                </div>
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500 text-sm">Unique Owners</p>
                    <p className="text-xl font-bold">{Object.keys(ownerStats).length}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-2">Property Type Breakdown</h2>
                    <Pie data={pieData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-2">Purchase Prices</h2>
                    <Bar data={barData} />
                </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Recent Properties</h2>
                <ul className="space-y-2">
                    {recentProperties.map(p => (
                        <li key={p._id} className="border-b pb-2">
                            <p className="font-medium">{p.title} ({p.type})</p>
                            <p className="text-sm text-gray-600">Added on {format(new Date(p.created_at), 'dd MMM yyyy')}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Owner Analytics */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Owner Contribution</h2>
                <ul className="space-y-1">
                    {Object.entries(ownerStats).map(([name, count]) => (
                        <li key={name} className="flex justify-between text-sm">
                            <span className="text-gray-700">{name}</span>
                            <span className="font-medium">{count} properties</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}