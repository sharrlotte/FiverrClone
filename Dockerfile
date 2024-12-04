FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

WORKDIR /prod/backend
RUN pnpm prisma generate

WORKDIR /usr/src/app

RUN pnpm run -r build
RUN pnpm install --filter=backend -g @nestjs/cli
RUN pnpm deploy --filter=frontend --prod /prod/frontend
RUN pnpm deploy --filter=backend --prod /prod/backend

FROM base AS frontend
COPY --from=build /prod/frontend /prod/frontend
WORKDIR /prod/frontend
EXPOSE 3000
CMD [ "pnpm", "start" ]

FROM base AS backend
COPY --from=build /prod/backend /prod/backend
WORKDIR /prod/backend
EXPOSE 8000
CMD [ "pnpm", "start" ]
