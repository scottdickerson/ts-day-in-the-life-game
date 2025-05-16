import GameEngine from './gameEngine.ts'
// Get the game file from command line arguments
const args = process.argv.slice(2)
const gameFile = args[0]

if (!gameFile) {
    console.error('Error: Game file path is required')
    console.log('Usage: ts-node commandLineRunner.ts <path-to-game-file>')
    process.exit(1)
}

// Pass the game file path to the engine
GameEngine.start(gameFile)
