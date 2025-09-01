'use client'

import { useRawInitData } from '@telegram-apps/sdk-react'
import { useEffect, useState } from 'react'


export default function CopyInitData() {
    const initDataUnsafe = useRawInitData()
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') console.log('Telegram initDataUnsafe:', initDataUnsafe)
    }, [initDataUnsafe])

    const copyData = async () => {
        if (window.navigator) {
            await navigator.clipboard.writeText(JSON.stringify(initDataUnsafe, null, 2))
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <>
                    
            <div hidden className="p-4">
                <h1 className="text-xl font-bold mb-4">Telegram Init Data</h1>
                <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap break-all">
                    {JSON.stringify(initDataUnsafe, null, 2)}
                </pre>
                <button
                    onClick={copyData}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
            </div>
            <div>
                Loading and Authentication
            </div>
        </>
    )
}

