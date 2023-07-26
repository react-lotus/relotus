<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Монорепозиторий @relotus](#%D0%BC%D0%BE%D0%BD%D0%BE%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B9-relotus)
  - [Основные команды](#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%8B)
    - [Запуск Storybook](#%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA-storybook)
    - [Quality gates](#quality-gates)
    - [Сборка](#%D1%81%D0%B1%D0%BE%D1%80%D0%BA%D0%B0)
    - [Релизы и публикация версий](#%D1%80%D0%B5%D0%BB%D0%B8%D0%B7%D1%8B-%D0%B8-%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B9)
  - [Установка новых зависимостей в пакет на примере utkonos](#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D0%BD%D0%BE%D0%B2%D1%8B%D1%85-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9-%D0%B2-%D0%BF%D0%B0%D0%BA%D0%B5%D1%82-%D0%BD%D0%B0-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D0%B5-utkonos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Монорепозиторий @relotus

## Основные команды

`npm run setup` - Установка зависимостей для монорепы и пакетов

`npm run unsetup` - Удаляет зависимости поставленные командой выше

### Запуск Storybook

Storybook опубликован в Gitlab Pages и доступен по адресу: https://utkonos.pages.utkonos.ru/utkonos

`npm run storybook` - запуск общего React UI Team Storybook в dev-режиме

`npm run build-storybook` - сборка общего React UI Team Storybook

`npx nx run <package_name>:storybook` - запуск storybook для пакета `package_name` (например, `utkonos`, `hooks`, `grid`)

`npx nx run <package_name>:build-storybook` - сборка storybook конкретного пакета `package_name` (например, `utkonos`, `hooks`, `grid`)

### Quality gates

`npm run test` - запуск тестов во всех проектах

`npm run check` - запуск всех quality gates

`npm run check:ts` - проверка типов во всех пакетах

`npm run check:lint` - запуск eslint во всех пакетах

`npm run check:format` - запуск форматтеров кода (prettier) для всех файлов

`npm run check:stylelint` - запуск stylelint для всех файлов

#### Автофикс ошибок

`npm run fix` - запуск всех quality gates с автофиксом ошибок

`npm run fix:lint` - запуск eslint во всех пакетах с автофиксом ошибок

`npm run fix:format` - запуск форматтеров кода (prettier) для всех файлов с автофиксом ошибок

`npm run fix:stylelint` - запуск stylelint для всех файлов с автофиксом ошибок

#### Запуск quality gates для конкретного пакета

`npx nx run <package_name>:test` - запуск тестов в конкретном пакете `package_name`

`npx nx run <package_name>:typecheck` - запуск проверки типов в конкретном пакете `package_name`

`npx nx run <package_name>:lint` - запуск eslint в конкретном пакете `package_name`

`npx nx run <package_name>:stylelint` - запуск stylelint в конкретном пакете `package_name`

### Сборка

`npm run build` - сборка всех пакетов

`npx nx build <package_name>` - сборка конкретного пакета `package_name` (например, `utkonos`, `hooks`, `grid`)

### Релизы и публикация версий

`npm run release:version` - релиз новой версии

`npm run release:rc` - релиз release candidate (RC) версии

`npm run release:publish` - публикация версии

## Установка новых зависимостей в пакет на примере utkonos

Для того чтобы поставить новую зависимость в пакет необходимо написать команду:

```sh
npx lerna add @testing-library/jest-dom@5.16.2 --scope @relotus/utkonos --dev
```

- `npx lerna add <npm_package_name>` - название устанавливаемой зависимости;
- `--scope @relotus/<package_name>` - куда установить;
- `--scope=@relotus/{utkonos,hooks}` - если нужно установить в несколько пакетов;
- `--dev` - установка в devDependencies.

❗️ Важно lerna устанавливает только 1 пакет за раз

Чтобы изменить версию зависимости или удалить её из пакета, необходимо:

- вручную отредактировать `package.json` пакета;
- запустить команду `lerna` для обновления завимостей:

```sh
npx lerna bootstrap
```
