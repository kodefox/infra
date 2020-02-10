import {
  createClient as createLibraryClient,
  ClientOptions as ClientLibraryOptions,
} from 'react-fetching-library';

import { findFixtures, generateResponseFromFixture } from './helpers/fixture';
import { Fixture } from './types/Fixture';

type ClientOptions<T> = ClientLibraryOptions<T> & {
  fixtures?: Array<Fixture>;
};

function createClient<T>({
  fetch: customFetch,
  fixtures,
  ...options
}: ClientOptions<T>) {
  let fetchWithFixtures = async (
    requestInfo: RequestInfo,
    requestOptions: RequestInit | undefined,
  ) => {
    if (fixtures && typeof requestInfo === 'string') {
      let method = (requestOptions && requestOptions.method) || 'GET';
      let fixture = findFixtures(requestInfo, method, fixtures);

      if (fixture) {
        return generateResponseFromFixture(fixture.responseBody);
      }
    }
    if (customFetch) {
      return customFetch(requestInfo, requestOptions);
    }
    return fetch(requestInfo, requestOptions);
  };

  return createLibraryClient<T>({ ...options, fetch: fetchWithFixtures });
}

export { createClient };
