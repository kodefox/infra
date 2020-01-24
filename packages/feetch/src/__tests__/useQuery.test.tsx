import React, { ReactNode, ComponentType } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Record, Number, String } from 'runtypes';
import fetchMock from 'fetch-mock';

import { createClient, useQuery, ClientContextProvider } from '../index';

let client = createClient({});
let FetchProvider: ComponentType = ({ children }: { children?: ReactNode }) => (
  <ClientContextProvider client={client}>{children}</ClientContextProvider>
);

describe('useQuery', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('should successfuly fetch', async () => {
    const fetchUsersList = {
      method: 'GET',
      endpoint: '/users',
    };
    let User = Record({
      id: Number,
      name: String,
    });
    let mockPayload = {
      id: 1,
      name: 'John',
    };
    fetchMock.mock('/users', mockPayload);
    let { result, waitForNextUpdate } = renderHook(
      () => useQuery(fetchUsersList, { schema: User }),
      { wrapper: FetchProvider },
    );
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(200);
    expect(result.current.payload).toEqual(mockPayload);
  });

  test('should successfuly fetch with init false', async () => {
    const fetchUsersList = {
      method: 'GET',
      endpoint: '/users',
    };
    let User = Record({
      id: Number,
      name: String,
    });
    let mockPayload = {
      id: 1,
      name: 'John',
    };
    fetchMock.mock('/users', mockPayload);
    let { result, waitForNextUpdate } = renderHook(
      () => useQuery(fetchUsersList, { schema: User, initFetch: false }),
      { wrapper: FetchProvider },
    );
    expect(result.current.loading).toBeFalsy();
    act(() => {
      result.current.query();
    });

    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(200);
    expect(result.current.payload).toEqual(mockPayload);
  });

  test('should catch response status error', async () => {
    const fetchUsersList = {
      method: 'GET',
      endpoint: '/users',
    };
    let User = Record({
      id: Number,
      name: String,
    });
    fetchMock.mock('/users', 404);
    let { result, waitForNextUpdate } = renderHook(
      () => useQuery(fetchUsersList, { schema: User }),
      { wrapper: FetchProvider },
    );
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.status).toEqual(404);
  });

  test('should catch response type different', async () => {
    const fetchUsersList = {
      method: 'GET',
      endpoint: '/users',
    };
    let User = Record({
      id: Number,
      name: String,
    });
    let mockPayload = {
      id: '1',
      name: 'John',
    };
    fetchMock.mock('/users', mockPayload);
    let { result, waitForNextUpdate } = renderHook(
      () => useQuery(fetchUsersList, { schema: User }),
      { wrapper: FetchProvider },
    );
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(200);
    expect(result.current.error).toBeTruthy();
  });
});
