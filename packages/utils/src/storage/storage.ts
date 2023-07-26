/* eslint-disable no-underscore-dangle */

/**
 * Сериализует значение в JSON
 */
const fromJson = <T>(v: string | null) => (v ? (JSON.parse(v) as T) : null);

/**
 * Десериализует значение из JSON
 */
const toJson = (v: unknown) => JSON.stringify(v);

/**
 * Форматирует ключ если передан неймспейс
 */
const getName = (key: string, ns?: string) => {
  return ns ? `${ns}:${key}` : key;
};

/**
 * Конфиг хранилища по умолчанию
 */
type Config<T extends Record<string, unknown>> = Partial<T> & {
  // Namespace
  ns?: string;
};

type StorageValue<R> = (R extends Record<string, unknown> ? Partial<R> : R) | null;

/**
 * Кастомное хранилище
 */
export interface CustomStorage<T> {
  /**
   * Получение значения из хранилища
   */
  getItem(key: string, config: Partial<T>): unknown;
  /**
   * Установка значения в хранилище
   */
  setItem(key: string, value: unknown, config: Partial<T>): void;
  /**
   * Удаление значения из хранилища
   */
  removeItem(key: string, config: Partial<T>): void;
  /**
   * Очистка хранилища
   */
  clear(config: Partial<T>): void;
  /**
   * Сериализовать / десеарилизовать ли значения в JSON
   * перед сохранением / после извлечения из хранилища
   */
  serializeToJSON?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export class StorageService<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Текущий неймспейс */
  private _ns?: string;

  private storage: Storage | CustomStorage<T>;

  private _accessedKeys = new Map<string, unknown>();

  constructor(storage: Storage | CustomStorage<T>) {
    this.storage = storage;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.storage.serializeToJSON = storage.serializeToJSON ?? true;
  }

  /**
   * Обертка над методами хранилища для "безопасных" операций
   */
  private safetyStorage(op: 'getItem', key: string, config: unknown): unknown | null;

  private safetyStorage(op: 'setItem', key: string, value: unknown, config: unknown): void;

  private safetyStorage(op: 'removeItem', key: string, config: unknown): void;

  private safetyStorage(op: 'clear', config: unknown): void;

  private safetyStorage(operation: string, ...args: unknown[]) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return this.storage[operation](...args) as string | null | void;
    } catch (e) {
      return null;
    }
  }

  private get defaultConfig(): Config<Record<string, unknown>> {
    return {
      ns: this._ns,
    };
  }

  private mergeConfig(config?: Config<T>): Partial<Config<T>> {
    return {
      ...this.defaultConfig,
      ...(config || ({} as Config<T>)),
    };
  }

  /**
   * Устанавливает текущий неймспейс
   */
  ns = (ns: string): StorageService<T> => {
    this._ns = ns;
    return this;
  };

  /**
   * Безопасно сохраняет значение в хранилище
   */
  set = <V = unknown>(key: string, value: V, config?: Config<T>): void => {
    const storageConfig = this.mergeConfig(config);
    const keyWithNs = getName(key, storageConfig?.ns);
    const storeValue = this.storage.serializeToJSON ? toJson(value) : value;

    this.safetyStorage('setItem', keyWithNs, storeValue, storageConfig);

    if (this._accessedKeys.has(keyWithNs)) {
      this._accessedKeys.set(keyWithNs, storeValue);
    }
  };

  /**
   * Безопасно извлекает значение из хранилища
   * */
  get = <R>(key: string, config?: Config<T>): StorageValue<R> => {
    const storageConfig = this.mergeConfig(config);
    const keyWithNs = getName(key, storageConfig?.ns);
    const value = this.safetyStorage('getItem', keyWithNs, storageConfig);

    let result = value as StorageValue<R>;

    if (this.storage.serializeToJSON) {
      try {
        result = fromJson<StorageValue<R>>(value as string);
      } catch {
        result = null;
      }
    }
    this._accessedKeys.set(keyWithNs, result);
    return result;
  };

  /**
   * Безопасно удаляет элемент из хранилища
   */
  remove = (key: string, config?: Config<T>): void => {
    const storageConfig = this.mergeConfig(config);
    const keyWithNs = getName(key, storageConfig?.ns);

    this._accessedKeys.delete(keyWithNs);

    this.safetyStorage('removeItem', keyWithNs, storageConfig);
  };

  /**
   * Устанавливает значения батчем.
   * Ключ в объекте - ключ в хранилище.
   * Если в config передан неймспейс (или он установлен раньше), то он будет добавлен
   * к ключу
   */
  setBatch = (values: Record<string, unknown>, config?: Config<T>): void => {
    Object.keys(values).forEach((key) => this.set(key, values[key], config));
  };

  /**
   *  Объявляет предметную область.
   *
   *  Сеттер и геттер предметной области типизированны
   *  и служат для проверки что читается и устанавливается одно и тоже значение
   */
  domain = <R>(
    key: string,
    config?: Config<T>,
  ): {
    set: (value: R, setConfig?: Config<T>) => void;
    get: (getConfig?: Config<T>) => StorageValue<R>;
    remove: (removeConfig?: Config<T>) => void;
  } => {
    return {
      set: (value: R, setConfig?: Config<T>) =>
        this.set<R>(key, value, {
          ...this.mergeConfig(config),
          ...this.mergeConfig(setConfig),
        } as Config<T>),
      get: (getConfig?: Config<T>) => {
        return this.get<R>(key, {
          ...this.mergeConfig(config),
          ...this.mergeConfig(getConfig),
        } as Config<T>);
      },
      remove: (clearConfig?: Config<T>) => {
        this.remove(key, {
          ...this.mergeConfig(config),
          ...this.mergeConfig(clearConfig),
        } as Config<T>);
      },
    };
  };

  /**
   * Безопасно очищает хранилище
   */
  clear = (config?: Config<T>): void => {
    const storageConfig = this.mergeConfig(config);
    if (storageConfig.ns) {
      // eslint-disable-next-line no-console
      console.warn(`Storage.clear do not support namespaces. Whole storage will be cleared`);
    }
    this.safetyStorage('clear', storageConfig);
  };

  clearAllAccessedKeys = (): (() => void) => {
    const rollback: Array<() => void> = [];
    this._accessedKeys.forEach((value, key) => {
      this.remove(key);
      rollback.push(() => {
        this.set(key, value);
      });
    });
    return () => {
      rollback.forEach((fn) => fn());
    };
  };
}
