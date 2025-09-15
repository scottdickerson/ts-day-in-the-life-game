import React from 'react'

/**
 * DinosaurWelcomeScreen
 * Figma reference node 3:42 ("Agujaceratops-0") adapted.
 * Props allow re-use for any dinosaur by swapping name, description, and pose asset.
 */
export interface DinosaurWelcomeScreenProps {
    dinoName: string
    dinoId: string
    description?: string
}

export const DinosaurWelcomeScreen: React.FC<DinosaurWelcomeScreenProps> = ({
    dinoId,
    dinoName,
    description = 'You are an adult, and you are currently without a herd. You will need to find food and choose how to interact with other animals all by yourself!',
}) => {
    const pose = `/DinoWelcomeAssets/podium_${dinoId}.png`

    const onPlay = () => {
        window.location.href = `/${dinoName.toLowerCase()}`
    }
    const onBack = () => {
        window.location.href = '/select'
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden font-archivo">
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
                            {dinoName.slice(0, 1).toUpperCase() +
                                dinoName.slice(1)}
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

            {/* Pose + platform shadow */}
            <div className="absolute left-1/2 top-[180px] -translate-x-[5%]">
                <div className="relative w-[948px] h-[569px] z-20">
                    <img
                        src={pose}
                        alt={dinoId}
                        className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.45)] pointer-events-none select-none"
                        draggable={false}
                    />
                </div>
                <div className="relative mt-[-60px] w-[720px] ml-[80px]">
                    <img
                        src="DinoWelcomeAssets/podium.svg"
                        alt=""
                        className="w-full h-auto opacity-90"
                    />
                </div>
            </div>
        </div>
    )
}
