<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [`@relotus/eslint`](#relotuseslint)
  - [Описание](#%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5)
  - [Подключение в чистый проект без eslint](#%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D1%87%D0%B8%D1%81%D1%82%D1%8B%D0%B9-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82-%D0%B1%D0%B5%D0%B7-eslint)
  - [Подключение в проект с уже существующим eslint](#%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82-%D1%81-%D1%83%D0%B6%D0%B5-%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D1%83%D1%8E%D1%89%D0%B8%D0%BC-eslint)
  - [Решение проблем, если используется react-scrips@4 и ниже](#%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC-%D0%B5%D1%81%D0%BB%D0%B8-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D1%82%D1%81%D1%8F-react-scrips4-%D0%B8-%D0%BD%D0%B8%D0%B6%D0%B5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# `@relotus/eslint`

## Описание

@relotus/eslint - npm-пакет с общим конфигом eslint для react проектов. У пакета в `peerDependencies` указаны точные версии пакетов eslint, поэтому нет необходимости добавлять их в `devDependencies` проекта

## Подключение в чистый проект без eslint

Установка:

```sh
npm install --save-dev @relotus/eslint-config
```

Отредактируй файл `.eslintrc.js` и укажи конфиг eslint

```js
module.exports = {
  extends: '@relotus/eslint-config',
};
```

Или конкретный (например web)

```js
module.exports = {
  extends: '@relotus/eslint-config/web',
};
```

Так же в нем нужно указать ссылку на конфиг ts

```js
module.exports = {
  ...
  parserOptions: {  project: './tsconfig.json' },
};
```

Добавь скрипт

```js
"eslint": "eslint --cache --cache-location \"node_modules/.cache/.eslintcache-local\" --ext js,ts,tsx src",
```

Для отдельных {типов} файлов можно переопределить набор правил.

ВАЖНО! Переопределение правил на проекте крайне не рекомендуется. Для того, что бы изменить правило - открывайте MR в этот пакет.

```js
module.exports = {
  ...
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: { 'prettier/prettier': 'off' },
    },
    {
      files: ['**/*.{js,jsx}'],
      extends: ['unikorn'],
      rules: { 'no-console-spaces': 'off' },
    },
  ],
};
```

Или для всех

```js
module.exports = {
  ...
  rules: {
    '@typescript-eslint/no-unused-vars': 'off'
  }
};
```

## Подключение в проект с уже существующим eslint

1. Удали те пакеты eslint, которые уже установлены в проекте
2. Пройди шаги из секции установки eslint в чистый проект
3. Помести новые ошибки под warn с помощью плагина

```sh
npm i eslint-plugin-only-warn
```

в конфиге .eslintrc.js добавить плагин

```sh
plugins: ['only-warn'],
```

4. Удали файл .eslintrc.extended.js и связанные с ним сущности (например, настройки в .vscode/settings.json и переменную EXTEND_ESLINT)
5. В файл .env.production добавь переменную DISABLE_ESLINT_PLUGIN. Билд в gitlab ci падает, если есть warnings, потому что из-за переменной CI=true, которая у нас используются во всех проектах, warnings определяются как errors. React scripts при билде прогоняет eslint еще раз, поэтому warnings будут возникать пока все ошибки eslint не будут устранены. В будущем предлагается эту переменную оставить, так как проверка на линты и так проходит перед каждым билдом.

```sh
DISABLE_ESLINT_PLUGIN=true
```

## Решение проблем, если используется react-scrips@4 и ниже

1. Из-за используемого в react-scripts@4 пакета eslint@7 (и ниже) будут конфликты с eslint@8, используемого в этом конфиге. Для фикса создай файл .env с переменной SKIP_PREFLIGHT_CHECK.

```sh
SKIP_PREFLIGHT_CHECK=true
```

2. Индивидуально в каждом проекте нужно обновить версии обычных пакетов, @types/ пакетов и исправить ошибки ts, если при тестировании и сборке возникают ошибки (проверить локально)
