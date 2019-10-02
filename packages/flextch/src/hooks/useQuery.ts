import {
  useQuery as useLibraryQuery,
  Action,
  QueryResponse,
} from 'react-fetching-library';

import { Type } from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';

type QueryOption<T> = {
  initFetch: boolean;
  schema: Type<T>;
};

//this is a type extracted from useQuery result
type UseQueryResponse<T> = {
  status?: number | undefined;
  error: boolean;
  errorObject?: any;
  payload?: T | undefined;
  headers?: Headers | undefined;
  abort: () => void;
  loading: boolean;
  query: () => Promise<QueryResponse<T>>;
  reset: () => void;
};

function useQuery<T>(
  action: Action,
  { schema, initFetch = false }: QueryOption<T>,
): UseQueryResponse<T> {
  let { payload, loading, ...queryResult } = useLibraryQuery(action, initFetch);
  //loading
  if (loading) {
    return { ...queryResult, loading: true };
  }
  let decodedPayload = schema.decode(payload);
  //if decode result in error
  if (isLeft(decodedPayload)) {
    return {
      ...queryResult,
      loading: false,
      error: true,
      errorObject: decodedPayload.left,
    };
  }
  //successfull decode
  return {
    ...queryResult,
    loading: false,
    payload: decodedPayload.right,
  };
}

export { useQuery };
