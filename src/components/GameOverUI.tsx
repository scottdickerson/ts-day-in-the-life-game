import React from 'react'

interface GameOverUIProps {
    onReset: () => void
}

export const GameOverUI: React.FC<GameOverUIProps> = ({ onReset }) => (
    <div className="text-white text-center w-full z-[2] mt-10">
        <p className="text-[32px] font-semibold mb-4">Your Journey Ends</p>
        <p className="text-[24px] mb-8">
            Thank you for experiencing a day in the life!
        </p>
        <div className="flex justify-center gap-6">
            <button
                onClick={onReset}
                className="bg-[#4093e6] text-white rounded-[100px] w-[220px] h-[70px] font-archivo font-medium text-[28px] cursor-pointer mr-2.5 hover:bg-[#2f86dc] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4093e6]/50"
            >
                Play Again
            </button>
            <a href="/">
                <button className="bg-transparent text-white border-2 border-[#4093e6] rounded-[100px] w-[220px] h-[70px] font-archivo font-medium text-[28px] cursor-pointer hover:bg-[#4093e6]/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4093e6]/50">
                    Return Home
                </button>
            </a>
        </div>
    </div>
)
