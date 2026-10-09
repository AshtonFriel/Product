# Products App

A minimal Products app: React frontend, Spring Boot API and Postgres. You can list products and create a product.

## Prerequisites

- JDK 21
- Node 20+
- Docker Desktop (for Postgres)
- Git

## Database setup

```
docker compose up -d
```

Postgres runs on localhost:5432 (database `products`, user `app`, password `app`).

The `products` table (`id` auto-generated, `name` required) is created by a Flyway migration when the backend starts: `backend/src/main/resources/db/migration/V1__create_products.sql`.

## Start backend

```
cd backend
./mvnw spring-boot:run
```

Runs on http://localhost:8080

## Start frontend

```
cd frontend
npm install
npm run dev
```

Runs on http://localhost:3000

## Verify

Open http://localhost:3000, create a product named P1, and confirm it appears in the list.

## Notes

- Uses the preferred stack (React, Spring Boot, Postgres). No deviations.

## How you built it

- **Process:** Got the prerequisites installed first (Java, Node, Docker). Used Spring Initializr to start the backend with the dependencies I needed, got Postgres running in Docker, then built the list and create endpoints (controller, service, repository). Made sure it started with no issues and tested the endpoints with curl. Usually I'd use something like Postman. Last, I used Vite to generate the React app and hooked up a basic product page that I generated with AI to the APIs.
- **AI tools:** I used Claude a lot on this. It helped with Windows setup (winget, SSH key for GitHub, folder layout), drafting the backend classes, and generating the React page. I decided on the structure, like using a service layer and DTOs.
- **Decisions:** I used DTOs to keep the entity separate from the API contract, so a change to the entity is less likely to break the API. Flyway owns the schema and Hibernate is set to `validate`, so it only checks the entity matches the table. `name` uses `@NotBlank`, so a blank name gets a 400. CORS allows the frontend on port 3000, and I set Vite to run on 3000 to match the verify step.
- **What went wrong:** Mostly went smooth with assistance of AI and my familarity with the stack.
- **What I'd do differently:** Add tests for the service and controller, including the blank-name case. Return a consistent error response for validation failures. Run the backend in Docker Compose too, so one command starts everything.
~~~~
