// hooks/useUserLocation.ts
import { useState, useEffect } from 'react'

interface Location {
    lat: number
    lng: number
}

export function useUserLocation(autoFetch: boolean = true) {
    const [location, setLocation] = useState<Location | null>(null)
    const [locationError, setLocationError] = useState<string | null>(null)
    const [isLocating, setIsLocating] = useState(false)

    function getLocation() {
        // Check if browser supports geolocation
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser')
            return
        }

        // Reset error and start locating
        setLocationError(null)
        setIsLocating(true)

        navigator.geolocation.getCurrentPosition(
            // Success callback
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setIsLocating(false)
            },
            // Error callback — Bug 2 fixed, now captures real error
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError('Location permission denied. Please allow location access in your browser settings.')
                        break
                    case error.POSITION_UNAVAILABLE:
                        setLocationError('Location information is unavailable.')
                        break
                    case error.TIMEOUT:
                        setLocationError('Location request timed out.')
                        break
                    default:
                        setLocationError('An unknown error occurred.')
                }
                setIsLocating(false)
            },
            // Options
            {
                enableHighAccuracy: true,
                timeout: 10000,      // 10 seconds
                maximumAge: 60000,   // cache location for 1 minute
            }
        )
    }

    // Bug 1 fixed — auto call on mount if autoFetch is true
    useEffect(() => {
        if (autoFetch) {
            getLocation()
        }
    }, [])

    return { location, locationError, isLocating, getLocation }
}