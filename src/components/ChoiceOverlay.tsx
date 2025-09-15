import React from 'react'
import type { GameNode } from '@/utils/gameEngine'
import { GameOverUI } from './GameOverUI'

interface ChoiceOverlayProps {
    currentNode: GameNode
    isGameOver: boolean
    onChoice: (choice: number) => void
    onMoveToLastNode: () => void
    onReset: () => void
}

export const ChoiceOverlay: React.FC<ChoiceOverlayProps> = ({
    currentNode,
    isGameOver,
    onChoice,
    onMoveToLastNode,
    onReset,
}) => (
    <div className="absolute left-0 right-0 bottom-0 h-fit bg-black/60 rounded-tr-[80px] z-[1] flex flex-col justify-between items-start pl-[560px] pr-[75px] mx-[180px]">
        <div className="text-white font-archivo font-medium text-[33px] leading-[45px] mb-10 mt-16 max-w-[985px] z-[2] whitespace-pre-line">
            {currentNode.Content}
        </div>
        {!isGameOver && currentNode['choice 1'] && currentNode['choice 2'] && (
            <div className="flex gap-8 mb-12 z-[2]">
                <button
                    onClick={() => onChoice(1)}
                    className="bg-[#4093e6] text-white rounded-[100px] w-[410px] h-[100px] font-archivo font-medium text-[35px] cursor-pointer mr-5 shadow-[0_0_30px_0_rgba(0,0,0,0.15)] transition-colors duration-200 hover:bg-[#2f86dc] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4093e6]/50"
                >
                    {currentNode['choice 1']}
                </button>
                <button
                    onClick={() => onChoice(2)}
                    className="bg-[#4093e6] text-white rounded-[100px] w-[410px] h-[100px] font-archivo font-medium text-[35px] cursor-pointer shadow-[0_0_30px_0_rgba(0,0,0,0.15)] transition-colors duration-200 hover:bg-[#2f86dc] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4093e6]/50"
                >
                    {currentNode['choice 2']}
                </button>
            </div>
        )}
        {!isGameOver && !currentNode['choice 1'] ? (
            <button
                onClick={() => onMoveToLastNode()}
                className="bg-[#4093e6] text-white rounded-[100px] mb-12 w-[410px] h-[100px] font-archivo font-medium text-[35px] cursor-pointer mr-5 shadow-[0_0_30px_0_rgba(0,0,0,0.15)] transition-colors duration-200 hover:bg-[#2f86dc] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4093e6]/50"
            >
                Continue
            </button>
        ) : null}
        {isGameOver && <GameOverUI onReset={onReset} />}
    </div>
)
