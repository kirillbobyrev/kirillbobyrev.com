#!/bin/bash
set -e

echo "🚀 Setting up Hugo development environment..."

echo "📦 Installing Hugo with Go..."
echo "This ensures we get the absolute latest version with full extended support."

go install github.com/gohugoio/hugo@latest

echo "✅ Hugo installed:"
hugo version

echo "📦 Installing npm dependencies..."
cd "/workspaces/$(basename $PWD)"
npm install
echo "✅ npm dependencies installed"

echo "🎉 Setup complete"
