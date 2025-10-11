# Arduino Wiring Diagram for Dinosaur Game

## Overview

This diagram shows how to wire 8 buttons to an Arduino Uno for the Dinosaur Choose-Your-Own-Adventure game.

## Button Layout

### Choice Buttons (Game Navigation)

- **Button 1 (Pin 2)**: Choice 1 - Blue button in game
- **Button 2 (Pin 3)**: Choice 2 - Dark button in game

### Dinosaur Selection Buttons

- **Button 3 (Pin 4)**: Agujaceratops (Aguja)
- **Button 4 (Pin 5)**: Kritosaurus (Krito)
- **Button 5 (Pin 6)**: Tyrannosaurus (Tyranno)
- **Button 6 (Pin 7)**: Mosasaurus (Mosa)
- **Button 7 (Pin 8)**: Protohadros (Protos)

### Navigation Button

- **Button 8 (Pin 9)**: Start/Select Screen

## Wiring Instructions

### Materials Needed

- 1x Arduino Uno (or compatible)
- 8x Push buttons
- 1x Breadboard
- Jumper wires (male-to-male)
- No external resistors needed (using internal pullup resistors)

### Connections

Each button connects to:

- **One terminal** → Arduino digital pin (2, 3, 4, 5, 6, 7, 8, 9)
- **Other terminal** → Arduino GND

### Pin Assignments

```
Arduino Pin 2  → Choice 1 Button
Arduino Pin 3  → Choice 2 Button
Arduino Pin 4  → Agujaceratops Button
Arduino Pin 5  → Kritosaurus Button
Arduino Pin 6  → Tyrannosaurus Button
Arduino Pin 7  → Mosasaurus Button
Arduino Pin 8  → Protohadros Button
Arduino Pin 9  → Start/Select Button
```

## Physical Layout

```
[Choice 1] [Choice 2] [Aguja]
[Krito]    [Tyranno]  [Mosa]
[Protos]   [Start]
```

## Usage

1. Upload the provided Arduino sketch `arduino-simple-sketch.ino`
2. Connect Arduino via USB
3. Run the game with `npm run dev:node`
4. Physical buttons will work alongside UI buttons
5. Dinosaur buttons can be used for quick character selection
6. Start button returns to the character selection screen

## Notes

- All buttons use internal pullup resistors (no external resistors needed)
- Game works without Arduino connected (UI buttons as fallback)
- Buttons are debounced in software
- LED on pin 13 blinks to show Arduino is working
