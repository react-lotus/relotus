import type { Axios, AxiosRequestConfig } from 'axios';
import type { KeycloakInstance } from 'keycloak-js';

const MIN_VALIDITY = 30;

interface Config {
  minValidity: number;
}

export async function setTokenToHeder(
  keycloak: KeycloakInstance,
  requestConfig: AxiosRequestConfig,
  config: Partial<Config> = {},
): Promise<AxiosRequestConfig> {
  // обновить токен, если его время жизни меньше чем minValidity секунд
  try {
    await keycloak.updateToken(config.minValidity ?? MIN_VALIDITY);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`Unable to update keycloak token: ${e as string}`);
  }

  const nextRequestConfig = { ...requestConfig };

  if (keycloak.token) {
    nextRequestConfig.headers = {
      ...requestConfig.headers,
      Authorization: `Bearer ${keycloak.token}`,
    };
  }
  return nextRequestConfig;
}

/**
 * Создает Axios интерцептор, который в заголовок Authorization добавляет токен из Keycloak
 *
 * @param {Axios} axios - инстанс Axios
 * @param {KeycloakInstance} keycloak - инстанс Keycloak
 * @param {Partial<Config>} [config] - параметры интерцептора
 * @returns {() => void} - функция, вызов которой уберет интерцептор
 */
export function bindInterceptor(
  axios: Axios,
  keycloak: KeycloakInstance,
  config?: Partial<Config>,
): () => void {
  const interceptor = axios.interceptors.request.use(
    (request) => setTokenToHeder(keycloak, request, config),
    (error) => Promise.reject(error),
  );
  return () => {
    axios.interceptors.request.eject(interceptor);
  };
}
