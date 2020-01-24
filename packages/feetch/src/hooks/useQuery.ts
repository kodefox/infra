import { useQuery as useLibraryQuery, Action } from 'react-fetching-library';

import { Runtype } from 'runtypes';

type QueryOption<T> = {
  initFetch?: boolean;
  schema: Runtype<T>;
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
  if (queryResult.loading || queryResult.error) {
    return { ...queryResult };
  }
  try {
    option.schema.check(payload);
  } catch (e) {
    return {
      ...queryResult,
      error: true,
      errorObject: e,
    };
  }
  return {
    ...queryResult,
    payload: payload,
  };
}

export { useQuery };
