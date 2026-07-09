#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out_dir="${1:-static/crests}"
out_path="${repo_root}/${out_dir}"

mkdir -p "${out_path}"

# slug|Wikimedia Commons file title
crests=(
  "manchester-city|Manchester_City_FC_badge.svg"
  "bayern-munich|Logo_FC_Bayern_München_(2002–2017).svg"
  "liverpool|Liverpool_FC.svg"
  "chelsea|Chelsea_FC.svg"
  "barcelona|FC_Barcelona_(crest).svg"
  "england|Arms_of_The_Football_Association.svg"
  "germany|DFB-Maenner-Nationalmannschaft_Logo.svg"
  "spain|Royal_Spanish_Football_Federation_logo.svg"
  "norway|Norwegian_Football_Federation_logo.svg"
)

encode_url() {
  python3 - "$1" <<'PY'
import sys
import urllib.parse

print(urllib.parse.quote(sys.argv[1], safe=""))
PY
}

download_one() {
  local slug="$1"
  local title="$2"
  local encoded
  local url
  local target
  local tmp

  encoded="$(encode_url "${title}")"
  url="https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}"
  target="${out_path}/${slug}.svg"
  tmp="$(mktemp)"

  echo "Downloading ${slug} from ${title}"
  if ! curl -fsSL --retry 3 --retry-all-errors "${url}" -o "${tmp}"; then
    rm -f "${tmp}"
    echo "Failed to download ${title}" >&2
    return 1
  fi

  if ! grep -qi "<svg" "${tmp}"; then
    rm -f "${tmp}"
    echo "Downloaded content for ${title} is not an SVG file" >&2
    return 1
  fi

  mv "${tmp}" "${target}"
  echo "Saved ${target}"
}

for crest in "${crests[@]}"; do
  IFS='|' read -r slug title <<<"${crest}"
  download_one "${slug}" "${title}"
done

echo "Done. SVG crests are in ${out_path}."
