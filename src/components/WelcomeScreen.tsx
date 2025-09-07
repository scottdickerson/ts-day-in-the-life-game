import React from 'react'

export const WelcomeScreen: React.FC = () => {
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
                className="relative mt-32 text-center font-archivo font-black text-[#3c7748] leading-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] select-none"
                style={{ fontSize: 'clamp(3rem, 12vw, 10.9rem)' }}
            >
                A Cretaceous
                <br />
                Adventure
            </h1>

            {/* Call To Action */}
            <div className="relative mt-16">
                <a
                    href="/select"
                    className="group inline-flex items-center justify-center rounded-full bg-[#3c7748] px-16 py-6 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#3c7748]/40 transition shadow-xl hover:brightness-110 active:scale-[0.97]"
                    style={{ minWidth: 240 }}
                    aria-label="Start the adventure"
                >
                    <span className="text-white font-archivo font-semibold tracking-wide text-5xl leading-none group-hover:translate-y-[1px] transition-transform">
                        Start
                    </span>
                </a>
            </div>

            {/* Subtle foreground flourish (optional placeholder) */}
            <div
                className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white/60 to-transparent"
                aria-hidden="true"
            />
        </div>
    )
}
