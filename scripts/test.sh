#!/usr/bin/env bash

echo -e '\nНачата установка зависимостей\n'
npm i
echo -e '\nПроисходит запуск тестов\n'
npm test

if [ $? == 0 ]; then
    RESULT_TESTS='Тесты завершились успешно'
else
    RESULT_TESTS='Тесты успешно провалены)'
fi
echo -e '\n'"$RESULT_TESTS"'\n'
LOGS="$LOGS""$RESULT_TESTS"
if [ $? != 0 ]; then
    exit $?
fi
echo -e '\nЗапуск команды создания задачи на Трекере\n'

chmod +x ./scripts/create-image.sh
./scripts/create-image.sh