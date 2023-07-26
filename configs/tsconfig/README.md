<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [`@relotus/tsconfig`](#relotustsconfig)
  - [Описание](#%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5)
  - [Подключение в проект](#%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82)
  - [Пример использования](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# `@relotus/tsconfig`

## Описание

@relotus/tsconfig - npm-пакет с общим конфигом Typescript для React проектов. У пакета в `peerDependencies` указана точная версия TS, поэтому нет необходимости добавлять `typescript` в `devDependencies` проекта

## Подключение в проект

Установка:

```sh
npm install --save-dev @relotus/tsconfig
```

Отредактируй файл `tsconfig.json`:

```json
"extends": "@relotus/tsconfig"
```

Проверь результирующий конфиг TS

```sh
npx tsc --showConfig
```

## Пример использования

```json
{
  "extends": "@relotus/tsconfig",
  "compilerOptions": {
    "baseUrl": "./src"
  },
  "include": ["src", "./src/config"]
}
```

Переопределение общиx правил работает аналогично

```json
{
  "extends": "@relotus/tsconfig",
  "compilerOptions": {
    "target": "es5",
    "baseUrl": "./src"
  },
  "include": ["src", "./src/config"]
}
```
