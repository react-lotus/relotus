/* eslint-disable no-console, @typescript-eslint/require-await, import/no-anonymous-default-export */

/**
 * Jest's globalSetup
 *
 * Модуль глобальной настройки тестов, который экспортирует асинхронную функцию.
 * Она запускается один раз перед **всеми** наборами тестов. Эта функция получает в качестве параметра объект globalConfig.
 *
 * https://jestjs.io/docs/en/configuration#globalsetup-string
 */

export default async () => {
  process.env.TZ = 'UTC';

  console.log(`
✓ setupTestsGlobal.ts was executed
`);
};
