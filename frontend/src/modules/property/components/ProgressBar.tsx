type Props = {
    step: number
    totalSteps: number
    labels: string[]
}

export default function ProgressBar({ step, totalSteps, labels }: Props) {
    return (
        <div className="flex items-center justify-between mb-6">
            {labels.map((label, index) => {
                const current = index + 1 === step
                const completed = index + 1 < step

                return (
                    <div key={index} className="flex-1 text-center">
                        <div
                            className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-semibold
                  ${completed ? 'bg-green-500 text-white' :
                                    current ? 'bg-blue-600 text-white' :
                                        'bg-gray-200 text-gray-700'}`}
                        >
                            {index + 1}
                        </div>
                        <div className={`text-sm mt-2 ${current ? 'font-bold' : ''}`}>{label}</div>
                        {index < totalSteps - 1 && (
                            <div className="w-full h-1 bg-gray-300 mt-2 relative">
                                <div className={`absolute h-1 top-0 left-0 ${completed ? 'bg-green-500 w-full' : 'bg-gray-300 w-full'}`}></div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
