#!/bin/bash

# Load version from semantic-release output
VERSION=$1
MAJOR_VERSION=$(echo $VERSION | cut -d. -f1)

# List of all applications (NestJS and Next.js)
apps=("nest-service-1" "nest-service-2" "frontend-nextjs")

# Rebuild only changed applications
for app in "${apps[@]}"; do
  if git diff --quiet HEAD~1 HEAD -- apps/$app; then
    echo "Skipping rebuild for $app, no changes."
  else
    echo "Building and pushing Docker image for $app."
    docker buildx build \
      --platform linux/amd64,linux/arm64 \
      --tag ghcr.io/${GITHUB_REPOSITORY}/$app:$VERSION \
      --tag ghcr.io/${GITHUB_REPOSITORY}/$app:latest \
      --tag ghcr.io/${GITHUB_REPOSITORY}/$app:$MAJOR_VERSION-latest \
      --push \
      ./apps/$app
  fi
done

# Push unchanged apps with new version tag (without rebuild)
for app in "${apps[@]}"; do
  if git diff --quiet HEAD~1 HEAD -- apps/$app; then
    echo "Tagging and pushing existing Docker image for $app."
    docker tag ghcr.io/${GITHUB_REPOSITORY}/$app:latest ghcr.io/${GITHUB_REPOSITORY}/$app:$VERSION
    docker push ghcr.io/${GITHUB_REPOSITORY}/$app:$VERSION
  fi
done
