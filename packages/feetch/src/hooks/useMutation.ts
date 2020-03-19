import {
  useMutation as useLibraryMutation,
  Action,
} from 'react-fetching-library';
import { UseMutationResponse as UseLibraryMutationResponse } from 'react-fetching-library/lib/client/client.types';
import { Runtype } from 'runtypes';

type ActionCreator<S, R> = (action: S) => Action<R>;
type MutationOption<T> = { schema: Runtype<T> };

type UseMutationResponse<T> = Omit<
  UseLibraryMutationResponse<any, T>, // eslint-disable-line @typescript-eslint/no-explicit-any
  'payload'
> & { payload?: T };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useMutation<T = any, R = {}, S = any>(
  actionCreator: ActionCreator<S, R>,
  option: MutationOption<T>,
): UseMutationResponse<T> {
  let { payload, ...mutationResult } = useLibraryMutation(actionCreator);

  if (mutationResult.loading || mutationResult.error) {
    return { ...mutationResult };
  }

  try {
    option.schema.check(payload);
  } catch (error) {
    return {
      ...mutationResult,
      error: true,
      errorObject: error,
    };
  }

  return { ...mutationResult, payload };
}

export { useMutation };
