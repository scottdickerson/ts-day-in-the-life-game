import { useArduinoButtons } from '@/hooks/useArduinoButtons'
import { DinosaurTypeEnum } from './utils'

export const ArduinoDinoSelectListener = () => {
    // Set up Arduino button for dinosaur selection
    useArduinoButtons({
        onButtonPress: (
            button: number,
            type?: 'choice' | 'dinosaur' | 'start'
        ) => {
            console.log(`🎮 Arduino button ${button} pressed (type: ${type})`)

            if (type === 'dinosaur') {
                // Handle dinosaur selection buttons (3-7)
                const dinosaurMap = {
                    3: DinosaurTypeEnum.Aguja,
                    4: DinosaurTypeEnum.Krito,
                    5: DinosaurTypeEnum.Tyranno,
                    6: DinosaurTypeEnum.Mosa,
                    7: DinosaurTypeEnum.Protos,
                }
                const dinosaurPath =
                    dinosaurMap[button as keyof typeof dinosaurMap]
                if (dinosaurPath) {
                    console.log(`🦕 Navigating to ${dinosaurPath} game`)
                    window.location.href = `/${dinosaurPath.toLocaleLowerCase()}.welcome`
                }
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

