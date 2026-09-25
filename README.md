## Описание проекта

REST API на Express и TypeScript для управления оборудованием и запросами на его техническое обслуживание
## Требования к окружению

- **Node.js 20+**
- **npm 10+**
- Доступ в интернет к `api.open-meteo.com`
- API-ключ **не требуется**

## Установка
```
git clone https://github.com/MrSesbianLexovich/case_2.git
cd ./case_2
npm install
```

## Запуск

### Для запуска серверной части:
```
npm start
```

### Для запуска клиентской части(выполнять в отдельном окне терминала):
```
npm run frontend
```

Это запустит сервер с клиентской частью на порте 5173

При желании можно отредактировать скрипт запуска в package.json:
```
"frontend": "serve frontend -l 5173" <-- вместо 5173 укажите желаемый свободный порт
```

## Переменные окружения

### .env.example:
```
CORS_ORIGINS = http://localhost:5173            # CORS origins

PORT = 3000                                     # Порт, на котором будет запущена серверная часть 

DATA_DIR = data                                 # Название директории с файлом базы данных
DATA_FILE = data.json                           # Название JSON файла имитирующего базу данных

RATE_LIMIT_WINDOW_MS = 60000                    # Время в милисекундах, в течении которого может выполниться только определенное количество запросов 
RATE_LIMIT_MAX = 100                            # Максимальное количество запросов, которое может выполниться в течение выше указанного времени  
JSON_SIZE_LIMIT = 10kb                          # Максимальный размер JSON в запросе 
URL_SIZE_LIMIT = 10kb                           # Максимальный размер URL

REQUEST_TIMEOUT_MS = 5000                       # Таймаут для запросов к внешнему погодному API

WEATHER_API_URL = https://api.open-meteo.com    # Базовый url погодного api

ALLOWED_PRECIPITATION = 10                      # Допустимые, для проведения работ, осадки 
ALLOWED_WIND_SPEED = 15                         # Допустимая, для проведения работ, скорость ветра
```

## Эндпоинты
Метод | Путь | Функция
------------- | ------------- | -------------
GET  | /api/health |  Получение состояния сервиса
GET  | /api/equipment |  Получение обозудования из бд
POST  | /api/equipment |  Добавление оборудования в бд
GET | /api/equipment/:id |  Получение оборудования по его id
PATCH  | /api/equipment/:id |  Обновление оборудования по его id
DELETE  | /api/equipment/:id |  Удаление оборудования по его id
GET  |  /api/equipment/:id/requests  |  Получение запросов на обслуживание для конкретного оборудования по id
GET  |  /api/equipment/:id/weather  |  Получение прогноза погоды по координатам оборудования и возможность проведения обслуживания
GET  |  /api/requests  |  Получение запросов из бд
POST  |  /api/requests  |  Добавление запроса в бд
GET  |  /api/requests/:id  |  Получение запроса по его id
PATCH  |  /api/requests/:id  |  Обновление данных запроса по его id
PATCH  |  /api/requests/:id/status  |  Обновление статуса запроса по его id
DELETE  |  /api/requests/:id  |  Удаление запроса по его id


## Модель данных

### Оборудование (Equipment)

| Поле | Тип | Обязательное | Описание |
|---|---|---:|---|
| `id` | `string` | Да | Уникальный UUID, генерируется сервером |
| `name` | `string` | Да | Название оборудования, от 3 до 100 символов |
| `type` | `string` | Да | `turbine`, `inverter`, `sensor` или `substation` |
| `serialNumber` | `string` | Да | Уникальный серийный номер |
| `location.lat` | `number` | Да | Географическая широта |
| `location.lon` | `number` | Да | Географическая долгота |
| `status` | `string` | Да | Текущий статус оборудования |
| `installedAt` | `string` | Да | Дата установки в формате ISO |

### Пример оборудования:

```
{
  "equipment": {
    "id": "b87e6293-a976-4e9d-9541-2b94c6187c29",
    "name": "Название оборудования",
    "type": "inverter",
    "serialNumber": "Серийный-номер",
    "location": {
      "lat": 59.9343,
      "lon": 30.3351
    },
    "status": "maintenance",
    "installedAt": "2024-01-20T08:00:00.000Z"
  }
}
```

### Запрос на обслуживание (request)

| Поле | Тип | Обязательное | Описание |
|---|---|---:|---|
| `id`  |  `string` | Да | Уникальный UUID, генерируется сервером |
| `equipmentId` | `string` | Да | Уникальный UUID, генерируется сервером |
| `title` | `string` | Да | Название оборудования, от 5 до 120 символов |
| `description` | `string` | Да | Описание запроса, до 2000 символов |
| `priority` | `string` | Да | `low`, `medium`, `high` или `critical` |
| `status` | `string` | Да | `new`, `in_progress`, `done`, `rejected`, (по умолчанию new) |
| `plannedAt` | `string` | Нет | Дата, на которую запланированно исполнение запроса |
| `createdAt` | `string` | Да | Дата установки в формате ISO |
| `updatedAt` | `string` | Да | Дата обновления в формате ISO |

### Пример запроса:

```
{
  "request": {
    "equipmentId": "33ecc41f-7974-49e1-94ae-a3211f3b915d",
    "title": "valid Title",
    "description": "description",
    "priority": "low",
    "plannedAt": "2025-01-20T08:00:00.000Z",
    "createdAt": "2026-09-23T12:15:51.766Z",
    "updatedAt": "2026-09-23T12:19:50.857Z",
    "id": "911b4678-4839-402c-a0bc-147d90eed63a",
    "status": "rejected"
  }
}
```

## Схема переходов статусов запросов
```
new → in_progress → done ; new → rejected ; in_progress → rejected
```
## Формат ошибки
```
{
  "errorCode": "Код ошибки"
  "message": "Сообщение ошибки",
  "details": [],
  "requestId": "09125c02-e066-4188-b027-24f55939a025"
}
```
### Пример ошибки валидации:
```
{
  "errorCode": "VALIDATION_ERROR",
  "message": "Ошибка валидации",
  "details": [
    {
      "field": "id",
      "message": "Invalid UUID"
    }
  ],
  "requestId": "09125c02-e066-4188-b027-24f55939a025"
}
```

### Пример ошибки NotFound 404:
```
{
  "errorCode": "EQUIPMENT_NOT_FOUND",
  "message": "Оборудование с id b87e6293-a976-4e9d-9541-2b94c6187c20 не найдено",
  "requestId": "f35aa0ce-e002-4a45-a85e-6b07a2657206"
}
```

## Примеры запросов

GET запрос 

localhost:3000/api/equipment?status=maintenance&?page=1&limit=10&order=asc&type=inverter

Ответ с статусом 200:
```
{
  "equipment": [
    {
      "id": "b87e6293-a976-4e9d-9541-2b94c6187c29",
      "name": "Название оборудования",
      "type": "inverter",
      "serialNumber": "Серийный-номер",
      "location": {
        "lat": 59.9343,
        "lon": 30.3351
      },
      "status": "maintenance",
      "installedAt": "2024-01-20T08:00:00.000Z"
    }
  ]
}
```


## Правила безопасности
Были реализованы следующие меры безопасности:
### Cors:

Источники передаются через `CORS_ORIGINS` в .env, если их несколько, то необходимо указывать из через запятую без пробелов

Разрешенные методы запросов: 
|---|
| GET | 
| POST | 
| PATCH | 
| DELETE | 
| OPTIONS |

При запросе с неразрешенного источника запрос отклоняется:
```
CORS origin is not allowed
```

Увидеть результат работы CORS можно открыв html страницу и попытавшись выполнить запрос(отправить новый запрос или получить их)

Если источник с фронта не указывать(в случае фронта это `http://localhost:5173`) получить запросы не удастся и в консоли будет ошибка

Поэтому для работы необходимо указать источник в .env:

```
CORS_ORIGINS = http://localhost:5173
```

### Headers:
Безопасные заголовки устанавливаются через `helmet()`


### Ограничение количества запросов для /api:
Используется `rateLimit()` из `express-rate-limit`

Длительность окна, в течение которого могут выполнятся запросы указывается в .env:
```
RATE_LIMIT_WINDOW_MS = 
```
Максимальное количество запросов также указывается в .env:
```
RATE_LIMIT_MAX = 
```
В случае превышения максимального количества запросов возвращается ошибка с http статусом 429:
```
Too many requests, please try again later.
```

### Ограничение размера JSON:

```
express.json({limit:JSON_SIZE_LIMIT})
```

JSON_SIZE_LIMIT указывается в .env:
```
JSON_SIZE_LIMIT = 10kb
```

### Ограничение размера URL:

```
express.urlencoded({limit:URL_SIZE_LIMIT})
```

URL_SIZE_LIMIT указывается в .env
```
URL_SIZE_LIMIT = 10kb
```

### Валидация входных данных
Через библиотеку zod была реализована валидация данных, проходящая до передачи данных в контроллеры. В случае невалидных данных вызвращается ошибка валидации с http статусом 400.

## Структура проекта
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
│       ├── asyncHandler.ts           #  Переиспользуемый обработчик запросов
│       └── validator.ts              #  Кастомный валидатор для params, query и body
└── tsconfig.json                     #  Конфигурация для typescript
```
