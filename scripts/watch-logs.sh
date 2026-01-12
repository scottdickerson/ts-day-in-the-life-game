#!/bin/bash

# Helper script to watch the Day in the Life Game Node.js server logs
# Usage: ./scripts/watch-logs.sh [number of lines to show]

SERVICE_NAME="ts-day-in-the-life-game.service"
LINES=${1:-50}

echo "📋 Watching logs for $SERVICE_NAME"
echo "   Press Ctrl+C to exit"
echo "   Showing last $LINES lines, then following..."
echo ""

journalctl --user -u "$SERVICE_NAME" -n "$LINES" -f
