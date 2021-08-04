# 테스트를 위해서 빈값일때 상대 경로로 찾도록 세팅
echo "BASE_PATH: $BASE_PATH"
echo "MYSQL_DRIVER: "
echo "MYSQL_ID: "
echo "MYSQL_PWD: "

if [ -z "$BASE_PATH" ]
  then
    BASE_PATH='./migration'
  else
    BASE_PATH=$BASE_PATH
fi
echo $BASE_PATH

FILES=$(find $BASE_PATH -name "*.sql")

for FILE in $FILES
  do
    # echo $FILE
    NAME=$(echo $FILE | sed -E 's|'"$BASE_PATH"/'||g')
    echo $NAME
    # str=$(echo $str | jq --arg name "$name" --arg url "${{env.BASE_URL}}$name" '. += [{"name": $name, "url": $url}]')
  done



# mysql -u root -p xxx [DB명] < slack.sql
# /Applications/MySQLWorkbench.app/Contents/MacOS/mysql -h 127.0.0.1 -u root -p slack < ./migration/slack.sql