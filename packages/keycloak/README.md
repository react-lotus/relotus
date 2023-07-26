<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [`@relotus/keycloak`](#relotuskeycloak)
  - [Описание](#%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5)
  - [Подключение в проект](#%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82)
    - [Установка:](#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0)
    - [Пример использования](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# `@relotus/keycloak`

## Описание

@relotus/keycloak - npm-пакет для работы авторизации в корпоративном Keycloak

## Подключение в проект

### Установка:

```sh
npm install @relotus/keycloak
```

### Пример использования

Для использования Keycloak в приложении его необходимо проинициализировать:

```ts
import { initKeycloak } from '@relotus/keycloak';

const KeycloakProvider = initKeycloak({
  url: config.AUTH_HTTP,
  realm: config.AUTH_REALM,
  clientId: config.AUTH_CLIENT_ID,
});
```

`KeycloakProvider` - это компонент, в которое необходимо обернуть приложение для работы хуков из этого пакета.

> **ВАЖНО**
>
> Если в вашем проекте используется `ResetErrorBoundary` из `@relotus/utkonos`, то он должен быть ребенком для `KeycloakProvider`, а не наоборот:
>
> ```tsx
> <KeycloakProvider onUserLogin={login} onUserLogOut={logout}>
>   <ErrorBoundary>
>     <Provider store={store}>{appContent}</Provider>
>   </ErrorBoundary>
> </KeycloakProvider>
> ```
>
> В противном случае это приведет к тому, что в случае ошибки будет бесконечный редирект в Keycloak

#### Установка токена для запросов

Для упрощения работы с токеном, вы можете при вызове `initKeycloak` передать Аxios и для него будет установлен интерцептор:

```ts
import { initKeycloak } from '@relotus/keycloak';

const KeycloakProvider = initKeycloak(config, axios);
```

Теперь для каждого запроса будет добавлен заголовок `Authorization` со значением `Bearer ${keycloak.token}`.

Если в вашем приложении используется адаптер поверх Axios то можно использовать функцию `bindInterceptor`. Функция возвращает функцию, вызов которой уберет интерцептор.

```ts
import { initKeycloak } from '@relotus/keycloak';
import { bindInterceptor } from '@relotus/keycloak/src/interceptor';

const KeycloakProvider = initKeycloak(config, axios);
const { keycloak } = KeycloakProvider;

class Api {
  private _axios: AxiosInstance;

  private removeInterceptor: () => void;

  constructor() {
    this._axios = axios.create({
      baseURL: `${config.API_BASE_URL}/web`,
      paramsSerializer: formatParams,
    });
    this.removeInterceptor = bindInterceptor(this._axios, keycloak);
  }
}
```

#### Обработка событий

Есть несколько способов обработать события авторизации:

1. Самый простой - пробросить в KeycloakProvider обработчики для событий авторизации и завершения сессии:

   ```tsx
   import { initKeycloak } from '@relotus/keycloak';

   const KeycloakProvider = initKeycloak(config, axios);

   function App() {
     const handleLogin = useCallback((profile: KeycloakProfile) => {}, []);
     const handleLogout = useCallback(() => {}, []);
     return (
       <KeycloakProvider onUserLogin={handleLogin} onUserLogOut={handleLogout}>
         <MyApp />
       </KeycloakProvider>
     );
   }
   ```

2. Использовать chanel для саги

   ```ts
   import { createKeycloakChannel, events } '@relotus/keycloak/src/saga';

   function* saga() {
     const keycloakChannel = yield call(createKeycloakChannel)
     try {
       while (true) {
         let keycloakEvent = yield take(keycloakChannel)
         if(events.authSuccess(keycloakEvent)){
           // обрабатываем авторизацию;
           const { payload } = keycloakEvent
         }
       }
     } finally {
       if (yield cancelled()) {
         keycloakChannel.close()
       }
     }
   }
   ```

3. Для всех остальных случаев есть возможность подписаться на `AuthClientEvent` напрямую:

   ```ts
   import { initKeycloak } from '@relotus/keycloak';
   const KeycloakProvider = initKeycloak(config, axios);

   const eventName: AuthClientEvent = 'onAuthSuccess';

   const unsubscribe = KeycloakProvider.subscribe(
     eventName,
     ({ keycloak, error }: { error?: AuthClientError; keycloak: KeycloakInstance }) => {
       // Обрабатываем событие
     },
   );

   // Отписываемся
   unsubscribe();
   ```

#### Получение доступа к Keycloak

Для получения доступа в компонентах можно использовать хук `useKeycloak`:

```ts
import { useKeycloak } from '@relotus/keycloak';

const { keycloak } = useKeycloak();
const logout = useCallback(() => {
  keycloak.logout().catch(() => {
    /* обрабатываем ошибку */
  });
}, [toggleDetails]);
```

Вне компонентов, например для вызова `Keycloak#logout()`:

```ts
const { keycloak } = KeycloakProvider;
keycloak.logout().catch(() => {
  /* обрабатываем ошибку */
});
```

#### Проверка ролей

> **ВАЖНО**
>
> Роли настраиваются для `clientId` или `realmId` в админке Keycloak

Для проверки ролей в компоненте можно использовать хук `useHasRole`

```ts
import { useHasRole } from '@relotus/keycloak';

function Component() {
  const hasAdminRole = useHasRole('ADMIN');
  return hasAdminRole ? 'Я админ' : 'Я пользователь';
}
```

Хук проверяет как роли для для `clientId`, так и для `realmId`.

Вне компонента можно воспользоваться вызовом методов `hasRealmRole` (проверка роли для `realmId`) или `hasResourceRole` (проверка роли для `clientId`)

```ts
const isRealmManager = keycloak.hasRealmRole('MANAGER');
const isClientHasAccessToDictionaries = keycloak.hasResourceRole('Dictionaries.READ');
```

Для проверки роли можно воспользоваться утилитой `hasRole`:

```ts
import { hasRole } from '@relotus/keycloak/src/utils';

const { keycloak } = KeycloakProvider;
const hasAdminRole = hasRole(keycloak, 'ADMIN'); // Имеет роль ADMIN для clientId или для realmId
```

#### Mock для тестов

Для удобства тестирования в `setupTests` или в каждом тесте где это необходимо можно добавить:

```ts
import '@relotus/keycloak/src/mock';
```
