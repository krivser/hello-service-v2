# hello-service-v2

# Инструкция по запуску приложения

# Команда установки БД Postgres из Helm3 вместе с файлом values.yaml
helm install pg bitnami/postgresql -f ./k8s/helm3/values.yaml

# Команда применения начальных миграций
kubectl apply -f ./k8s/initdb-initc.yaml

# Команда, которая запускает в правильном порядке манифесты кубернетеса
kubectl apply -f ./k8s/app-config.yaml -f ./k8s/deployment.yaml -f ./k8s/service.yaml -f ./k8s/ingress.yaml

# Команда запуска тестов
newman run ./PostmanTest.json