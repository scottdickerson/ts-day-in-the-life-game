# Project Setup

This project requires `git lfs` to be installed. If you don't have it installed, you can install it by following the instructions [here](https://git-lfs.github.com/). and Vercel to be [configured](https://vercel.com/docs/projects/overview#git-large-file-storage-lfs) to support it.

## Arduino Physical Button Support

This project supports physical Arduino buttons for enhanced gameplay interaction. The game can be played with both UI buttons and physical Arduino buttons simultaneously.

### Arduino Setup

**Hardware Requirements:**

- Arduino Uno (or compatible board)
- 8x push buttons
- Breadboard and jumper wires
- No external resistors needed (internal pullup resistors are used)

**Wiring:**

- Button 1 (Choice 1): Connect one terminal to Arduino pin 2, other terminal to GND
- Button 2 (Choice 2): Connect one terminal to Arduino pin 3, other terminal to GND
- Button 3 (Agujaceratops): Connect one terminal to Arduino pin 4, other terminal to GND
- Button 4 (Kritosaurus): Connect one terminal to Arduino pin 5, other terminal to GND
- Button 5 (Tyrannosaurus): Connect one terminal to Arduino pin 6, other terminal to GND
- Button 6 (Mosasaurus): Connect one terminal to Arduino pin 7, other terminal to GND
- Button 7 (Protohadros): Connect one terminal to Arduino pin 8, other terminal to GND
- Button 8 (Start/Select): Connect one terminal to Arduino pin 9, other terminal to GND
- The code uses internal pullup resistors, so no external resistors are required

**Software Setup:**

1. Install Arduino IDE and upload a basic sketch to your Arduino
2. Connect Arduino via USB to your computer
3. Run the game with Node.js adapter: `npm run dev:node`
4. The game will automatically detect and connect to the Arduino

**Usage:**

- Physical Button 1 (pin 2) = Choice 1 (same as clicking the blue button)
- Physical Button 2 (pin 3) = Choice 2 (same as clicking the dark button)
- Physical Button 3 (pin 4) = Navigate to Agujaceratops game
- Physical Button 4 (pin 5) = Navigate to Kritosaurus game
- Physical Button 5 (pin 6) = Navigate to Tyrannosaurus game
- Physical Button 6 (pin 7) = Navigate to Mosasaurus game
- Physical Button 7 (pin 8) = Navigate to Protohadros game
- Physical Button 8 (pin 9) = Navigate to Start/Select screen
- UI buttons continue to work as fallback if Arduino is not connected
- Game works normally without Arduino - no setup required for basic usage

**Troubleshooting:**

- If Arduino is not detected, check USB connection and try different USB ports
- Ensure Arduino has a basic sketch uploaded (can be empty setup/loop)
- Check browser console for connection status messages
- Game will continue to work with UI buttons if Arduino fails to connect

## Development

**Standard Development (Static Site):**

```bash
npm run dev
```

**Development with Arduino Support (Node.js Server):**

```bash
npm run dev:node
```

## Building

**Static Site Build:**

```bash
npm run build
sudo cp -r ./dist/* /var/www/html
systemctl restart nginx
```

**Node.js Server Build (with Arduino support):**

```bash
npm run build:node
npm run preview:node
```

## Data conversion

- Download the csv files into the './src/data' directory
- Delete the first line of the csv file
- Use `csv2json` to convert the csv files to json

```bash
npm install -g csv2json
csv2json ./src/data/2023-10-01.csv > ./public/data/2023-10-01.json
```

## Scene Image Validation

This project includes automatic validation to ensure all story scenes have corresponding background images:

- **Automatic validation**: Runs before every commit via git hooks
- **Manual validation**: Run `npm run check-scenes` anytime
- **Documentation**: See [Scene Validation Guide](./docs/scene-validation.md) for details

The validation checks that every exported story code in the dinosaur JSON files has a matching PNG image in the appropriate scene folder.

## Deploying to Vercel

If you want to automatically deploy to Vercel instead on push to main, you can comment in the lines of the `astro.config.mjs` file related to vercel, or overwrite the `astro.config.mjs` file with the `astro.config.vercel.mjs` file.

## Setting up Ubuntu

- Enter the bios and under Chipset set the system power loss power resume to on
- Perform the default Ubuntu desktop install from the usb drive
- Choose to replace Windows Boot entirely with Gnome
- Select MP4/MP3 download and graphics driver downloads
- turn off screen lock and power down
- After reboot
- Install Google Chrome
- Login to github and download the `./scripts/setup-ubuntu.sh` script from the repo and chmod it
- Run the `./scripts/setup-ubuntu.sh` script to install the necessary packages
- Open the gnome-extensions site in Firefox and download the [disable-gestures ](https://extensions.gnome.org/extension/4049/disable-gestures-2021/) extension
- Open the Extensions app in Gnome desktop and disable all UI features except the Desktop Icons one
- Disable the keyring prompt in [Gnome](https://askubuntu.com/questions/867/how-can-i-stop-being-prompted-to-unlock-the-default-keyring-on-boot)
- Add Chrome to the "Startup Applications" app in Gnome with these cli parameters by copying the `chrome.desktop` file to the `~/.config/autostart` directory.
