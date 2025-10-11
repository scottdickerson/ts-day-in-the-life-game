import React from 'react'
import { StartButton } from './ui/StartButton'

export const PullScreen: React.FC = () => {
    return (
        <div
            className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-start bg-[#e3f2e6]"
            aria-label="Welcome screen"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{
                    backgroundImage:
                        'url(/WelcomeScreenAssets/CretaceousBackground.svg)',
                }}
                aria-hidden="true"
            />

            {/* Title */}
            <h1
                className="relative mt-40 text-center font-archivo font-black text-[#3c7748] leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] select-none"
                style={{ fontSize: 'clamp(3rem, 12vw, 10.9rem)' }}
            >
                {/* A Cretaceous
                <br />
                Adventure */}
                <img src="TitleScreenAssets/Title.png"></img>
            </h1>

            {/* Call To Action */}
            <div className="relative mt-16">
                <StartButton href="/select" />
            </div>
        </div>
    )
}
