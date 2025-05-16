import * as fs from 'fs'
import * as readline from 'readline'
import chalk from 'chalk'

// Interface for a node in the game
export interface GameNode {
    'Code ID': string
    Content: string

    'choice 1': string
    'choice 2': string
}

export class GameEngine {
    protected gameData: Record<string, GameNode> = {}
    protected currentNodeId: string = ''
    private rl: readline.Interface | null = null

    constructor(useTerminal: boolean = true) {
        if (useTerminal && typeof process !== 'undefined') {
            this.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            })
        }
    }

    // Load the game data from JSON file
    public async loadGame(gameFile: string): Promise<boolean> {
        try {
            const rawData = fs.readFileSync(gameFile, 'utf8')
            const arrayData = JSON.parse(rawData)

            // Convert the array to an object with 'Code ID' as keys
            this.gameData = arrayData.reduce(
                (acc: Record<string, GameNode>, node: GameNode) => {
                    acc[node['Code ID']] = node
                    return acc
                },
                {}
            )

            console.log(chalk.green('\n\nWelcome to A Day in the Life!'))
            console.log(chalk.green('-----------------------------------'))
            console.log(chalk.blue(this.gameData['0'].Content))

            // Set the first node as the current node
            this.currentNodeId = '1'

            return true
        } catch (error) {
            console.error('Failed to load game data:', error)
            return false
        }
    }

    returnCurrentNode(): GameNode {
        return this.gameData[this.currentNodeId]
    }

    // Display the current node's content
    private displayCurrentNode(): void {
        const currentNode = this.gameData[this.currentNodeId]
        if (!currentNode) {
            console.error(`Node with ID ${this.currentNodeId} not found!`)
            throw new Error(`Node with ID ${this.currentNodeId} not found!`)
            // Don't use process.exit(1) as it's not available in the browser
        }
        console.log(chalk.green('-----------------------------------'))
        // Output the content to the terminal
        console.log(chalk.blue(currentNode.Content))
        if (currentNode['choice 1'] && currentNode['choice 2']) {
            console.log('\n')
            console.log(chalk.yellow('Choice 1:', currentNode['choice 1']))
            console.log(chalk.magenta('Choice 2:', currentNode['choice 2']))
            console.log(chalk.green('-----------------------------------'))
        }
    }

    // Get user input (1 or 2)
    private async getUserChoice(): Promise<number> {
        if (!this.rl) {
            throw new Error('Terminal interface is not available')
        }

        return new Promise((resolve) => {
            this.rl!.question('Enter your choice (1 or 2): ', (answer) => {
                const choice = parseInt(answer.trim())
                if (choice === 1 || choice === 2) {
                    resolve(choice)
                } else {
                    console.log('Invalid choice. Please enter 1 or 2.')
                    resolve(this.getUserChoice())
                }
            })
        })
    }

    // Move to the next node based on user choice
    moveToNextNode(choice: number): boolean {
        const choiceSuffix = choice === 1 ? 'a' : 'b'
        if (this.currentNodeId.length === 1) {
            // special case where the first node uses different pattern for next choice
            this.currentNodeId = `${this.currentNodeId}${choiceSuffix}`
            return true
        }

        const currentNode = this.gameData[this.currentNodeId]
        const lastDigit = this.currentNodeId.charAt(
            this.currentNodeId.length - 2
        )

        this.currentNodeId = `${currentNode['Code ID']}_${parseInt(lastDigit) + 1}${choiceSuffix}`
        return true
    }

    moveToLastNode(): boolean {
        const lastDigit = this.currentNodeId.charAt(
            this.currentNodeId.length - 2
        )
        this.currentNodeId = `${this.currentNodeId}_${parseInt(lastDigit) + 1}`
        return true
    }

    isGameOver(): boolean {
        const currentNode = this.gameData[this.currentNodeId]
        if (!currentNode['choice 1']) {
            return true
        }
        return false
    }

    // Main game loop
    public async start(gameFile: string): Promise<void> {
        if (!(await this.loadGame(gameFile))) {
            console.error('Failed to start the game.')
            this.rl?.close()
            return
        }

        while (true) {
            this.displayCurrentNode()

            if (this.isGameOver()) {
                this.moveToLastNode()
                this.displayCurrentNode()
                break
            }
            const choice = await this.getUserChoice()
            this.moveToNextNode(choice)
        }

        this.rl?.close()
    }
}

// Export the game engine
export default new GameEngine()
