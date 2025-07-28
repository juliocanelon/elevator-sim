# elevator-sim

Una prueba de concepto académica que implementa una metodología ágil OO-Clean-DDD de principio a fin.

## Frontend
- **React.js (ES6+)** con componentes reutilizables, hooks y Context API.

## Backend
- **Funciones serverless en Vercel** (Node.js/TypeScript) que exponen endpoints REST en `/api/*`.

## Diseño orientado al dominio
- Entidades, Value Objects, Domain Services y Agregados en la capa pura `domain/`.

## Arquitectura limpia
- Clara separación entre las carpetas:
  - `domain/`
  - `application/`
  - `infrastructure/`
  - `api/`

## CI/CD y QA
- **GitHub Actions**, **SonarCloud** y **ArchUnit** garantizan pruebas, calidad de código y reglas de arquitectura en cada push.

## Desarrollo asistido por IA
- **OpenAI Codex** para scaffolding.
- **ChatGPT/Claude** para revisión de diseño.
- **Postman Collections** para pruebas de API.

## Estructura del proyecto
.
├── domain/
├── application/
├── infrastructure/
├── api/
│ ├── call.js
│ └── tick.js
├── public/
│ └── index.html
└── src/
├── index.js
├── App.js
└── components/
└── ElevatorSimulation.js

### Visión inicial de la arquitectura:
- domain/: Núcleo puro del negocio (entidades, objetos de valor y servicios de dominio).
- application/: Casos de uso que orquestan la lógica del dominio (puertos e interactores).
- infrastructure/: Adaptadores e implementaciones externas (persistencia, logging, etc.).
- api/: Funciones serverless en Vercel para exponer endpoints REST (call.js, tick.js).
- src/: App React que consume las APIs y renderiza la simulación (App.js, ElevatorSimulation.js).
- public/: HTML estático con el contenedor donde monta React.
