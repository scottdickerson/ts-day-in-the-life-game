import { useArduinoButtons } from '@/hooks/useArduinoButtons'

export const ArduinoStartListener = () => {
    // Set up Arduino button for start navigation
    useArduinoButtons({
        onButtonPress: (
            button: number,
            type?: 'choice' | 'dinosaur' | 'start'
        ) => {
            console.log(`🎮 Arduino button ${button} pressed (type: ${type})`)

            if (type === 'start') {
                console.log('🏠 Navigating to select screen')
                window.location.href = '/select'
            }
        },
        onArduinoConnected: () => {
            console.log('🎮 Arduino buttons are now active!')
        },
        onArduinoError: (error) => {
            console.warn(
                '⚠️ Arduino error - continuing with UI buttons only:',
                error
            )
        },
        onArduinoTimeout: () => {
            console.log('ℹ️ Arduino not detected - using UI buttons only')
        },
    })
    return null
}
