// utils/useUserLocation.ts
import { useState, useEffect, useCallback } from 'react'

export type LocationStatus =
  | 'idle'          // not asked yet
  | 'requesting'    // browser prompt showing
  | 'granted'       // got coordinates
  | 'denied'        // user clicked "Block"
  | 'unavailable'   // device has no GPS
  | 'timeout'       // took too long
  | 'unsupported'   // browser doesn't support geolocation

export interface Location {
  lat: number
  lng: number
}

interface UseUserLocationReturn {
  location: Location | null
  status: LocationStatus
  // convenience booleans
  isLocating: boolean
  isGranted: boolean
  isDenied: boolean
  // human-readable message (null when granted or idle)
  statusMessage: string | null
  // call this to (re)request permission
  getLocation: () => void
}

// Key for persisting permission hint across sessions
const STORAGE_KEY = 'location_permission_hint'

export function useUserLocation(autoFetch = true): UseUserLocationReturn {
  const [location, setLocation] = useState<Location | null>(null)
  const [status, setStatus] = useState<LocationStatus>('idle')

  const getLocation = useCallback(() => {
    // 1. Browser doesn't support geolocation at all
    if (!navigator?.geolocation) {
      setStatus('unsupported')
      return
    }

    setStatus('requesting')

    navigator.geolocation.getCurrentPosition(
      // ✅ SUCCESS
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setStatus('granted')
        // Persist hint so next session can optimistically show "enabled"
        try { localStorage.setItem(STORAGE_KEY, 'granted') } catch {}
      },

      // ❌ ERROR — every possible case handled
      (error) => {
        setLocation(null)
        try { localStorage.removeItem(STORAGE_KEY) } catch {}

        switch (error.code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            // User clicked "Block" — don't re-request automatically
            setStatus('denied')
            break
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            // GPS hardware failed, airplane mode, etc.
            setStatus('unavailable')
            break
          case GeolocationPositionError.TIMEOUT:
            // Took longer than our timeout
            setStatus('timeout')
            break
          default:
            setStatus('unavailable')
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10_000,    // 10s before TIMEOUT error
        maximumAge: 60_000, // accept a cached fix up to 1 min old
      }
    )
  }, [])

  useEffect(() => {
    if (!autoFetch) return

    // Check persisted hint — if user previously denied, don't silently re-prompt
    // (browser will deny instantly anyway, but this prevents the "requesting" flash)
    try {
      const hint = localStorage.getItem(STORAGE_KEY)
      if (hint === 'granted') {
        getLocation() // likely to succeed silently
        return
      }
    } catch {}

    // No hint → ask on mount (will show browser prompt first time)
    getLocation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const statusMessage: string | null = (() => {
    switch (status) {
      case 'idle':
      case 'granted':
        return null
      case 'requesting':
        return 'Getting your location…'
      case 'denied':
        return 'Location blocked. Enable it in your browser settings to sort by nearest.'
      case 'unavailable':
        return 'Location unavailable on this device.'
      case 'timeout':
        return 'Location timed out. Tap to try again.'
      case 'unsupported':
        return 'Your browser doesn\'t support location.'
    }
  })()

  return {
    location,
    status,
    isLocating: status === 'requesting',
    isGranted: status === 'granted',
    isDenied: status === 'denied',
    statusMessage,
    getLocation,
  }
}