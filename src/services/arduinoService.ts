import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
import { EventEmitter } from 'events'
import { DinosaurTypeEnum } from '@/components/utils'

export interface ArduinoButtonEvent {
    button: number
    timestamp: number
    type: 'choice' | 'dinosaur' | 'start'
    description?: string
}

export class ArduinoService extends EventEmitter {
    private serialPort: SerialPort | null = null
    private parser: ReadlineParser | null = null
    private isInitialized = false
    private isConnecting = false

    constructor() {
        super()
        this.setupGracefulShutdown()
    }

    async initialize(): Promise<boolean> {
        if (this.isInitialized || this.isConnecting) {
            return this.isInitialized
        }

        this.isConnecting = true
        console.log('🔌 Initializing Arduino connection...')

        try {
            // Get available ports
            const ports = await SerialPort.list()
            console.log(
                '🔍 Available serial ports:',
                ports.map((p) => p.path)
            )

            // Find Arduino port
            let arduinoPort = process.env.ARDUINO_PORT
            if (!arduinoPort) {
                // Auto-detect Arduino (look for common patterns)
                const arduinoPorts = ports.filter(
                    (port) =>
                        port.path.includes('usbmodem') ||
                        port.path.includes('usbserial') ||
                        port.path.includes('ttyUSB') ||
                        port.path.includes('ttyACM')
                )

                if (arduinoPorts.length > 0) {
                    arduinoPort = arduinoPorts[0].path
                    console.log(`🔍 Auto-detected Arduino port: ${arduinoPort}`)
                } else {
                    throw new Error(
                        'No Arduino port found. Please set ARDUINO_PORT environment variable.'
                    )
                }
            }

            console.log(`🔌 Connecting to Arduino on port: ${arduinoPort}`)

            // Create serial connection
            this.serialPort = new SerialPort({
                path: arduinoPort,
                baudRate: 9600,
                autoOpen: false,
            })

            // Create parser for line-by-line reading
            this.parser = this.serialPort.pipe(
                new ReadlineParser({ delimiter: '\n' })
            )

            return new Promise((resolve) => {
                // Handle serial port events
                this.serialPort!.on('open', () => {
                    console.log('✅ Arduino serial connection opened!')
                    this.setupButtonListener()
                    this.isInitialized = true
                    this.isConnecting = false
                    this.emit('connected')
                    resolve(true)
                })

                this.serialPort!.on('error', (error) => {
                    console.error('❌ Arduino serial error:', error.message)
                    this.isConnecting = false
                    this.emit('error', error)
                    resolve(false)
                })

                // Parse incoming data
                this.parser!.on('data', (message: string) => {
                    this.handleSerialData(message)
                })

                // Open the serial port
                this.serialPort!.open()

                // Timeout after 10 seconds
                setTimeout(() => {
                    if (!this.isInitialized) {
                        console.warn(
                            '⏰ Arduino connection timeout - continuing without Arduino'
                        )
                        console.log('💡 Troubleshooting tips:')
                        console.log(
                            '   - Upload arduino-simple-sketch.ino to your Arduino'
                        )
                        console.log('   - Check USB connection')
                        console.log('   - Try different USB port')
                        this.isConnecting = false
                        this.emit('timeout')
                        resolve(false)
                    }
                }, 10000)
            })
        } catch (error) {
            console.error('❌ Failed to initialize Arduino:', error)
            this.isConnecting = false
            this.emit('error', error)
            return false
        }
    }

    private setupButtonListener(): void {
        console.log('🔘 Listening for button presses from Arduino...')
        console.log('✅ Button listener ready - waiting for button presses')
    }

    private handleSerialData(data: string): void {
        // Parse button press data: "BUTTON_PRESS:1:1234567890"
        if (data.startsWith('BUTTON_PRESS:')) {
            const parts = data.split(':')
            if (parts.length === 3) {
                const buttonNumber = parseInt(parts[1])
                const timestamp = parseInt(parts[2])

                // Function to determine button type based on button number
                const getButtonType = (
                    buttonNum: number
                ): 'choice' | 'dinosaur' | 'start' => {
                    if (buttonNum === 1 || buttonNum === 2) return 'choice'
                    if (buttonNum === 8) return 'start'
                    return 'dinosaur'
                }

                const type = getButtonType(buttonNumber)
                const buttonNames = [
                    'Choice 1',
                    'Choice 2',
                    'Agujaceratops',
                    'Kritosaurus',
                    'Tyrannosaurus',
                    'Mosasaurus',
                    'Protohadros',
                    'Start/Select Screen',
                ]

                const event: ArduinoButtonEvent = {
                    button: buttonNumber,
                    timestamp,
                    type,
                    description: buttonNames[buttonNumber - 1],
                }

                const emoji =
                    type === 'choice'
                        ? buttonNumber === 1
                            ? '🔴'
                            : '🔵'
                        : type === 'start'
                          ? '🏠'
                          : '🦕'

                console.log(
                    `${emoji} Button ${buttonNumber} pressed (${buttonNames[buttonNumber - 1]})`
                )
                this.emit('buttonPress', event)
            }
        } else if (data.includes('Arduino Dinosaur Game Controller Ready!')) {
            console.log('✅ Arduino controller is ready!')
        }
    }

    isConnected(): boolean {
        return this.isInitialized && this.serialPort?.isOpen === true
    }

    async disconnect(): Promise<void> {
        if (this.serialPort) {
            console.log('🔌 Disconnecting Arduino...')

            // Remove all event listeners first
            this.removeAllListeners()

            await new Promise<void>((resolve) => {
                this.serialPort!.close((err) => {
                    if (err) {
                        console.error('Error closing serial port:', err)
                    } else {
                        console.log('✅ Arduino disconnected')
                    }
                    resolve()
                })
            })

            this.serialPort = null
            this.parser = null
            this.isInitialized = false
        }
    }

    private setupGracefulShutdown(): void {
        const cleanup = async () => {
            console.log('🛑 Shutting down Arduino service...')
            await this.disconnect()
            process.exit(0)
        }

        process.on('SIGINT', cleanup)
        process.on('SIGTERM', cleanup)
        process.on('exit', cleanup)
    }
}

// Export singleton instance
export const arduinoService = new ArduinoService()
