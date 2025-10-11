import React from 'react'
import type { DinoOverview } from '@/data/siteData'
import { DinoGrid } from './DinoGrid'
import { Button1 } from './ui/Button1'
import { Button2 } from './ui/Button2'
import { useArduinoButtons } from '@/hooks/useArduinoButtons'

/**
 * DinoStartScreen
 * Figma reference node 3:42 ("Agujaceratops-0") adapted.
 * Props allow re-use for any dinosaur by swapping name, description, and pose asset.
 */
export interface DinoStartScreenProps extends DinoOverview {}

export const DinoStartScreen: React.FC<DinoStartScreenProps> = (dino) => {
    const { id, name, description } = dino
    const pose = `/DinoWelcomeAssets/podium_${id.toLocaleLowerCase()}.png`
    const [isAnimating, setIsAnimating] = React.useState(true)
    const [finalPosition, setFinalPosition] = React.useState<{
        x: number
        y: number
        scale: number
    } | null>(null)
    const hiddenDinoRef = React.useRef<HTMLDivElement>(null)
    const finalPositionRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        // Calculate the final position where the dinosaur should end up
        if (hiddenDinoRef.current && finalPositionRef.current) {
            const hiddenRect = hiddenDinoRef.current.getBoundingClientRect()
            const finalRect = finalPositionRef.current.getBoundingClientRect()

            // Calculate the offset from start position to final position
            const deltaX = finalRect.right - 400 - hiddenRect.left - 750 / 2
            const deltaY = finalRect.top - hiddenRect.top + 750 / 4
            const scale = 750 / 450 // End at welcome screen size (750) vs start size (450)

            setFinalPosition({ x: deltaX, y: deltaY, scale })

            // Start the animation after a brief delay
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(false)
                })
            })
        }
    }, [])

    const onPlay = () => {
        window.location.href = `/${name.toLowerCase()}`
    }
    const onBack = () => {
        window.location.href = '/select'
    }

    useArduinoButtons({
        onButtonPress: (button, type) => {
            if (type === 'choice') {
                if (button === 2) {
                    onBack()
                } else if (button === 1) {
                    onPlay()
                }
            }
        },
    })

    return (
        <div className="relative w-screen h-screen overflow-hidden font-archivo">
            {/* Empty reference div to calculate final position */}
            <div
                ref={finalPositionRef}
                className="absolute left-1/2 top-[180px] -translate-x-[5%] z-20 pointer-events-none"
                aria-hidden="true"
            >
                <div style={{ width: '948px', height: '750px' }} />
            </div>

            {/* Hidden layout copy of DinoSelectScreen for positioning reference */}
            <DinoGrid
                selectedDinoId={id}
                selectedDinoRef={hiddenDinoRef}
                className="absolute inset-0 pointer-events-none"
                transformStyle={{
                    transform: finalPosition
                        ? `translate(${finalPosition.x}px, ${finalPosition.y}px) scale(${finalPosition.scale})`
                        : undefined,
                }}
            />

            {/* Background layers */}
            <div
                className="absolute inset-0 bg-center bg-cover -z-10"
                style={{
                    backgroundImage: `url(DinoWelcomeAssets/dino-welcome-background.png)`,
                }}
                aria-hidden="true"
            />

            {/* Title + Description */}
            <div className="max-w-[640px] pt-[268px] ml-[206px] text-[#2a5433] flex flex-col gap-14 animate-fade duration-1000">
                <div>
                    <h2 className="text-[75px] leading-[1.05] font-medium mb-6">
                        You are an
                        <br />
                        <span className="italic">
                            {name.slice(0, 1).toUpperCase() + name.slice(1)}
                        </span>
                        !
                    </h2>
                    <p className="text-[33px] leading-[45px] text-[#2a5433]">
                        {description}
                    </p>
                </div>
                {/* CTA Buttons and progress glyphs */}
                <div className="flex items-start flex-row gap-10">
                    <Button1 onClick={onPlay}>Play</Button1>
                    <Button2 onClick={onBack}>Go back</Button2>
                </div>
            </div>
        </div>
    )
}
