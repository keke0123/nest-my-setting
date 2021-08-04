## Docker Compose 를 통한 개발 환경 세팅
---
### MYSQL setting
   
* 기존 데이터 덤프  
  * local 에 mysql 이 안깔려 있다는 가정하에, workbench 의 driver 를 사용하는 명령어  
```
/Applications/MySQLWorkbench.app/Contents/MacOS/mysqldump \
-h 127.0.0.1 \
--port=3307 \
-u root -p \
--databases service > service.sql
```  
* migration 폴더에 해당 sql 파일 드랍
  * sql 파일은 몇개를 넣어도 상관 없다.
---
### Docker Compose 실행
* run
```
docker-compose up -d
```
* exec
```
docker-compose exec mysql /bin/bash
```
