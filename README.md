# nest-prisma-monorepo

Here is the POC of a monorepo built with nestjs and prisma used to expose several apps, relying on several databases.

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github.dev/jpb06/nest-prisma-monorepo)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/nest-prisma-monorepo/tests%20and%20sonarcloud%20scan?label=last%20workflow&logo=github-actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nest-prisma-monorepo&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jpb06_nest-prisma-monorepo)
![Last commit](https://img.shields.io/github/last-commit/jpb06/nest-prisma-monorepo?logo=git)

## ⚡ Requirements

You will need the following to use this POC :

| Item      | Description                                              | Documentation                                 |
| --------- | -------------------------------------------------------- | --------------------------------------------- |
| ⚙️ nodejs | Duh!                                                     | <https://nodejs.org/en/>                      |
| 🐳 Docker | we will use docker to launch a postgres instance         | <https://www.docker.com/get-started>          |
| 🧶 yarn   | We will use yarn as the package manager for this project | <https://yarnpkg.com/getting-started/install> |

## ⚡ How to start

### 🔶 Firstof, let's start our database using docker

You may need to give execution permission to the entry point script file, that is responsible for creating our three databases:

```bash
chmod +x docker/pg-init-scripts/create-multiple-db.sh
```

Let's then use docker compose :

```bash
yarn docker
```

### 🔶 Then we can migrate our schemas and seed the databases

```bash
yarn dev:db
```

### 🔶 Launching our backends in dev mode

```bash
# Hiking app (port 5001)
yarn dev hiking-app
# Projects app (port 5002)
yarn dev projects-app
```

### 🔶 Accessing apps swaggers

Now we can access the swaggers of our apps using the following urls:

- [Hiking app](http://localhost:5001)
- [Projects app](http://localhost:5002)

### 🔶 Building our apps for production

```bash
yarn build
```

## ⚡ Project structure

### 🎉 Apps

| Database        | Description                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🚀 Hiking app   | This kiking app allows users to check and join hiking groups planning to do a walk on some trail. This app owns a database but also uses the Users database. |
| 🚀 Projects app | This projects app allows users to check contributions made to repositories. This app owns a database and also uses the Users database.                       |

### 🧩 Libs

| Database      | Description                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| 🧩 Boostraper | The code necessary to create an app is defined there and shared between apps. |
| 🧩 Databases  | The base prisma services are defined on this shared module.                   |
| 🧩 Decorators | Decorators used in all our apps.                                              |
| 🧩 Filters    | Filters used in all our apps.                                                 |
| 🧩 Pipes      | Pipes used in all our apps.                                                   |
| 🧩 Rxjs       | Rxjs helpers.                                                                 |
| 🧩 Tests      | Test related code.                                                            |

## ⚡ Data model

We have three databases:

| Database    | Description                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| 👨 Users    | Contains our users (duh). This database will serve as the single base of truth for everything user related in our apps. |
| 🏔️ Hiking   | Database dedicated to the hiking backend service.                                                                       |
| 🧳 Projects | Database dedicated to the projects backend service.                                                                     |

Let's take a look at the schema:

![Diagram](./documentation/db-diagram.png)

## ⚡ Stack

| Item          | Description                                                                     | Documentation                                        |
| ------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 🤩 Typescript | Types, types everywhere                                                         | <https://www.typescriptlang.org/docs/>               |
| 🖊️ eslint     | Linting all the things!                                                         | <https://eslint.org/docs/user-guide/getting-started> |
| 😹 nestjs     | Nest is a cool framework to build backends (brace yourself, decorators inbound) | <https://docs.nestjs.com/>                           |
| 🛆 prisma      | Prisma will be our ORM to interract with the database                           | <https://www.prisma.io/docs/getting-started>         |
| 🔥 rxjs       | Let's write all our services in rxjs for giggles                                | <https://rxjs.dev/>                                  |
| 🃏 jest       | We will use jest to write our tests                                             | <https://jestjs.io/fr/docs/getting-started>          |
