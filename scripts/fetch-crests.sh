#!/usr/bin/env bash
# Downloads official club crest artwork into static/crests/ at deploy time.
# Trademarked art is deliberately not committed to the repository (same
# pattern as the resume PDF); the badges partial skips missing crests, so
# a failed download degrades gracefully to flags-only.
#
# Wire into CI before "Build with Hugo":
#   - name: Fetch club crests
#     run: ./scripts/fetch-crests.sh
set -u
mkdir -p static/crests
fetch() {
  curl -fsSL --retry 2 -A "kirillbobyrev.com build (github-actions)" \
    -o "static/crests/$1" "$2" || echo "skipped $1"
}
fetch manchester-city.svg "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"
fetch bayern-munich.svg "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg"
fetch liverpool.svg "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"
fetch chelsea.svg "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"
ls -la static/crests/
