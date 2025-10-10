import React from 'react'

interface Button2Props {
    children: React.ReactNode
    onClick: () => void
}

/**
 * Button2 - Secondary action button with back icon
 * Dark semi-transparent button used for secondary actions in the game
 */
export const Button2: React.FC<Button2Props> = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="bg-[#00000080] flex gap-6 items-center text-white rounded-[100px]  pl-4 pr-16 py-4 text-[35px] font-medium tracking-wide hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-black/40"
    >
        <img
            className="w-[70px] h-[70px]"
            src="Button Assets/Button2.webp"
            alt=""
        />
        {children}
    </button>
)
