import React from 'react'
import type { GameNode } from '@/utils/gameEngine'
import { GameOverUI } from './GameOverUI'
import { Button1 } from './ui/Button1'
import { Button2 } from './ui/Button2'

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
    <div className="absolute left-0 right-0 bottom-0 h-fit bg-black/40 rounded-tl-[80px] rounded-tr-[80px] z-[1] flex flex-col justify-between items-start pl-[560px] pr-[75px] mx-[180px]">
        <div className="text-white font-archivo font-medium text-[33px] leading-[45px] mb-10 mt-16 max-w-[985px] z-[2] whitespace-pre-line">
            {currentNode.Content}
        </div>
        {!isGameOver && currentNode['choice 1'] && currentNode['choice 2'] && (
            <div className="flex gap-8 mb-12 z-[2]">
                <Button1 onClick={() => onChoice(1)}>
                    {currentNode['choice 1']}
                </Button1>
                <Button2 onClick={() => onChoice(2)}>
                    {currentNode['choice 2']}
                </Button2>
            </div>
        )}
        {!isGameOver && !currentNode['choice 1'] ? (
            <div className="mb-12">
                <Button1 onClick={() => onMoveToLastNode()}>Continue</Button1>
            </div>
        ) : null}
        {isGameOver && <GameOverUI onReset={onReset} />}
    </div>
)
