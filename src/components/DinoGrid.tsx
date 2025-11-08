import React from 'react'
import { dinos } from '@/data/siteData'
import { DinosaurTypeEnum } from '@/components/utils'
import { SelectIndividualDinosaur } from './SelectIndividualDinosaur'

export interface DinoGridProps {
    selectedDinoId?: DinosaurTypeEnum
    /**
     * Optional ref to attach to the selected dinosaur element
     * Used for position calculations in animations
     */
    selectedDinoRef?: React.RefObject<HTMLDivElement>
    /**
     * When true, applies transform styles to the selected dinosaur
     */
    transformStyle?: React.CSSProperties
    /**
     * Additional className for the grid container
     */
    className?: string
    /**
     * When true, applies transition animations to the selected dinosaur
     */
    shouldAnimate?: boolean
}

/**
 * DinoGrid - Shared layout component for displaying dinosaurs in a grid
 *
 * Used in both DinoSelectScreen (shows all dinos with links) and DinoStartScreen
 * (shows only selected dino for animation positioning).
 *
 * @param selectedDinoId - If provided, only shows this dinosaur and hides the title
 * @param selectedDinoRef - Ref to attach to the selected dinosaur for animations
 * @param transformStyle - CSS transform to apply to the selected dinosaur
 * @param className - Additional classes for the container
 */
export const DinoGrid: React.FC<DinoGridProps> = ({
    selectedDinoId,
    selectedDinoRef,
    transformStyle,
    className = '',
    shouldAnimate = true,
}) => {
    const showAllDinos = !selectedDinoId

    return (
        <div className={`w-screen h-screen flex flex-col ${className} `}>
            <div className="absolute top-[200px] flex flex-wrap gap-[120px] gap-y-0 justify-center items-center px-[40px]">
                {dinos.map((dino, index) => {
                    const isSelected = selectedDinoId === dino.id
                    const shouldRender = showAllDinos || isSelected

                    return (
                        <div
                            key={dino.id}
                            className={`${index >= 3 ? '-translate-y-20' : '-translate-y-10'} relative`}
                        >
                            {shouldRender ? (
                                showAllDinos ? (
                                    // DinoSelectScreen mode - render as clickable links
                                    <a
                                        href={`/${dino.id.toLowerCase()}.welcome`}
                                        className="z-10 hover:scale-105 transition cursor-pointer no-underline relative block"
                                    >
                                        <SelectIndividualDinosaur {...dino} />
                                    </a>
                                ) : (
                                    // DinoStartScreen mode - render with ref and transform
                                    <div
                                        ref={
                                            isSelected
                                                ? selectedDinoRef
                                                : undefined
                                        }
                                        className={
                                            shouldAnimate
                                                ? 'transition-all duration-1000 ease-out'
                                                : ''
                                        }
                                        style={
                                            isSelected
                                                ? transformStyle
                                                : undefined
                                        }
                                    >
                                        <SelectIndividualDinosaur
                                            {...dino}
                                            height={450}
                                            showName={false}
                                        />
                                    </div>
                                )
                            ) : (
                                // Placeholder to maintain grid layout
                                <div
                                    style={{ height: '450px', width: '467px' }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
