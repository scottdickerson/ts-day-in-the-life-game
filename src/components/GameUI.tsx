import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { GameEngine } from '@/utils/gameEngine'
import type { GameNode } from '@/utils/gameEngine'

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
}

export const GameUI: React.FC<GameUIProps> = ({ gameDataUrl }) => {
    const [gameEngine] = useState(new WebGameEngine())
    const [currentNode, setCurrentNode] = useState<GameNode | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isGameOver, setIsGameOver] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [welcomeMessage, setWelcomeMessage] = useState('')
    const [progress, setProgress] = useState(0)
    const [nodeHistory, setNodeHistory] = useState<string[]>([])

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

            const calculatedProgress = Math.min((stage / 5) * 100, 100)
            console.log(
                `Node ID: ${nodeId}, Stage: ${stage}, Progress: ${calculatedProgress}%`
            )
            setProgress(calculatedProgress)
        }

        if (gameEngine.isGameOver()) {
            gameEngine.moveToLastNode()
            setCurrentNode(gameEngine.returnCurrentNode())
            setIsGameOver(true)
            // Ensure progress is 100% when game is over
            setProgress(100)
        }
    }

    const resetGame = () => {
        window.location.reload()
    }

    const startGame = () => {
        setGameStarted(true)
        // Initialize progress at the first stage
        setProgress(14.3) // ~1/7 * 100 (first stage)
    }

    if (isLoading) {
        return <div className="p-8 text-center">Loading game data...</div>
    }

    if (!gameStarted) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-slate-100 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
                    A Day in the Life
                </h1>
                <div className="mb-8 text-center">
                    <p className="text-lg text-blue-600 whitespace-pre-line">
                        {welcomeMessage}
                    </p>
                </div>
                <div className="flex justify-center">
                    <Button
                        variant="default"
                        size="lg"
                        onClick={startGame}
                        className="px-8 py-4 text-lg"
                    >
                        Start Game
                    </Button>
                </div>
            </div>
        )
    }

    if (!currentNode) {
        return <div className="p-8 text-center">Error loading game node</div>
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-b from-slate-50 to-slate-200 rounded-lg shadow-lg border border-slate-300 animate-fade-in">
            <h1 className="text-3xl font-bold text-center mb-6 text-green-600 animate-pulse-slow">
                A Day in the Life
            </h1>

            {gameStarted && (
                <div className="mb-6">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            <div className="mb-8 bg-white p-6 rounded-md shadow-inner border border-slate-200 transition-all duration-500 animate-slide-in">
                <p className="text-lg text-blue-600 whitespace-pre-line leading-relaxed">
                    {currentNode.Content}
                </p>
            </div>

            {!isGameOver &&
                currentNode['choice 1'] &&
                currentNode['choice 2'] && (
                    <div className="space-y-4 animate-fade-in-slow">
                        <Button
                            variant="default"
                            onClick={() => handleChoice(1)}
                            className="w-full py-4 text-left px-5 bg-yellow-500 hover:bg-yellow-600 hover:translate-x-1 transform transition-all duration-300 shadow-md"
                        >
                            <span className="font-medium text-yellow-900">
                                Choice 1:
                            </span>{' '}
                            {currentNode['choice 1']}
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => handleChoice(2)}
                            className="w-full py-4 text-left px-5 bg-purple-500 hover:bg-purple-600 text-white hover:translate-x-1 transform transition-all duration-300 shadow-md"
                        >
                            <span className="font-medium text-purple-200">
                                Choice 2:
                            </span>{' '}
                            {currentNode['choice 2']}
                        </Button>
                    </div>
                )}

            {isGameOver && (
                <div className="text-center mt-8 p-6 border-2 border-green-500 rounded-lg bg-green-50 animate-fade-in shadow-lg">
                    <p className="text-2xl font-semibold mb-4 text-green-700">
                        Your Journey Ends
                    </p>
                    <p className="mb-6 text-green-600">
                        Thank you for experiencing a day in the life!
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button
                            variant="outline"
                            onClick={resetGame}
                            className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300"
                        >
                            Play Again
                        </Button>
                        <a href="/">
                            <Button
                                variant="outline"
                                className="border-green-600 text-green-700 hover:bg-green-50"
                            >
                                Return Home
                            </Button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GameUI
