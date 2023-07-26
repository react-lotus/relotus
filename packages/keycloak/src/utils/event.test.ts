import { createEvent } from './event';

describe('createEvent', () => {
  it('should create event creator', () => {
    const fooEvent = createEvent('foo');
    expect(fooEvent).toBeDefined();
  });

  it('should create valid events form event creator', () => {
    const EVENT_NAME = 'EVENT_NAME';
    const data = {
      some: 'payload',
    };
    const fooEvent = createEvent(EVENT_NAME);
    const { type, payload } = fooEvent(data);

    expect((type as string).toString()).toBe(`Symbol(${EVENT_NAME})`);
    expect(payload).toBe(payload);
  });

  describe('.match', () => {
    const EVENT_NAME = 'EVENT_NAME';
    const event = createEvent(EVENT_NAME);

    it('should add matcher to event', () => {
      expect(event.match).toBeDefined();
    });

    it('should match self', () => {
      expect(event.match(event('foo'))).toBeTruthy();
    });

    it('should not match other event', () => {
      const other = createEvent('OTHER');
      expect(event.match(other('foo'))).toBeFalsy();
    });

    it('should not match other event with same name', () => {
      const other = createEvent(EVENT_NAME);
      expect(event.match(other('foo'))).toBeFalsy();
    });
  });
});
