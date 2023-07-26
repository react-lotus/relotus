export interface Event<T> {
  readonly type: unknown;
  payload: T;
}

export interface EventCreator<T> {
  (payload: T): Event<T>;
  match: (maybeEvent: unknown) => maybeEvent is Event<T>;
}

export function createEvent<T>(eventName: string): EventCreator<T> {
  const symbol = Symbol(eventName);
  function event(payload: T): Event<T> {
    return {
      type: symbol,
      payload,
    };
  }

  return Object.assign(event, {
    match: (maybeEvent: unknown): maybeEvent is Event<T> => {
      const { type } = maybeEvent as Event<unknown>;
      return type === symbol;
    },
  });
}
