import { ClientContextProvider, Action } from 'react-fetching-library';
import * as runtypes from 'runtypes';

import { createClient } from './client';
import { useQuery } from './hooks/useQuery';
import { useMutation } from './hooks/useMutation';

export {
  ClientContextProvider,
  createClient,
  useQuery,
  useMutation,
  runtypes,
  Action,
};
