#!/usr/bin/env bash

NAME_BUILD='release-app:'"$LATEST_RELEASE"
docker build -t "$NAME_BUILD" .

LOGS=$(echo "${LOGS}"'\nDOCKER собрал образ с версией '"${NAME_BUILD}"'\n' | grep D)
docker images
chmod +x ./scripts/create-tracker-task.sh
./scripts/create-tracker-task.sh