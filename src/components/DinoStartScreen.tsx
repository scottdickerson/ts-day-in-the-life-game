import React from 'react'
import { SelectIndividualDinosaur } from './SelectIndividualDinosaur'
import type { DinoOverview } from '@/data/siteData'
import { dinos } from '@/data/siteData'

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
            const deltaX = finalRect.right - hiddenRect.left - 750 / 2
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

    return (
        <div className="relative w-screen h-screen overflow-hidden font-archivo">
            {/* Empty reference div to calculate final position */}
            <div
                ref={finalPositionRef}
                className="absolute left-1/2 top-[180px] -translate-x-[5%] z-20 pointer-events-none opacity-0"
                aria-hidden="true"
            >
                <div style={{ width: '948px', height: '750px' }} />
            </div>

            {/* Hidden layout copy of DinoSelectScreen for positioning reference */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <div className="text-center mb-8 mt-16 opacity-0">
                    <h1 className="text-[65px] font-archivo font-bold text-[#F5F5F5] mb-4 drop-shadow-lg">
                        Choose a Creature
                    </h1>
                </div>
                <div className="flex flex-wrap gap-[120px] gap-y-0 justify-center items-center px-[40px]">
                    {dinos.map((d, index) => (
                        <div
                            key={d.id}
                            className={`${index >= 3 ? '-translate-y-20' : '-translate-y-10'} relative`}
                        >
                            {/* Only render the matching dinosaur, hide others */}
                            {d.id === dino.id ? (
                                <div
                                    ref={hiddenDinoRef}
                                    className="transition-all duration-1000 ease-out"
                                    style={{
                                        transform:
                                            finalPosition && !isAnimating
                                                ? `translate(${finalPosition.x}px, ${finalPosition.y}px) scale(${finalPosition.scale})`
                                                : 'translate(0, 0) scale(1)',
                                    }}
                                >
                                    <SelectIndividualDinosaur
                                        {...d}
                                        height={450}
                                        showName={false}
                                        enableViewTransition={false}
                                    />
                                </div>
                            ) : (
                                <div
                                    style={{ height: '450px', width: '200px' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Background layers */}
            <div
                className="absolute inset-0 bg-center bg-cover -z-10"
                style={{
                    backgroundImage: `url(DinoWelcomeAssets/dino-welcome-background.png)`,
                }}
                aria-hidden="true"
            />

            {/* Title + Description */}
            <div className="max-w-[640px] pt-[268px] ml-[206px] text-[#2a5433] flex flex-col gap-14">
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
                <div className="flex items-start flex-col gap-10">
                    <button
                        onClick={onPlay}
                        className="bg-[#4093E6] w-[410px] text-white rounded-[100px] h-[100px] px-16 text-[35px] font-medium tracking-wide hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-black/40"
                    >
                        Start
                    </button>
                    <button
                        onClick={onBack}
                        className="bg-[#19528B] w-[410px] text-white rounded-[100px] h-[66px] px-20 text-[25px] font-medium tracking-wide hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-black/40"
                    >
                        Choose a new animal
                    </button>
                </div>
            </div>
        </div>
    )
}
