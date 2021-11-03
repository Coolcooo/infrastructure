#!/usr/bin/env bash

pwd
pwd
pwd


PREVIOUS_RELEASE=$(git tag | grep v | tail -2 | head -1)
export PREVIOUS_RELEASE

LATEST_RELEASE=$(git tag | grep v | tail -1)
export LATEST_RELEASE

export TRACKER_TOKEN=AQAAAAAG3PsyAAd5O_Vg1mWqJkL1p5xLOXBMe0w
export ORG_ID=6461097


INFO_ABOUT_RELEASE=$(git log "${LATEST_RELEASE}" --pretty=format:"Версия релиза: ${LATEST_RELEASE}, Автор: %an, Дата релиза: %as \n" | head -1)
export INFO_ABOUT_RELEASE

export UNIQUE='Coolcooo_'"${LATEST_RELEASE}"
export HOST_URL='https://api.tracker.yandex.net'
LOGS=$(git log "${PREVIOUS_RELEASE}"'..'"${LATEST_RELEASE}" --pretty=format:"%h - %s (%an, %ar)\n\n" | grep feat: | tr -s '\n' ' ')
export LOGS

CHANGE=$(git log "${PREVIOUS_RELEASE}"'..'"${LATEST_RELEASE}" --pretty=format:"%h - %s (%an, %ar)\n\n")

echo "$LATEST_RELEASE"
echo "$PREVIOUS_RELEASE"
echo "$CHANGE"
echo "$CHANGE"
echo "$CHANGE"
echo "$CHANGE"
echo "$CHANGE"
echo "$CHANGE"

#git log
#git log
#git log
#echo "$LOGS"
#echo "$LOGS"
#echo "$LOGS"
#echo "$LOGS"
LOGS="$INFO_ABOUT_RELEASE""$LOGS"
export RESULT_TESTS=''

echo -e "\nЗапуск скрипта тестов\n"

chmod +x ./scripts/test.sh
./scripts/test.sh

