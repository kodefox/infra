import EventEmitter from '../';

it('should handle events', () => {
  let resultsOne: Array<string> = [];
  let resultsTwo: Array<number> = [];
  type EventTypeList = { eventOne: string; eventTwo: Array<number> };
  let emitter = EventEmitter.create<EventTypeList>();
  emitter.on('eventOne', (data) => {
    // Here TS knows that data is a string.
    resultsOne.push(data.toUpperCase());
  });
  emitter.on('eventTwo', (data) => {
    // Here TS knows that data is an Array<number>.
    let newData = data.map((n) => n * 2);
    resultsTwo.push(...newData);
  });
  // Here TS will only let us pass a string as the second arg.
  emitter.emit('eventOne', 'Foo');
  emitter.emit('eventOne', 'bar');
  expect(resultsOne).toEqual(['FOO', 'BAR']);
  // Here TS will only let us pass an Array<number> as the second arg.
  emitter.emit('eventTwo', [1, 2]);
  emitter.emit('eventTwo', [3]);
  expect(resultsTwo).toEqual([2, 4, 6]);
});

it('should remove event handlers', () => {
  let resultsOne: Array<string> = [];
  type EventTypeList = { eventOne: string };
  let emitter = EventEmitter.create<EventTypeList>();
  let subscription = emitter.on('eventOne', (data) => {
    resultsOne.push(data);
  });
  emitter.emit('eventOne', 'abc');
  subscription.unsubscribe();
  emitter.emit('eventOne', 'def');
  expect(resultsOne).toEqual(['abc']);
});

it('should remove event handlers (alternate)', () => {
  let resultsOne: Array<string> = [];
  type EventTypeList = { eventOne: string };
  let emitter = EventEmitter.create<EventTypeList>();
  let handler = (data: string) => {
    resultsOne.push(data);
  };
  emitter.on('eventOne', handler);
  emitter.emit('eventOne', 'abc');
  emitter.remove('eventOne', handler);
  emitter.emit('eventOne', 'def');
  expect(resultsOne).toEqual(['abc']);
});
