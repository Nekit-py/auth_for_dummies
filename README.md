### Пример .env файла
(должен лежать по пути app/db/.env)

```shell
HOST=192.168.192.168
HOST_PORT=8080
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=admin
DB_NAME=postgres
```
### Сборка:
```
docker-compose up --build -d
```
### Пользуем:
http://192.168.192.168:8080/docs
