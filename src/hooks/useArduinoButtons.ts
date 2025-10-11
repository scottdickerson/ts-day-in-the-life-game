import { useEffect, useRef, useCallback } from 'react'

export interface ArduinoEvent {
    type:
        | 'connected'
        | 'choice'
        | 'dinosaur'
        | 'start'
        | 'arduinoConnected'
        | 'arduinoError'
        | 'arduinoTimeout'
        | 'heartbeat'
    buttonType?: 'choice' | 'dinosaur' | 'start'
    button?: number
    timestamp: number
    arduinoConnected?: boolean
    error?: string
    message?: string
}

export interface UseArduinoButtonsOptions {
    onButtonPress?: (
        button: number,
        type?: 'choice' | 'dinosaur' | 'start'
    ) => void
    onArduinoConnected?: () => void
    onArduinoError?: (error: string) => void
    onArduinoTimeout?: () => void
    autoReconnect?: boolean
    reconnectDelay?: number
}

export const useArduinoButtons = (options: UseArduinoButtonsOptions = {}) => {
    const {
        onButtonPress,
        onArduinoConnected,
        onArduinoError,
        onArduinoTimeout,
        autoReconnect = true,
        reconnectDelay = 3000,
    } = options

    const eventSourceRef = useRef<EventSource | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const isConnectingRef = useRef(false)

    // Check if EventSource is available in the browser
    const isEventSourceSupported =
        typeof window !== 'undefined' && 'EventSource' in window

    // Fallback for browsers without EventSource support
    const createEventSource = (url: string): EventSource | null => {
        if (!isEventSourceSupported) {
            console.warn(
                '⚠️ EventSource not supported - using fallback polling'
            )
            return null
        }
        return new EventSource(url)
    }

    const connect = useCallback(() => {
        // Check if EventSource is supported
        if (!isEventSourceSupported) {
            console.warn(
                '⚠️ EventSource not supported in this browser - Arduino buttons disabled'
            )
            onArduinoError?.('EventSource not supported')
            return
        }

        if (
            isConnectingRef.current ||
            eventSourceRef.current?.readyState === EventSource.OPEN
        ) {
            return
        }

        isConnectingRef.current = true
        console.log('🔗 Connecting to Arduino SSE endpoint...')

        try {
            const eventSource = createEventSource('/api/arduino-events')
            if (!eventSource) {
                console.warn(
                    '⚠️ EventSource not available - Arduino buttons disabled'
                )
                onArduinoError?.('EventSource not available')
                isConnectingRef.current = false
                return
            }
            eventSourceRef.current = eventSource

            eventSource.onopen = () => {
                console.log('✅ Connected to Arduino SSE endpoint')
                isConnectingRef.current = false
            }

            eventSource.onmessage = (event) => {
                try {
                    const data: ArduinoEvent = JSON.parse(event.data)
                    console.log('🔘 Received SSE event:', data)

                    switch (data.type) {
                        case 'connected':
                            console.log('🔗 SSE connection established', {
                                arduinoConnected: data.arduinoConnected,
                            })
                            break

                        case 'choice':
                        case 'dinosaur':
                        case 'start':
                            console.log(
                                `🔘 Arduino button ${data.button} pressed (type: ${data.type})`
                            )
                            onButtonPress?.(data.button!, data.type)
                            break

                        case 'arduinoConnected':
                            console.log('✅ Arduino connected successfully')
                            onArduinoConnected?.()
                            break

                        case 'arduinoError':
                            console.error('❌ Arduino error:', data.error)
                            onArduinoError?.(data.error!)
                            break

                        case 'arduinoTimeout':
                            console.warn('⏰ Arduino connection timeout')
                            onArduinoTimeout?.()
                            break

                        case 'heartbeat':
                            // Silent heartbeat - just keeping connection alive
                            break

                        default:
                            console.log('📡 Unknown Arduino event:', data)
                    }
                } catch (error) {
                    console.error('❌ Failed to parse SSE message:', error)
                }
            }

            eventSource.onerror = (error) => {
                console.error('❌ SSE connection error:', error)
                isConnectingRef.current = false

                if (
                    autoReconnect &&
                    eventSource.readyState === EventSource.CLOSED
                ) {
                    console.log(`🔄 Reconnecting in ${reconnectDelay}ms...`)
                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect()
                    }, reconnectDelay)
                }
            }
        } catch (error) {
            console.error('❌ Failed to create EventSource:', error)
            isConnectingRef.current = false
        }
    }, [
        onButtonPress,
        onArduinoConnected,
        onArduinoError,
        onArduinoTimeout,
        autoReconnect,
        reconnectDelay,
    ])

    const disconnect = useCallback(() => {
        console.log('🔌 Disconnecting from Arduino SSE endpoint...')

        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
        }

        if (eventSourceRef.current) {
            eventSourceRef.current.close()
            eventSourceRef.current = null
        }

        isConnectingRef.current = false
    }, [])

    useEffect(() => {
        // Only connect if EventSource is supported
        if (isEventSourceSupported) {
            connect()
        }

        return () => {
            disconnect()
        }
    }, [connect, disconnect, isEventSourceSupported])

    return {
        connect,
        disconnect,
        isConnected:
            isEventSourceSupported &&
            eventSourceRef.current?.readyState === EventSource.OPEN,
        isSupported: isEventSourceSupported,
    }
}
