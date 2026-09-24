# Описание проекта

# Требования к окружению

# Установка

```
git clone https://github.com/MrSesbianLexovich/case_2.git
cd ./case_2
npm install
```

# Запуск

Для запуска серверной части:
```
npm start
```

Для запуска клиентской части(выполнять в отдельном окне терминала):
```
npm run frontend
```
Это запустит сервер с клиентской частью на порте 5173

# Переменные окружения
```

```

# Эндпоинты

# Модель данных

# Схема переходов статусов запросов

# Формат ошибки
```

```
Пример:
```

```

# Примеры запросов

# Правила безопасности

# Структура проекта
```
├── frontend
│   ├── index.html                    # Простая страница выводящая список запросов и позволяющая создавать новые запросы
│   └── js
│       └── app.js                    # Скрипт для получения и создания запросов на странице
├── package.json
├── package-lock.json
├── src
│   ├── app.ts                        #  Код серверного приложения
│   ├── client
│   │   └── weatherClient.ts          #  Клиент внешнего погодного API.
│   ├── config
│   │   └── constanses.ts             #  Экспорт содержимого .env в константы 
│   ├── controllers
│   │   ├── equipmentController.ts    #  
│   │   ├── healthController.ts       #
│   │   └── requestsController.ts     #
│   ├── db
│   │   └── index.ts                  #  Функции для взаимодействия с "Базой данных"
│   ├── middlewares
│   │   ├── errorHandler.ts           #  Обработчик ошибок
│   │   ├── logger.ts                 #  Логгер выводящий в консоль информацию о запросах
│   │   ├── rateLimiter.ts            #  Middleware для ограничения количества запросов
│   │   └── requestId.ts              #  Middleware для присвоения запросам id 
│   ├── repos
│   │   ├── equipmentRepository.ts    #  Репозиторий запросов
│   │   └── requestsRepository.ts     #  Репозиторий оборудования
│   ├── routes
│   │   ├── equipmentRoutes.ts        #  Роутер для оборудования
│   │   ├── healthRoutes.ts           #  Роутер эндпоинта /api/health
│   │   ├── index.ts                  #  Роутер, объединяющий все эндпоинты
│   │   └── requestsRoutes.ts         #  Роутер для запросов
│   ├── server.ts                     #  Запуск прослушивания порта серверным приложением
│   ├── services
│   │   ├── equipmentService.ts       #  Логика оборудования
│   │   └── requestsService.ts        #  Логика запросов
│   ├── types
│   │   ├── error.ts                  #  Кастомный тип ошибки
│   │   ├── express.d.ts              #  Добавление requestId в тип Request из express
│   │   ├── schemas.ts                #  Zod схемы оборудования, запросов и прочего
│   │   └── types.ts                  #  Типы некоторых схем и базы данных
│   └── utils
│       ├── asyncHandler.ts           #  Обработчик запросов
│       └── validator.ts              #  Кастомный валидатор для params, query и body
└── tsconfig.json                     #  Конфигурация для typescript
```
