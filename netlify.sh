#!/bin/bash

# Exit on error
set -e

# Install dependencies
echo "Installing dependencies..."
yarn install

# Install Turbo globally
echo "Installing Turbo globally..."
yarn global add turbo

# Build the project
echo "Building project..."
yarn build

# Print success message
echo "Build completed successfully!" 