<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [`@relotus/storybook`](#relotusstorybook)
  - [Настройка Storybook для пакета](#%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-storybook-%D0%B4%D0%BB%D1%8F-%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D0%B0)
  - [В случае ошибок](#%D0%B2-%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B5-%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# `@relotus/storybook`

Вспомогательный пакет для настройки и запуска [Storybook](https://storybook.js.org/) в других пакетах. Содержит общие настройки для Storybook.

Является хостом для [Storybook Composition](https://storybook.js.org/docs/react/sharing/storybook-composition)

## Настройка Storybook для пакета

Запустить команду генерации конфигурации storybook для пакета:

```sh
npx nx workspace-generator storybook-configuration [<package_name>]
```

При необходимости можно внести изменения в файлы `packages/storybook/.storybook/constants.ts` и/или `packages/<package_name>/project.json` (например, для изменения порядка пакетов в боковом меню Storybook Composition, изменения значения порта локального сервера).

Изменения в конфигруацию webpack для storybook вносятся в метод `webpackFinal` в файле `packages/<package_name>/.storybook/main.ts`.

Проверить работоспособность, выполнив запуск следующих скриптов:

- `npx nx run <package_name>:storybook` - запуск отдельного storybook для пакета,
- `npx nx run <package_name>:build-storybook` - сборка отдельного storybook для пакета,
- `npm run storybook` - запуск общего Storybook Composition.

## В случае ошибок

Storybook для пакета может не запуститься с ошибкой парсинге ts-файлов.
Возможным решением проблемы может быть добавление `.babelrc` файла в корень пакета:

```json
{
  "presets": [
    [
      "@nrwl/react/babel",
      {
        "runtime": "automatic",
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins": []
}
```
