import { useQuery as useRFLQuery, Action } from 'react-fetching-library';
import { isLeft } from 'fp-ts/lib/Either';
import * as iots from 'io-ts';

// Re-export all io-ts modules
export { iots };

export function useQuery<T, R = {}>(
  action: Action<R>,
  validator: iots.Type<T>,
  initFetch?: boolean,
) {
  let result = useRFLQuery<T>(action, initFetch);
  let { payload, error } = result;
  if (error) {
    return result;
  }
  if (!payload) {
    return result;
  }
  let validatedPayload = validator.decode(payload);
  if (isLeft(validatedPayload)) {
    // TODO: Return error info
    return { ...result, error: true };
  }
  let newPayload: iots.TypeOf<typeof validator> = payload;
  return { ...result, error: false, payload: newPayload };
}
