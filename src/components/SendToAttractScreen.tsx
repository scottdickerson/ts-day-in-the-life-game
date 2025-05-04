import { useEffect, useRef } from 'react'

export interface SendToAttractScreenProps {
    timeoutInMs?: number
}

export const SendToAttractScreen = ({
    timeoutInMs = 120000,
}: SendToAttractScreenProps) => {
    const createTimer = () => {
        return setTimeout(() => {
            if (
                typeof window !== 'undefined' &&
                window.location.pathname !== '/'
            )
                window.location.href = '/'
        }, timeoutInMs)
    }

    const redirectTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
        createTimer()
    )

    const clickListener = () => {
        clearTimeout(redirectTimer.current)
        redirectTimer.current = createTimer()
    }

    useEffect(() => {
        window.addEventListener('mousedown', clickListener)
        window.addEventListener('mousemove', clickListener)
        window.addEventListener('touchstart', clickListener)
        window.addEventListener('touchmove', clickListener)
        return () => {
            window.removeEventListener('mousedown', clickListener)
            window.removeEventListener('mousemove', clickListener)
            window.removeEventListener('touchstart', clickListener)
            window.removeEventListener('touchmove', clickListener)
            clearTimeout(redirectTimer.current)
        }
    }, [])

    return null
}
