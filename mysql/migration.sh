if [ -z "$BASE_PATH" ]
  then
    BASE_PATH="./migration"
  else
    BASE_PATH=$BASE_PATH
fi

if [ -z "$MYSQL_DRIVER" ]
  then
    MYSQL_DRIVER="/Applications/MySQLWorkbench.app/Contents/MacOS/mysql"
  else
    MYSQL_DRIVER=$MYSQL_DRIVER
fi

if [ -z "$MYSQL_ID"]
  then
    MYSQL_ID="root"
  else
    MYSQL_ID=$MYSQL_ID
fi

# 테스트를 위해서 빈값일때 상대 경로로 찾도록 세팅
echo "BASE_PATH: $BASE_PATH"
echo "MYSQL_DRIVER: $MYSQL_DRIVER"
echo "MYSQL_ID: $MYSQL_ID"

FILES=$(find $BASE_PATH -name "*.sql")

for FILE in $FILES
  do
    echo "FILE: $FILE"
    echo "create schema temp;" | $MYSQL_DRIVER -h 127.0.0.1 -u $MYSQL_ID -p
    $MYSQL_DRIVER -h 127.0.0.1 -u $MYSQL_ID -p temp < $FILE

    # DATABASE=$(echo $FILE | sed -E 's|'$BASE_PATH'/||g' | sed -E 's|/.*$||g')
    # echo "DATABASE: $DATABASE"
    
    # NAME=$(echo $FILE | sed -E 's|'"$BASE_PATH"/'||g')
    # echo "NAME: $NAME"
    # str=$(echo $str | jq --arg name "$name" --arg url "${{env.BASE_URL}}$name" '. += [{"name": $name, "url": $url}]')
    # echo "CREATE DATABASE IF NOT EXISTS $DATABASE;" | $MYSQL_DRIVER -h 127.0.0.1 -u $MYSQL_ID -p
    
    # echo "create schema $DATABASE;" | $MYSQL_DRIVER -h 127.0.0.1 -u $MYSQL_ID -p
    # $MYSQL_DRIVER -h 127.0.0.1 -u $MYSQL_ID -p $DATABASE < $FILE
  done



# mysql -u root -p xxx [DB명] < slack.sql
# /Applications/MySQLWorkbench.app/Contents/MacOS/mysql -h 127.0.0.1 -u root -p slack-test < ./migration/slack.sql
# docker-compose exec -it mysql /bin/bash