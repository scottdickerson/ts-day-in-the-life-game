import { useArduinoButtons } from '@/hooks/useArduinoButtons'
import { DinosaurTypeEnum } from './utils'

export interface ControlButtonProps {
    onChoice: (button: number) => void
    onBack?: () => void
}

export const ControlButtons = ({ onBack, onChoice }: ControlButtonProps) => {
    // Set up Arduino button for choices
    useArduinoButtons({
        onButtonPress: (
            button: number,
            type?: 'choice' | 'dinosaur' | 'start'
        ) => {
            console.log(`🎮 Arduino button ${button} pressed (type: ${type})`)

            if (type === 'choice') {
                onChoice(button)
            } else if (type === 'dinosaur') {
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
    return (
        <div className="absolute top-4 right-4 flex space-x-4 z-10">
            {/* {onBack ? (
                <button
                    aria-label="Go back"
                    className="bg-white text-black px-4 py-2 text-5xl rounded shadow hover:bg-gray-200 transition"
                    onClick={onBack}
                >
                    Back
                </button>
            ) : null}
            <button
                aria-label="Restart game"
                className="bg-white text-black px-4 py-2 text-5xl rounded shadow hover:bg-gray-200 transition"
                onClick={() => (window.location.pathname = '/')}
            >
                Restart
            </button> */}
        </div>
    )
}
