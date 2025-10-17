import React from 'react'

export const PullScreen: React.FC = () => {
    return (
        <a
            className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-start bg-[#e3f2e6]"
            aria-label="Welcome screen"
            href="/select"
        >
            {/* Background */}
            <video
                className="absolute inset-0 bg-cover bg-center scale-110 z-0"
                src="/TitleScreenAssets/pullScreenLoop.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
            />

            {/* Title */}
            <h1
                className="relative mt-40 text-center font-archivo font-black text-[#3c7748] leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] select-none z-10"
                style={{ fontSize: 'clamp(3rem, 12vw, 10.9rem)' }}
            >
                {/* A Cretaceous
                <br />
                Adventure */}
                <img src="TitleScreenAssets/Title.png"></img>
            </h1>

            {/* Call To Action
            <div className="relative mt-16">
                <StartButton href="/select" />
            </div> */}
        </a>
    )
}
