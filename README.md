# Resume GPT

Resume GPT helps you create a perfect resume in seconds and land your dream job.

This project is an experiment to see how a modern web app, with features like auth, route handlers, server actions, and static pages would work in Next.js 13 app router.

## Running Locally

1. Install dependencies using pnpm:

```sh
yarn install
```

2. Create a new `.env` file based on `.env.example` and update the variables.

3. Generate Prisma Client

```sh
npx prisma generate
```


4. Start the development server:

```sh
yarn dev
```


## Features

- React 18
- Next.js 13 App Router
- Radix UI Primitives
- Shadcn UI
- React Hook Form
- Tailwind CSS
- Icons from [Lucide](https://lucide.dev)
- Dark mode with `next-themes`
- Authentication with `next-auth`
- Database ORM using Prisma and deployed to PlatnetScale
- Data transformation and enhancement using GPT - Open AI API
