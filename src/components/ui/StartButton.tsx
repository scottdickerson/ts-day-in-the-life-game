import React from 'react'

export interface StartButtonProps {
    onClick?: () => void
    href?: string
    children?: React.ReactNode
    className?: string
    variant?: 'primary' | 'secondary'
}

/**
 * StartButton - Reusable start/restart button component
 * Used for navigation to select screen or restarting the game
 */
export const StartButton: React.FC<StartButtonProps> = ({
    onClick,
    href,
    children = 'Start',
    className = '',
    variant = 'primary',
}) => {
    const baseClasses =
        'group inline-flex items-center justify-center rounded-full px-16 py-6 focus:outline-none focus-visible:ring-4 transition shadow-xl hover:brightness-110 active:scale-[0.97] text-white font-archivo font-semibold tracking-wide text-5xl leading-none group-hover:translate-y-[1px] transition-transform'

    const variantClasses =
        variant === 'primary'
            ? 'bg-[#3c7748] focus-visible:ring-[#3c7748]/40'
            : 'bg-[#2a5433] focus-visible:ring-[#2a5433]/40'

    const buttonElement = (
        <span className={`${baseClasses} ${variantClasses} ${className}`}>
            {children}
        </span>
    )

    if (href) {
        return (
            <a href={href} aria-label="Start the adventure">
                {buttonElement}
            </a>
        )
    }

    if (onClick) {
        return (
            <button onClick={onClick} aria-label="Start the adventure">
                {buttonElement}
            </button>
        )
    }

    return buttonElement
}
