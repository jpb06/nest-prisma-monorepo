# nest-prisma-monorepo

Here is the POC of a monorepo built with nestjs and prisma used to expose several apps, relying on several databases.

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/jpb06/nest-prisma-monorepo)

## ⚡ Requirements

You will need the following to use this POC :

| Item      | Description                                              | Documentation                               |
| --------- | -------------------------------------------------------- | ------------------------------------------- |
| ⚙️ nodejs | Duh!                                                     | https://nodejs.org/en/                      |
| 🐳 Docker | we will use docker to launch a postgres instance         | https://www.docker.com/get-started          |
| 🧶 yarn   | We will use yarn as the package manager for this project | https://yarnpkg.com/getting-started/install |

## ⚡ Stack

| Item          | Description                                                                     | Documentation                                      |
| ------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| 🤩 Typescript | Types, types everywhere                                                         | https://www.typescriptlang.org/docs/               |
| 🖊️ eslint     | Linting all the things!                                                         | https://eslint.org/docs/user-guide/getting-started |
| 😹 nestjs     | Nest is a cool framework to build backends (brace yourself, decorators inbound) | https://docs.nestjs.com/                           |
| 🛆 prisma      | Prisma will be our ORM to interract with the database                           | https://www.prisma.io/docs/getting-started         |
| 🔥 rxjs       | Let's write all our services in rxjs for giggles                                | https://rxjs.dev/                                  |
| 🃏 jest       | We will use jest to write our tests                                             | https://jestjs.io/fr/docs/getting-started          |

## ⚡ How to start

### 🔶 Firstof, let's start our database using docker

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

## ⚡ Data model

We have three databases:

- The users database contains our users (duh). This database will serve as the single base of truth for everything user related in our apps.
- The hiking database is the base dedicated to the hiking backend service.
- The projects database is the base dedicated to the projects backend service.

Let's take a look at the schema:

![Diagram](./documentation/db-diagram.png)

## ⚡ Project structure

### 🎉 Apps

#### 🚀 Hiking app

This kiking app allows users to check and join hiking groups planning to do a walk on some trail. This app owns a database but also uses the Users database.

#### 🚀 Projects app

This projects app allows users to check contributions made to repositories. This app owns a database and also uses the Users database.

### 📙 Libs

#### ⚙️ Boostraper

The code necessary to create an app is defined there and shared between apps.

#### ⚙️ Databases

The base prisma services are defined on this shared module.

#### ⚙️ Decorators

Decorators used in all our apps.

#### ⚙️ Rxjs

Rxjs helpers.
