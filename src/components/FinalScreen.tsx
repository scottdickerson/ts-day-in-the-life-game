import React from 'react'
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
        <div
            className="relative w-screen h-screen overflow-hidden font-archivo text-white select-none"
            role="group"
            aria-label="Final outcome"
        >
            {/* Background environment */}
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${determineBackground(state, dinosaurType)})`,
                }}
                aria-hidden="true"
            />

            <img
                className="absolute top-[156px] left-1/2 -translate-x-1/2 w-[783px] h-[685px] "
                src={determineDinoImage(dinosaurType, reaction, true)}
            />

            {/* Message */}
            <div className="absolute left-1/2 top-[950px] -translate-x-1/2 -translate-y-1/2 w-[1350px] flex flex-col justify-center text-center">
                <p className="text-[44px] md:text-[55px] leading-[1.25] font-medium drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
                    {message}
                </p>
            </div>
            <button
                className="absolute bottom-[86px] right-[144px]"
                onClick={onRestart}
            >
                <img src="DinoFinalAssets/restart.svg" />
            </button>
        </div>
    )
}
