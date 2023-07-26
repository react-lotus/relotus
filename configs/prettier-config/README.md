<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [`@relotus/prettier-config`](#relotusprettier-config)
  - [Установка](#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# `@relotus/prettier-config`

Общая конфигурация `prettier` для React проектов.

## Установка

Установить пакеты:

```sh
npm install --save-dev --save-exact prettier@2.7.1 @relotus/prettier-config
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
package.json
package-lock.json
CHANGELOG.md
/build
/coverage
```

> ❗ После установки необходимо перезапустить редактор кода, чтобы в нем использовалась актуальная версия `prettier`
