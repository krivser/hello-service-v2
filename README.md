# hello-service-v2

########################################
#          Основное задание            #
########################################

# Команда установки БД Postgres из Helm3 вместе с файлом values.yaml
helm install pg bitnami/postgresql -f ./k8s/helm3/values.yaml

# Команда применения начальных миграций
kubectl apply -f ./k8s/initdb-initc.yaml

# Команда, которая запускает в правильном порядке манифесты кубернетеса
kubectl apply -f ./k8s/app-config.yaml -f ./k8s/deployment.yaml -f ./k8s/service.yaml -f ./k8s/ingress.yaml

# Команда запуска тестов
newman run ./PostmanTest.json

########################################
#      Задание под звездочкой 1        #
########################################

# Установить БД Postgres из Helm
helm install pg bitnami/postgresql -f ./k8s/helm3/values.yaml

# Установить приложение из Helm (автоматически будет инициализирована БД (через Job), развернуты ресурсы: service, ingress, deployment)
helm install hello-service ./hello-service-chart/

# Запустить тест
newman run PostmanTest.json

########################################
#      Задание под звездочкой 2        #
########################################

# Установить приложение из Helm (полностью автоматическая установки приложения и его зависимости в виде БД Postgres)
helm install hello-service ./hello-service-chart/

# Запустить тест
newman run PostmanTest.json