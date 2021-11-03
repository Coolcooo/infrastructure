#!/usr/bin/env bash

NAME_BUILD='release-app:'"$LATEST_RELEASE"
docker build -t "$NAME_BUILD" .

LOGS="${LOGS}"'DOCKER собрал образ с версией '"${NAME_BUILD}"
docker images
chmod +x ./scripts/create-tracker-task.sh
./scripts/create-tracker-task.sh