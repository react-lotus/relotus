<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [`@relotus/stylelint-config`](#relotusstylelint-config)
  - [Описание](#%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5)
  - [Подключение в проект](#%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82)
  - [Пример использования](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)
  - [Расширение](#%D1%80%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D0%B5)
  - [VSCode](#vscode)
  - [WebStorm](#webstorm)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# `@relotus/stylelint-config`

## Описание

@relotus/stylelint-config - npm-пакет с общим конфигом Stylelint для React проектов. У пакета в `peerDependencies` указаны точные версии пакетов `stylelint`, `stylelint-config-css-modules`, `stylelint-config-recommended-scss`, `stylelint-z-index-value-constraint`, поэтому нет необходимости добавлять их в `devDependencies` проекта

## Подключение в проект

Установка:

```sh
npm install --save-dev @relotus/stylelint-config
```

В корне проекта создаём файл `.stylelintrc.json`:

```json
{
  "extends": ["@relotus/stylelint-config"]
}
```

В `package.json` пишем команду для проверки стилей:

```json
"lint:styles": "stylelint \"src/**/*.{css,scss}\""
```

## Пример использования

```sh
npm run lint:styles
```

## Расширение

При действительной необходимости (например, время до рефакторинга проекта) можно расширить правила (изменить, добавить свои):

```json
{
  "extends": ["@relotus/stylelint-config"],
  "rules": {
    "max-nesting-depth": 2,
    "plugin/z-index-value-constraint": { "max": 100 }
  }
}
```

## VSCode

Для автоматической правки стилей в VSCode устанавливаем плагин `Stylelint`: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint#editor.codeactionsonsave, далее в настройках пишем:

```json
"stylelint.validate": ["css", "less", "postcss", "scss", "sass"],
"editor.codeActionsOnSave": {
  "source.fixAll": true
}
```

Исправление стилей согласно правилам будет происходить при каждом сохранении файла с одним из перечисленных расширений

## WebStorm

Возможна автоматическая подсветка неправильного синтаксиса. В меню выбираем `Preferences -> Languages&Frameworks -> Style sheets -> Stylelint`. Плагин `stylelint` должен подтянуться автоматически. В секции `Run for files` пишем нужный паттерн. Выставляем чекбокс `Enable`.
