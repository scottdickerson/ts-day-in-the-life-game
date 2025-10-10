import React, { useState, useEffect } from 'react'
import { GameEngine } from '@/utils/gameEngine'
import type { GameNode } from '@/utils/gameEngine'
import DinosaurSceneBackground from './DinosaurSceneBackground'
import DinosaurOnChoiceScreen from './DinosaurOnChoiceScreen'
import { ChoiceOverlay } from './ChoiceOverlay'
import { ControlButtons } from './ControlButtons'
import { FinalScreen } from './FinalScreen'
import { DinosaurTypeEnum } from './utils'

// Create a client-side only version of GameEngine by extending the base GameEngine
class WebGameEngine extends GameEngine {
    constructor() {
        // Pass false to indicate we're not using the terminal interface
        super(false)
    }

    // Override the loadGame method to work with pre-loaded JSON data instead of file reading
    public override async loadGame(gameData: any): Promise<boolean> {
        try {
            // Convert the array to an object with 'Code ID' as keys
            this.gameData = gameData.reduce(
                (acc: Record<string, GameNode>, node: GameNode) => {
                    acc[node['Code ID']] = node
                    return acc
                },
                {}
            )

            // Set the first node as the current node
            this.currentNodeId = '1'
            return true
        } catch (error) {
            console.error('Failed to load game data:', error)
            return false
        }
    }

    // We're inheriting these methods from GameEngine:
    // - returnCurrentNode()
    // - moveToNextNode(choice: number)
    // - moveToLastNode()
    // - isGameOver()
}

interface GameUIProps {
    gameDataUrl: string
    dinosaurType?: DinosaurTypeEnum
}

export const GameUI: React.FC<GameUIProps> = ({
    gameDataUrl,
    dinosaurType = DinosaurTypeEnum.Aguja,
}) => {
    const [gameEngine] = useState(new WebGameEngine())
    const [currentNode, setCurrentNode] = useState<GameNode | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isGameOver, setIsGameOver] = useState(false)
    const [_gameStarted, setGameStarted] = useState(false)
    const [_welcomeMessage, setWelcomeMessage] = useState('')
    const [_progress, setProgress] = useState(0)
    const [_nodeHistory, setNodeHistory] = useState<string[]>([])

    useEffect(() => {
        const loadGame = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(gameDataUrl)
                const gameData = await response.json()

                // Store welcome message from node '0'
                const welcomeNode = gameData.find(
                    (node: GameNode) => node['Code ID'] === '0'
                )
                if (welcomeNode) {
                    setWelcomeMessage(welcomeNode.Content)
                }

                await gameEngine.loadGame(gameData)
                setGameStarted(true)
                setCurrentNode(gameEngine.returnCurrentNode())
                setIsLoading(false)
            } catch (error) {
                console.error('Failed to load game:', error)
                setIsLoading(false)
            }
        }

        loadGame()
    }, [gameDataUrl, gameEngine])

    const handleBack =
        gameEngine.returnCurrentNode()?.['Code ID']?.length === 1
            ? undefined
            : () => {
                  gameEngine.moveToPreviousNode()
                  const node = gameEngine.returnCurrentNode()
                  setCurrentNode(node)
              }

    const handleChoice = (choice: number) => {
        // Store current node ID in history
        if (currentNode) {
            setNodeHistory((prev) => [...prev, currentNode['Code ID']])
        }

        gameEngine.moveToNextNode(choice)
        const node = gameEngine.returnCurrentNode()
        setCurrentNode(node)

        // Update progress based on the node ID structure
        // The node IDs follow a pattern like: 1a, 1a_2a, 1a_2a_3b, etc.
        const nodeId = node['Code ID']
        if (nodeId) {
            // Count underscores to determine depth
            const underscoreCount = (nodeId.match(/_/g) || []).length

            // If there's no underscore but it has 'a' or 'b', it's stage 1
            let stage = 0
            if (nodeId.includes('a') || nodeId.includes('b')) {
                stage = 1
            }

            // Add the number of underscores to get deeper stages
            stage += underscoreCount

            const calculatedProgress = Math.min((stage / 7) * 100, 100)
            console.log(
                `Node ID: ${nodeId}, Stage: ${stage}, Progress: ${calculatedProgress}%`
            )
            setProgress(calculatedProgress)
        }
    }

    const handleMoveToLastNode = () => {
        gameEngine.moveToLastNode()
        setCurrentNode(gameEngine.returnCurrentNode())
        setIsGameOver(true)
        // Ensure progress is 100% when game is over
        setProgress(100)
        return
    }
    const resetGame = () => {
        window.location.pathname = '/'
    }

    if (isLoading) {
        return <div className="p-8 text-center">Loading game data...</div>
    }

    if (!currentNode) {
        return <div className="p-8 text-center">Error loading game node</div>
    }
    if (isGameOver) {
        return (
            <FinalScreen
                message={currentNode.Content}
                dinosaurType={dinosaurType}
                onRestart={resetGame}
                reaction={currentNode['reaction label'] ?? ''}
            />
        )
    }

    // Figma-inspired layout
    return (
        <div className="relative w-full min-h-[1080px] overflow-hidden bg-white">
            {/* Scene background */}
            <DinosaurSceneBackground
                dinosaurType={dinosaurType}
                codeId={currentNode['Code ID']}
            />
            <ControlButtons onBack={handleBack} />

            <ChoiceOverlay
                currentNode={currentNode}
                isGameOver={isGameOver}
                onChoice={handleChoice}
                onMoveToLastNode={handleMoveToLastNode}
                onReset={resetGame}
            />

            {/* Dinosaur reaction image */}
            <DinosaurOnChoiceScreen
                dinosaurType={dinosaurType}
                reactionLabel={currentNode['reaction label'] ?? 'neutral'}
            />
        </div>
    )
}
