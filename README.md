# FiverrClone

## Build docker image

```console
docker buildx build ./ -t 'fiverrclone'
docker run fiverrclone
```

## Install dependencies

```console
pnpm install
```

## Start dev server

```console
pnpm -r -stream dev
```
