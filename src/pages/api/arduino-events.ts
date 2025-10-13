import type { APIRoute } from 'astro'
import {
    arduinoService,
    type ArduinoButtonEvent,
} from '../../services/arduinoService'

export const prerender = false

export const GET: APIRoute = async ({ request }) => {
    // Set up SSE headers
    const headers = new Headers({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
    })

    // Create a readable stream for SSE
    const stream = new ReadableStream({
        start(controller) {
            console.log('🔗 New SSE client connected to Arduino events')

            // Initialize Arduino service if not already done
            arduinoService.initialize().catch((error) => {
                console.error('Failed to initialize Arduino service:', error)
            })

            // Send initial connection message
            const encoder = new TextEncoder()
            let isClosed = false

            const sendEvent = (data: any) => {
                console.log('🔘 Sending SSE event:', data)
                if (isClosed) return
                try {
                    const message = `data: ${JSON.stringify(data)}\n\n`
                    controller.enqueue(encoder.encode(message))
                } catch (error) {
                    console.warn('Failed to send SSE event:', error)
                    isClosed = true
                    // Don't try to close controller again if it's already closed
                }
            }

            // Send connection status
            sendEvent({
                type: 'connected',
                arduinoConnected: arduinoService.isConnected(),
                timestamp: Date.now(),
            })

            // Listen for Arduino button presses
            const onButtonPress = (event: ArduinoButtonEvent) => {
                console.log('🔘 Arduino button pressed', event)
                sendEvent({
                    ...event,
                })
            }

            // Listen for Arduino connection events
            const onArduinoConnected = () => {
                sendEvent({
                    type: 'arduinoConnected',
                    timestamp: Date.now(),
                })
            }

            const onArduinoError = (error: any) => {
                sendEvent({
                    type: 'arduinoError',
                    error: error.message,
                    timestamp: Date.now(),
                })
            }

            const onArduinoTimeout = () => {
                sendEvent({
                    type: 'arduinoTimeout',
                    message:
                        'Arduino connection timeout - continuing without Arduino',
                    timestamp: Date.now(),
                })
            }

            // Subscribe to Arduino service events
            arduinoService.on('buttonPress', onButtonPress)
            arduinoService.on('connected', onArduinoConnected)
            arduinoService.on('error', onArduinoError)
            arduinoService.on('timeout', onArduinoTimeout)

            // Send periodic heartbeat to keep connection alive
            const heartbeatInterval = setInterval(() => {
                sendEvent({
                    type: 'heartbeat',
                    timestamp: Date.now(),
                })
            }, 30000) // Every 30 seconds

            // Handle client disconnect
            const cleanup = () => {
                if (isClosed) return
                isClosed = true

                console.log('🔌 SSE client disconnected')
                arduinoService.off('buttonPress', onButtonPress)
                arduinoService.off('connected', onArduinoConnected)
                arduinoService.off('error', onArduinoError)
                arduinoService.off('timeout', onArduinoTimeout)
                clearInterval(heartbeatInterval)

                try {
                    controller.close()
                } catch (error) {
                    // Controller might already be closed
                }
            }

            // Listen for client disconnect
            request.signal?.addEventListener('abort', cleanup)

            // Also handle stream cancellation
            return () => {
                cleanup()
            }
        },
    })

    return new Response(stream, { headers })
}
