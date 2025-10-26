import React from 'react'

interface Button1Props {
    children: React.ReactNode
    onClick: () => void
}

/**
 * Button1 - Primary action button with play icon
 * Blue rounded button used for primary actions in the game
 */
export const Button1: React.FC<Button1Props> = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="bg-[#00000080] flex gap-6 items-center text-white rounded-[100px] pl-4 pr-16 py-4 font-archivo font-medium text-[35px] cursor-pointer shadow-[0_0_30px_0_rgba(0,0,0,0.15)] transition-colors duration-200  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4093e6]/50 text-nowrap"
    >
        <img
            className="w-[70px] h-[70px]"
            src="Button Assets/Button1.webp"
            alt=""
        />
        <span>{children}</span>
    </button>
)
