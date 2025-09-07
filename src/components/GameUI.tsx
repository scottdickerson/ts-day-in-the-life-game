import React, { useState, useEffect } from 'react'
import { GameEngine } from '@/utils/gameEngine'
import type { GameNode } from '@/utils/gameEngine'
import DinosaurSceneBackground from './DinosaurSceneBackground'
import DinosaurOnChoiceScreen from './DinosaurOnChoiceScreen'
import { Button } from './ui/button'

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
    dinosaurType?: 'Aguja' | 'Krito' | 'Mosa' | 'Protos' | 'Tyranno'
}

export const GameUI: React.FC<GameUIProps> = ({
    gameDataUrl,
    dinosaurType = 'Aguja',
}) => {
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

            const calculatedProgress = Math.min((stage / 7) * 100, 100)
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
        setProgress(100 / 7) // 1/7 * 100 (first stage)
    }

    if (isLoading) {
        return <div className="p-8 text-center">Loading game data...</div>
    }

    if (!gameStarted) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-slate-100 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
                    Choose Your Own Adventure
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

    // Figma-inspired layout
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '1080px',
                overflow: 'hidden',
                background: '#fff',
            }}
        >
            {/* Scene background */}
            <DinosaurSceneBackground
                dinosaurType={dinosaurType}
                codeId={currentNode['Code ID']}
            />

            {/* Overlay for text and choices */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 400,
                    background: 'rgba(0,0,0,0.6)',
                    borderTopRightRadius: 80,
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    paddingLeft: '560px',
                    paddingRight: '75px',
                    alignItems: 'flex-start',
                    margin: '0 180px',
                }}
            >
                {/* Main content/question */}
                <div
                    style={{
                        color: '#fff',
                        fontFamily: 'Archivo, sans-serif',
                        fontWeight: 500,
                        fontSize: 33,
                        lineHeight: '45px',
                        marginBottom: 40,
                        marginTop: 32,
                        maxWidth: 985,
                        zIndex: 2,
                    }}
                >
                    {currentNode.Content}
                </div>

                {/* Choices */}
                {!isGameOver &&
                    currentNode['choice 1'] &&
                    currentNode['choice 2'] && (
                        <div
                            style={{
                                display: 'flex',
                                gap: 50,
                                marginBottom: 40,
                                zIndex: 2,
                            }}
                        >
                            <button
                                onClick={() => handleChoice(1)}
                                style={{
                                    background: '#4093e6',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 100,
                                    width: 410,
                                    height: 100,
                                    fontFamily: 'Archivo, sans-serif',
                                    fontWeight: 500,
                                    fontSize: 35,
                                    cursor: 'pointer',
                                    marginRight: 20,
                                    boxShadow: '0 0 30px 0 rgba(0,0,0,0.15)',
                                    transition: 'background 0.2s',
                                }}
                            >
                                {currentNode['choice 1']}
                            </button>
                            <button
                                onClick={() => handleChoice(2)}
                                style={{
                                    background: '#4093e6',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 100,
                                    width: 410,
                                    height: 100,
                                    fontFamily: 'Archivo, sans-serif',
                                    fontWeight: 500,
                                    fontSize: 35,
                                    cursor: 'pointer',
                                    boxShadow: '0 0 30px 0 rgba(0,0,0,0.15)',
                                    transition: 'background 0.2s',
                                }}
                            >
                                {currentNode['choice 2']}
                            </button>
                        </div>
                    )}

                {/* Game Over UI */}
                {isGameOver && (
                    <div
                        style={{
                            color: '#fff',
                            textAlign: 'center',
                            width: '100%',
                            zIndex: 2,
                            marginTop: 40,
                        }}
                    >
                        <p
                            style={{
                                fontSize: 32,
                                fontWeight: 600,
                                marginBottom: 16,
                            }}
                        >
                            Your Journey Ends
                        </p>
                        <p style={{ fontSize: 24, marginBottom: 32 }}>
                            Thank you for experiencing a day in the life!
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 24,
                            }}
                        >
                            <button
                                onClick={resetGame}
                                style={{
                                    background: '#4093e6',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 100,
                                    width: 220,
                                    height: 70,
                                    fontFamily: 'Archivo, sans-serif',
                                    fontWeight: 500,
                                    fontSize: 28,
                                    cursor: 'pointer',
                                    marginRight: 10,
                                }}
                            >
                                Play Again
                            </button>
                            <a href="/">
                                <button
                                    style={{
                                        background: 'transparent',
                                        color: '#fff',
                                        border: '2px solid #4093e6',
                                        borderRadius: 100,
                                        width: 220,
                                        height: 70,
                                        fontFamily: 'Archivo, sans-serif',
                                        fontWeight: 500,
                                        fontSize: 28,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Return Home
                                </button>
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* Dinosaur reaction image */}
            <DinosaurOnChoiceScreen
                dinosaurType={dinosaurType}
                reactionLabel={currentNode['reaction label'] ?? 'neutral'}
            />
        </div>
    )
}

export default GameUI
