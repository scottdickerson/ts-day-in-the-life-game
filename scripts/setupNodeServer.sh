#!/bin/bash

# Setup script for Day in the Life Game Node.js server systemd service
# This script copies the service file and sets up systemd to run it at startup

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SERVICE_FILE="$PROJECT_DIR/ts-day-in-the-life-game.service"
SYSTEMD_USER_DIR="$HOME/.config/systemd/user"
TARGET_SERVICE_FILE="$SYSTEMD_USER_DIR/ts-day-in-the-life-game.service"

echo "Setting up Node.js server systemd service..."
echo "Project directory: $PROJECT_DIR"

# Check if service file exists
if [ ! -f "$SERVICE_FILE" ]; then
    echo "Error: Service file not found at $SERVICE_FILE"
    exit 1
fi

# Create systemd user directory if it doesn't exist
echo "Creating systemd user directory..."
mkdir -p "$SYSTEMD_USER_DIR"

# Copy service file
echo "Copying service file to $TARGET_SERVICE_FILE..."
cp "$SERVICE_FILE" "$TARGET_SERVICE_FILE"

# Reload systemd daemon
echo "Reloading systemd daemon..."
systemctl --user daemon-reload

# Enable the service
echo "Enabling service to start at boot..."
systemctl --user enable ts-day-in-the-life-game.service

# Enable linger so service runs even when user is not logged in
echo "Enabling linger to allow service to run when not logged in..."
sudo loginctl enable-linger "$USER"

echo ""
echo "✓ Service setup complete!"
echo ""
echo "The service is now configured to start automatically at boot, even when not logged in."
echo ""
echo "Useful commands:"
echo "  Start service now:    systemctl --user start ts-day-in-the-life-game.service"
echo "  Stop service:         systemctl --user stop ts-day-in-the-life-game.service"
echo "  Check status:         systemctl --user status ts-day-in-the-life-game.service"
echo "  View logs:            journalctl --user -u ts-day-in-the-life-game.service -f"
echo "  Disable at boot:      systemctl --user disable ts-day-in-the-life-game.service"
echo ""
