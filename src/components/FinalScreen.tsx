import React from 'react'
import parse from 'html-react-parser'
import {
    determineDinoFinalState,
    determineDinoImage,
    DinosaurTypeEnum,
} from './utils'

export enum FinalDinosaurState {
    GOOD = 'Good',
    NEUTRAL = 'Neutral',
    DEAD = 'Dead',
}

const jumpInAnimation =
    'animate-jump-in animate-once animate-duration-1000 animate-ease-out animate-normal'

/**
 * FinalScreen component
 * Based on Figma node 3:710 (end-of-path screen)
 * Props allow reuse for different dinosaurs / endings.
 */
export interface FinalScreenProps {
    /** Center message shown below the character */
    message: string
    dinosaurType: DinosaurTypeEnum
    onRestart?: () => void
    reaction: string
}

export const determineBackground = (
    state: FinalDinosaurState,
    dinoId: DinosaurTypeEnum
) => {
    return `${dinoId}FinalScenes/${dinoId}FinalScene_${state}.webp`
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
    message,
    onRestart,
    dinosaurType,
    reaction,
}) => {
    const state = determineDinoFinalState(reaction)
    return (
        <a
            className="block relative w-screen h-screen overflow-hidden font-archivo text-white select-none"
            role="group"
            aria-label="Final outcome"
            href="/"
        >
            {/* Background environment */}
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${determineBackground(state, dinosaurType)})`,
                }}
                aria-hidden="true"
            />

            <div className="absolute w-full pt-40">
                {/* Game Over arc text */}
                <svg
                    className="absolute -top-[40px] -translate-x-[50px] translate-y-1/2  w-full h-[180px] pointer-events-none z-10"
                    viewBox="0 0 850 180"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <path
                            id="gameOverArc"
                            d="M 50 140 Q 425 -20 800 140"
                            fill="none"
                        />
                    </defs>
                    <text
                        className="fill-white font-archivo font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                        textAnchor="middle"
                        fontSize="120"
                    >
                        <textPath
                            href="#gameOverArc"
                            startOffset="50%"
                            dominantBaseline="middle"
                        >
                            GAME OVER
                        </textPath>
                    </text>
                </svg>
                <img
                    className={`mx-auto w-[783px] h-[685px] ${jumpInAnimation}`}
                    src={determineDinoImage(dinosaurType, reaction, true)}
                />
            </div>

            {/* Message */}
            <div className="absolute left-1/2 top-[950px] -translate-x-1/2 -translate-y-1/2 w-[1350px] flex flex-col justify-center text-center leading-none">
                <p className="text-[44px] md:text-[55px] font-medium drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
                    {parse(message)}
                </p>
            </div>
            <div className="absolute bottom-[86px] right-[144px]">
                {/* <StartButton
                    onClick={onRestart}
                    variant="secondary"
                    className="!px-4 !py-4 !text-2xl"
                >
                    Start
                    <img src="DinoFinalAssets/restart.svg" alt="Restart" />
                </StartButton> */}
            </div>
        </a>
    )
}
