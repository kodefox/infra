import React, { ReactNode, ComponentType } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Record, Number, String } from 'runtypes';
import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';

import { createClient, useQuery, ClientContextProvider } from '..';

let client = createClient({});

let clientWithFixtures = createClient({
  fixtures: [
    {
      method: 'GET',
      endpoint: '/me',
      responseBody: {
        id: 1,
        name: 'John Fixture',
      },
    },
  ],
});

let FetchProvider: ComponentType = ({ children }: { children?: ReactNode }) => (
  <ClientContextProvider client={client}>{children}</ClientContextProvider>
);
let FetchProviderWithFixture: ComponentType = ({
  children,
}: {
  children?: ReactNode;
}) => (
  <ClientContextProvider client={clientWithFixtures}>
    {children}
  </ClientContextProvider>
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
  test('should successfuly fetch fixture', async () => {
    const fetchUsersList = {
      method: 'GET',
      endpoint: '/me',
    };
    let User = Record({
      id: Number,
      name: String,
    });
    let { result, waitForNextUpdate } = renderHook(
      () => useQuery(fetchUsersList, { schema: User }),
      { wrapper: FetchProviderWithFixture },
    );
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(200);
    expect(result.current.payload).toEqual({ id: 1, name: 'John Fixture' });
  });
  test('should successfuly fetch normally if fixture not found', async () => {
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
      { wrapper: FetchProviderWithFixture },
    );
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(200);
    expect(result.current.payload).toEqual(mockPayload);
  });
  test('should successfuly fetch with custom fetch', async () => {
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
    let clientWithCustomFetch = createClient({ fetch });

    let FetchProviderWithCustomFetch: ComponentType = ({
      children,
    }: {
      children?: ReactNode;
    }) => (
      <ClientContextProvider client={clientWithCustomFetch}>
        {children}
      </ClientContextProvider>
    );
    let { result, waitForNextUpdate } = renderHook(
      () => useQuery(fetchUsersList, { schema: User }),
      { wrapper: FetchProviderWithCustomFetch },
    );
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(200);
    expect(result.current.payload).toEqual(mockPayload);
  });
});
