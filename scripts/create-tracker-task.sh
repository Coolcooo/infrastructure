#!/usr/bin/env bash

DATA_FIELD='{
  "summary": "Coolcooo-app-release_'"${LATEST_RELEASE}"'",
  "queue": "TMP",
  "description": "'"${LOGS}"'",
  "unique": "'"${UNIQUE}"'"
}'
echo "LATEST_RELEASE${LATEST_RELEASE}";
echo "LOGS ${LOGS}"
echo "UNIQUE ${UNIQUE}"

echo -e '\nОтправка запроса создания задачи\n'
ANSWER=$(curl -X POST "${HOST_URL}"'/v2/issues/' \
     -H 'Authorization: OAuth '"${TRACKER_TOKEN}" \
     -H 'X-Org-ID: '"${ORG_ID}" \
     -H 'Content-Type: application/json' \
     -d "${DATA_FIELD}" | grep 'Задача уже существует')

if [ "$ANSWER" = '' ]; then
 echo -e 'Задача успешно создана'
else
  echo -e '\nЗадача уже создана, запуск обновления задачи\n'
  DATA_FIND='{
              "filter": {
              "unique": "'"${UNIQUE}"'"
              }
            }'
  KEY_TASK=$(curl -X POST "${HOST_URL}"'/v2/issues/_search' \
       -H 'Authorization: OAuth '"${TRACKER_TOKEN}" \
       -H 'X-Org-ID: '"${ORG_ID}" \
       -H 'Content-Type: application/json' \
       -d "${DATA_FIND}" | sed -r 's/.*(TMP-.*)","ve.*/\1/g')

  echo -e '\nПолучен ключ старой очереди: '"$KEY_TASK"'\n'

  ANSWER=$(curl -X PATCH "${HOST_URL}"'/v2/issues/'"$KEY_TASK" \
       -H 'Authorization: OAuth '"${TRACKER_TOKEN}" \
       -H 'X-Org-ID: '"${ORG_ID}" \
       -H 'Content-Type: application/json' \
       -d "${DATA_FIELD}")
  echo -e '\nОбновление задачи завершено\n'

fi