type EventHandler<T> = (event: T) => void;
type EventHandlerList<T> = Set<EventHandler<T>> | undefined;
type EventSubscription = { unsubscribe: () => void };

class EventEmitter<T extends {}, K extends keyof T> {
  static create<T>() {
    return new EventEmitter<T, keyof T>();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _events: Map<K, EventHandlerList<any>> = new Map();

  on = <U extends K>(
    eventName: U,
    handler: EventHandler<T[U]>,
  ): EventSubscription => {
    let eventHandlerList: EventHandlerList<T[U]> = this._events.get(eventName);
    if (!eventHandlerList) {
      eventHandlerList = new Set();
      this._events.set(eventName, eventHandlerList);
    }
    eventHandlerList.add(handler);
    return {
      unsubscribe: () => this.remove(eventName, handler),
    };
  };

  emit = <U extends K>(eventName: U, eventData: T[U]) => {
    let eventHandlerList: EventHandlerList<T[U]> = this._events.get(eventName);
    if (eventHandlerList) {
      for (let handler of eventHandlerList) {
        handler(eventData);
      }
    }
  };

  remove = <U extends K>(eventName: U, handler: EventHandler<T[U]>) => {
    let eventHandlerList = this._events.get(eventName);
    if (eventHandlerList) {
      eventHandlerList.delete(handler);
    }
  };
}

export default EventEmitter;
