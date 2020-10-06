#!/usr/bin/env bash

function to_json() {
  node -p -e "JSON.stringify(require('json5').parse(require('fs').readFileSync(0, 'utf8')))" <$1
}

function composite_switch() {
  loc=$1
  value=$2
  echo "turning composite $value for $loc"
  to_json ./$loc/tsconfig.json | \
   jq ".compilerOptions.composite=${value} | .compilerOptions.tsBuildInfoFile=\"lib/.tsBuildInfo\"" >$loc/tsconfig.json.bck && \
    mv $loc/tsconfig.json.bck $loc/tsconfig.json
}

yarn workspaces --silent info | jq '{extends:"./tsconfig.base.json", references:[ .[] | {path:.location}]}' >./tsconfig.json

yarn workspaces --silent info | jq -r '.[] | .location' | while read loc; do
  case $1 in
  off)
    composie_switch $loc 'false'
    ;;
  *)
    composite_switch $loc 'true'
    ;;
  esac
done
