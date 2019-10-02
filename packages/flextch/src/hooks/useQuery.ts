import { useQuery as useLibraryQuery, Action } from 'react-fetching-library';

import { Type } from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';

type QueryOption<T> = {
  initFetch?: boolean;
  schema: Type<T>;
};

type UseQueryResponse<T> = Omit<
  ReturnType<typeof useLibraryQuery>,
  'payload'
> & { payload?: T };

function useQuery<T>(
  action: Action,
  option: QueryOption<T>,
): UseQueryResponse<T> {
  let { payload, ...queryResult } = useLibraryQuery(action, option.initFetch);
  //loading
  if (queryResult.loading) {
    return { ...queryResult, loading: true };
  }
  if (queryResult.error) {
    return { ...queryResult };
  }
  let decodedPayload = option.schema.decode(payload);
  //if decode result in error
  if (isLeft(decodedPayload)) {
    return {
      ...queryResult,
      error: true,
      errorObject: decodedPayload.left,
    };
  }
  //successfull decode
  return {
    ...queryResult,
    payload: payload,
  };
}

export { useQuery };
