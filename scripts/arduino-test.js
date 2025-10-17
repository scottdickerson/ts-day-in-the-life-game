import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'

console.log('🔍 Testing Arduino Serial Connection...')

async function testArduinoConnection() {
    try {
        // Get available ports
        const ports = await SerialPort.list()
        console.log('📋 Available serial ports:')
        ports.forEach((port) => {
            console.log(`   - ${port.path} (${port.manufacturer || 'Unknown'})`)
        })

        // Find Arduino port
        let arduinoPort = process.env.ARDUINO_PORT
        if (!arduinoPort) {
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
                console.error('❌ No Arduino port found!')
                console.log('💡 Try setting ARDUINO_PORT environment variable')
                process.exit(1)
            }
        }

        console.log(`🔌 Connecting to Arduino on port: ${arduinoPort}`)

        // Create serial connection
        const serialPort = new SerialPort({
            path: arduinoPort,
            baudRate: 9600,
            autoOpen: false,
        })

        // Create parser for line-by-line reading
        const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }))

        // Handle serial port events
        serialPort.on('open', () => {
            console.log('✅ Arduino serial connection opened!')
            console.log('🎮 Press buttons on your Arduino to test...')
            console.log('📝 Expected format: BUTTON_PRESS:1:timestamp')
        })

        serialPort.on('error', (error) => {
            console.error('❌ Arduino serial error:', error.message)
            process.exit(1)
        })

        // Parse incoming data
        parser.on('data', (data) => {
            const message = data.toString().trim()
            console.log(`📨 Received: ${message}`)

            if (message.startsWith('BUTTON_PRESS:')) {
                const parts = message.split(':')
                if (parts.length === 3) {
                    const buttonNumber = parseInt(parts[1])

                    const buttonNames = [
                        'Choice 1',
                        'Choice 2',
                        'Agujaceratops',
                        'Kritosaurus',
                        'Tyrannosaurus',
                        'Mosasaurus',
                        'Protostega',
                        'Start/Select Screen',
                    ]

                    const emoji =
                        buttonNumber <= 2
                            ? buttonNumber === 1
                                ? '🔴'
                                : '🔵'
                            : buttonNumber === 8
                              ? '🏠'
                              : '🦕'

                    console.log(
                        `${emoji} Button ${buttonNumber} pressed (${buttonNames[buttonNumber - 1]})`
                    )
                }
            } else if (
                message.includes('Arduino Dinosaur Game Controller Ready!')
            ) {
                console.log('✅ Arduino controller is ready!')
            }
        })

        // Open the serial port
        serialPort.open()

        // Keep the process running
        console.log(
            '⏳ Listening for Arduino messages... (Press Ctrl+C to exit)'
        )
    } catch (error) {
        console.error('❌ Failed to test Arduino connection:', error)
        process.exit(1)
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down Arduino test...')
    process.exit(0)
})

// Run the test
testArduinoConnection()
