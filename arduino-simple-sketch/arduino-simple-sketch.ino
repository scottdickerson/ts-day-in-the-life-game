/*
 * Simple Arduino Sketch for Dinosaur Game
 * 
 * This sketch doesn't use Firmata - it just reads buttons and sends data
 * Upload this to your Arduino Uno or compatible board.
 * 
 * Hardware Setup:
 * - Button 1: Connect one terminal to pin 2, other to GND
 * - Button 2: Connect one terminal to pin 3, other to GND
 * - Button 3: Connect one terminal to pin 4, other to GND
 * - Button 4: Connect one terminal to pin 5, other to GND
 * - Button 5: Connect one terminal to pin 6, other to GND
 * - Button 6: Connect one terminal to pin 7, other to GND
 * - Button 7: Connect one terminal to pin 8, other to GND
 * - Button 8: Connect one terminal to pin 9, other to GND
 * - No external resistors needed (using internal pullup resistors)
 */

// Button pins
const int BUTTON_PINS[] = {2, 3, 4, 5, 6, 7, 8, 9};
const int NUM_BUTTONS = 8;

// Button states
bool lastButtonStates[NUM_BUTTONS] = {false};
bool currentButtonStates[NUM_BUTTONS] = {false};

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  
  // Configure button pins as inputs with internal pullup resistors
  for (int i = 0; i < NUM_BUTTONS; i++) {
    pinMode(BUTTON_PINS[i], INPUT_PULLUP);
  }
  
  // Configure built-in LED
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);

  // LED button indicator
  pinMode(11,OUTPUT);
  
  Serial.println("Arduino Dinosaur Game Controller Ready!");
  Serial.println("Button pins: 2, 3, 4, 5, 6, 7, 8, 9");
}

void loop() {
  // Read all button states
  for (int i = 0; i < NUM_BUTTONS; i++) {
    currentButtonStates[i] = !digitalRead(BUTTON_PINS[i]); // Inverted because of pullup
    
    // Check for button press (transition from not pressed to pressed)
    if (currentButtonStates[i] && !lastButtonStates[i]) {
      // Button was just pressed
      Serial.print("BUTTON_PRESS:");
      Serial.print(i + 1); // Button numbers 1-8
      Serial.print(":");
      Serial.print(millis()); // Timestamp
      Serial.println();
      digitalWrite(11,HIGH);
    } else {
      digitalWrite(11,LOW);
    }
    
    // Update last state
    lastButtonStates[i] = currentButtonStates[i];
  }
  
  // Small delay to prevent bouncing
  delay(10);
}