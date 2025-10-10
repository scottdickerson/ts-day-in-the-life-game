import React from 'react'
import type { DinoOverview } from '@/data/siteData'

export interface SelectIndividualDinosaurProps extends DinoOverview {
    /** different based on consumer */
    height?: number
    /** Additional CSS classes for the container */
    className?: string
    /** Whether to show the namew */
    showName?: boolean
    /** float minimum */
    floatMin?: number
    /** delay start of float */
    delayFloat?: boolean
}

/**
 * SelectIndividualDinosaur
 *
 * A reusable component that wraps both the dinosaur image and drop shadow.
 * Can be used in both DinoSelectScreen and DinoStartScreen with different styling.
 */
export const SelectIndividualDinosaur: React.FC<
    SelectIndividualDinosaurProps
> = ({
    name,
    image,
    height = 450,
    className = '',
    showName = true,
    floatMin = 10,
    delayFloat = false,
}) => {
    const dropShadowSrc = '/SelectedIndividualScreenAssets/dropShadow.svg'

    // Generate random values for floating animation
    const randomFloatHeight = React.useMemo(
        () => Math.floor(Math.random() * 10) + floatMin,
        []
    ) // 10-20px
    const randomDuration = React.useMemo(
        () => (Math.random() * 2 + 5).toFixed(2),
        []
    ) // 3-5 seconds
    const randomDelay = delayFloat
        ? React.useMemo(() => (Math.random() * 2).toFixed(2), [])
        : '0'

    return (
        <div
            style={{
                height: `${height}px`,
                ['--float-height' as string]: `${randomFloatHeight}px`,
                ['--float-duration' as string]: `${randomDuration}s`,
                ['--float-delay' as string]: `${randomDelay}s`,
            }}
            className={`relative flex flex-col items-center animate-float ${className} aspect-[189/178]`}
        >
            <img
                src={image}
                style={{ height: `${height * 0.85}px` }}
                alt={name}
                className={`object-contain z-10`}
                draggable={false}
            />

            <img
                src={dropShadowSrc}
                alt=""
                className="absolute -bottom-2 -left-2 -right-2 w-full"
            />

            {showName && (
                <span className="pt-4 text-[45px] font-archivo font-medium text-[#0F266A] tracking-wide drop-shadow italic">
                    {name}
                </span>
            )}
        </div>
    )
}
