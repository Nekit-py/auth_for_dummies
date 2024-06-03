### Пример .env файла
(должен лежать по пути app/db/.env)

```shell
HOST=192.168.192.168
HOST_PORT=8080
DB_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_DB=postgres_db
```
### Сборка:
```console
docker-compose up --build -d
```
### Пользуем:
http://192.168.192.168:8080/docs
