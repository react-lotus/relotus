<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [`@relotus/prettier-config`](#relotusprettier-config)
  - [Установка в обычный репозиторий](#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B2-%D0%BE%D0%B1%D1%8B%D1%87%D0%BD%D1%8B%D0%B9-%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B9)
  - [Установка в nx монорезитории](#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B2-nx-%D0%BC%D0%BE%D0%BD%D0%BE%D1%80%D0%B5%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# `@relotus/prettier-config`

Общая конфигурация `prettier` для React проектов.

## Установка в обычный репозиторий

Установить пакеты:

```sh
npm install --save-dev prettier@2.8.8 @relotus/prettier-config
```

Добавить в [проект конфигурацию для `prettier`](https://prettier.io/docs/en/configuration.html#sharing-configurations) с указанием `@relotus/prettier-config` в качестве наименования переиспользуемой конфигурации. Пример для указания через `package.json`:

```json
{
  "name": "project-name",
  "version": "0.0.0",
  "prettier": "@relotus/prettier-config"
}
```

Добавить файл `.prettierignore` игнорирования для форматирования:

```
node_modules/
/dist
/build
/coverage
```

> ❗ После установки необходимо перезапустить редактор кода, чтобы в нем использовалась актуальная версия `prettier`

## Установка в nx монорезитории

Установить пакет:

```sh
npm install --save-dev @relotus/prettier-config
```

Запусть nx-генератор, для установки дополнительных зависимостей и настройки конфигурации

```sh
npx nx generate @relotus/prettier-config:init
```

Будет установлена необходимая версия `prettier`, создан файл `.prettierignore` и настроена конфигурация для `prettier`.
