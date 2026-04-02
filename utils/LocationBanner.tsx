// ─── Isolated banner component ────────────────────────────────────────────────
// Renders nothing when status is 'idle' or 'granted'

import type { LocationStatus } from "@/utils/useUserLocation"

export default function LocationBanner({
    status,
    message,
    onRetry,
    isLocating,
}: {
    status: LocationStatus
    message: string | null
    onRetry: () => void
    isLocating: boolean
}) {
    if (!message) return null // idle or granted — show nothing

    const canRetry = status === 'timeout' || status === 'unavailable'
    const isDeniedOrUnsupported = status === 'denied' || status === 'unsupported'

    return (
        <div className={`
      flex items-center gap-3 text-sm px-3 py-2 rounded-lg mb-3
      ${isLocating ? 'bg-blue-50 text-blue-600' : ''}
      ${isDeniedOrUnsupported ? 'bg-yellow-50 text-yellow-700' : ''}
      ${canRetry ? 'bg-orange-50 text-orange-600' : ''}
    `}>
            {/* Spinner while requesting */}
            {isLocating && (
                <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
            )}

            <span>{message}</span>

            {/* Retry button for timeout/unavailable */}
            {canRetry && (
                <button
                    onClick={onRetry}
                    className="ml-auto underline text-orange-700 font-medium shrink-0"
                >
                    Try again
                </button>
            )}

            {/* Settings link for denied — can't re-prompt programmatically */}
            {status === 'denied' && (

             <a   href = "https://support.google.com/chrome/answer/142065"
             target="_blank"
            rel="noopener noreferrer"
            className="ml-auto underline text-yellow-800 font-medium shrink-0"
        >
            How to enable ↗
        </a>
    )
}
    </div >
  )
}