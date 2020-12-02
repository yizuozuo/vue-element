#!/bin/bash
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  if [[ -z $SKIP_TESTS ]]; then
    npm run lint
  fi

  # build
  VERSION=$VERSION npm run build

  # commit
  git add -A
  git commit -m "build: build $VERSION"
  # generate release note
  npm run release:note
  # tag version
  npm version "$VERSION" --message "build: release $VERSION"

  # publish
  git push origin refs/tags/v"$VERSION"
  git push
fi
