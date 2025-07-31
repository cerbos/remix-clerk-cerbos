# Cerbos, Remix and Clerk Example

This example shows how to use [Clerk](https://www.clerk.dev/) with [Remix](https://cerbos.dev) in a [Remix](https://remix.run/) application.

The example features adding sign up, sign in, profile management, and an authenticated API route to your Remix application, using **[Cerbos](https://cerbos.dev)** to authorize access.

## Table of Contents

- [Cerbos, Remix and Clerk Example](#cerbos-remix-and-clerk-example)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Included Tooling](#included-tooling)
  - [How to Run the Example](#how-to-run-the-example)
    - [1. Clone the repository and install the dependencies](#1-clone-the-repository-and-install-the-dependencies)
    - [2. Set up your Clerk account and project](#2-set-up-your-clerk-account-and-project)
    - [3. Add your ENV variables to an `.env` at the root of the project](#3-add-your-env-variables-to-an-envlocal-at-the-root-of-the-project)
    - [4. Start Cerbos locally](#4-start-cerbos-locally)
      - [Docker (recommended)](#docker-recommended)
      - [Binary](#binary)
    - [5. Start the demo locally](#5-start-the-demo-locally)
    - [6. Check out the example implementation](#6-check-out-the-example-implementation)
  - [Commands](#commands)
  - [Learn More](#learn-more)

## Overview

**[Cerbos](https://cerbos.dev)** is an open-source authorization-as-a-service option for allowing decoupled access control in your software. It allows writing human-readable policy definitions that serve as context-aware access control policies for your application resources.

Cerbos works with any identity provider services like Auth0, Okta, FusionAuth, Clerk, Magic, WorkOS or even your own, bespoke directory system.

In this demo we use [Clerk](https://www.clerk.dev/) as the identity provider.

Our [Remix](https://remix.run/) application will connect with Clerk for authentication and Cerbos for authorization, to decide what actions are available on which resources for a given user.

The policies is defined in the `cerbos/policies` directory. Each policy is authored in a very human-readable format which you can learn more about at the [Cerbos Policy documentation site](https://docs.cerbos.dev/cerbos/latest/policies), and for the demo revolves around access to a `contacts` resource.

### Tech Stack

- [Cerbos](https://cerbos.dev)
- [Clerk](https://www.clerk.dev/)
- [Remix v1.x](https://remix.run/)
- [React v18.x](https://reactjs.org/)

### Included Tooling

- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## How to Run the Example

### 1. Clone the repository and install the dependencies

```bash
git clone https://github.com/cerbos/remix-clerk-cerbos.git
```

Then `cd` into the project directory and run `npm install` to install the dependencies.

```sh
npm install
```

_Alternatviely you could use `yarn` or `pnpm` or anything that runs `npm scripts`_

### 2. Set up your Clerk account and project

Create a free account at https://clerk.dev and create a new **application** for `development`.

If you have any trouble you can check out [Clerk](https://clerk.dev)'s documentation for [setting up your application.](https://clerk.dev/docs/authentication/set-up-your-application)

### 3. Add your ENV variables to an `.env` at the root of the project

There are 2 environment variables from Clerk's SDK that need to be set for this demo to work.

There is a `.env.example` file in the root of the project that you can copy and rename to `.env` and add your Clerk API keys to.

```sh
# .env
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret_key
```

The Clerk API keys can be found at the [API Keys page](https://dashboard.clerk.dev/last-active?path=api-keys) in the Clerk dashboard.

### 4. Start Cerbos locally

Cerbos runs [along side of the app](https://docs.cerbos.dev/cerbos/latest/deployment/index.html), so for this local demonstration
you'll have to start **Cerbos** separately from the app.

There are many ways to run Cerbos:

- [A Docker Container (recommended for this demo)](docker--recommended-)
- [Homebrew](https://docs.cerbos.dev/cerbos/latest/installation/binary.html#homebrew)
- [Install from binary](https://docs.cerbos.dev/cerbos/latest/installation/binary.html)
- [Install from Helm chart](https://docs.cerbos.dev/cerbos/latest/installation/helm.html)

#### Docker (recommended)

**If you have [Docker](https://www.docker.com/) installed**: you can simply run the npm run script `cerbos:docker` from the root of the project to start **Cerbos** in a container.

```bash
npm run cerbos:docker
```

_(on windows you may need to run `npm run cerbos:docker:win`)_

#### Binary

If you **have the Cerbos binary installed locally** and available to the project, you can start Cerbos with the following command from the root of the project:

```bash
npm run cerbos
```

This will use the yaml policy files at `cerbos/policies/*.yaml` to configure authorization policies for Cerbos.

The `cerbos/policies` directory contains the policies that will be loaded into Cerbos when it starts. You can edit these policies to see how they affect the behavior of the app.

### 5. Start the demo locally

This demo is how to use Clerk with Cerbos in a Remix application, so to start it you can just start the Remix app in dev mode with the following command:

```bash
npm run dev
```

Which will start up a dev server which you can open in your browser.

You could also `npm run build` and `npm start` the app to see what it would be like in production. Deployment of this app is out of scope for this example.

### 6. Check out the example implementation

- Open your browser to `http://localhost:3000` to see the included example code running.

There is a demonstration of changing the user's role, and seeing how that affects the permissions of the user to take actions on the resources.

_\*\*Note: If you are having trouble, try running the example in incognito mode, some common browser extensions cause Remix to fail in dev mode._\*\*

## Commands

- `npm run dev` - Starts the development server.
- `npm run cerbos:docker` - Starts the Cerbos service in Docker.
- `npm run format` - Formats code with prettier for the entire project.
- `npm run build` - Builds the project for production.

## Learn More

To learn more about Cerbos, Remix and Clerk take a look at the following resources:

- [Cerbos Website](https://cerbos.dev)
- [Cerbos Documentation](https://docs.cerbos.dev)
- [Clerk.dev Documentation](https://docs.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=remix_starter) - learn about Clerk.dev features and API.
- [Remix Documentation](https://remix.run/docs?utm_source=github&utm_medium=starter_repos&utm_campaign=remix_starter) - learn about Remix features and API.
