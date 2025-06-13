#!/bin/bash
set -e

go install github.com/gohugoio/hugo@latest

hugo version

npm install

echo "🎉 Setup complete"
