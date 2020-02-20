import React, { ReactNode, ComponentType } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Record, String } from 'runtypes';
import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';

import { createClient, useMutation, ClientContextProvider, Action } from '../';

let client = createClient({});
let FetchProvider: ComponentType = ({ children }: { children?: ReactNode }) => (
  <ClientContextProvider client={client}>{children}</ClientContextProvider>
);

let clientWithFixtures = createClient({
  fixtures: [
    {
      method: 'POST',
      endpoint: '/messages',
      responseBody: {
        id: 'postID_jd91dh83h9d3esd',
      },
    },
  ],
});

let FetchProviderWithFixture: ComponentType = ({
  children,
}: {
  children?: ReactNode;
}) => (
  <ClientContextProvider client={clientWithFixtures}>
    {children}
  </ClientContextProvider>
);
describe('useMutation', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('should successfully mutate', async () => {
    const postMessageAction = (body: string): Action => ({
      method: 'POST',
      endpoint: '/messages',
      body,
    });

    const Return = Record({
      id: String,
    });

    let body = JSON.stringify({ name: 'John', message: 'This is message' });
    let mockPayload = { id: 'postID_jd91dh83h9d3esd' };

    fetchMock.mock('/messages', mockPayload);

    let { result, waitForNextUpdate } = renderHook(
      () => useMutation(postMessageAction, { schema: Return }),
      { wrapper: FetchProvider },
    );

    expect(result.current.loading).toBeFalsy();

    act(() => {
      result.current.mutate(body);
    });
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(200);
    expect(result.current.payload).toEqual(mockPayload);
  });

  it('should catch response status error', async () => {
    const postMessageAction = (body: string): Action => ({
      method: 'POST',
      endpoint: '/messages',
      body,
    });

    const Return = Record({
      id: String,
    });

    let body = JSON.stringify({ name: 'John', message: 'This is message' });

    fetchMock.mock('/messages', 404);

    let { result, waitForNextUpdate } = renderHook(
      () => useMutation(postMessageAction, { schema: Return }),
      { wrapper: FetchProvider },
    );

    expect(result.current.loading).toBeFalsy();

    act(() => {
      result.current.mutate(body);
    });
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(404);
    expect(result.current.error).toBeTruthy();
  });

  it('should catch payload type difference', async () => {
    const postMessageAction = (body: string): Action => ({
      method: 'POST',
      endpoint: '/messages',
      body,
    });

    const Return = Record({
      id: String,
    });

    let body = JSON.stringify({ name: 'John', message: 'This is message' });
    let mockPayload = { id: 27 };

    fetchMock.mock('/messages', mockPayload);

    let { result, waitForNextUpdate } = renderHook(
      () => useMutation(postMessageAction, { schema: Return }),
      { wrapper: FetchProvider },
    );

    expect(result.current.loading).toBeFalsy();

    act(() => {
      result.current.mutate(body);
    });
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(200);
    expect(result.current.error).toBeTruthy();
    expect(result.current.errorObject.message).toBe(
      'Expected string, but was number',
    );
  });

  it('should successfully mutate with fixture', async () => {
    const postMessageAction = (body: string): Action => ({
      method: 'POST',
      endpoint: '/messages',
      body,
    });

    const Return = Record({
      id: String,
    });

    let body = JSON.stringify({ name: 'John', message: 'This is message' });
    let mockPayload = { id: 'postID_jd91dh83h9d3esd' };

    let { result, waitForNextUpdate } = renderHook(
      () => useMutation(postMessageAction, { schema: Return }),
      { wrapper: FetchProviderWithFixture },
    );

    expect(result.current.loading).toBeFalsy();

    act(() => {
      result.current.mutate(body);
    });
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.status).toBe(200);
    expect(result.current.payload).toEqual(mockPayload);
  });
});
