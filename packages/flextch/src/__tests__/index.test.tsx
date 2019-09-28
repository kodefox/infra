import React, { FunctionComponent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { createClient, ClientContextProvider } from 'react-fetching-library';
import fetchMock from 'fetch-mock';
import { useQuery, iots } from '..';

const client = createClient({});

const Result = iots.strict({ hello: iots.string });
const Results = iots.array(Result);
const Payload = iots.strict({ result: Results });

describe('useQuery', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should error fetching server', async () => {
    fetchMock.mock('/test', 404);

    const wrapper: FunctionComponent = ({ children }) => (
      <ClientContextProvider client={client}>{children}</ClientContextProvider>
    );
    let { result, waitForNextUpdate } = renderHook(
      () =>
        useQuery(
          {
            method: 'GET',
            endpoint: '/test',
          },
          Payload,
        ),
      { wrapper },
    );

    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
  });

  it('should error when server return wrong type', async () => {
    fetchMock.mock('/test', {
      result: [
        {
          hello: 123,
        },
      ],
    });

    const wrapper: FunctionComponent = ({ children }) => (
      <ClientContextProvider client={client}>{children}</ClientContextProvider>
    );
    let { result, waitForNextUpdate } = renderHook(
      () =>
        useQuery(
          {
            method: 'GET',
            endpoint: '/test',
          },
          Payload,
        ),
      { wrapper },
    );

    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
  });

  it('should success fetching', async () => {
    fetchMock.get('/test', {
      result: [
        {
          hello: 'world',
        },
      ],
    });

    const wrapper: FunctionComponent = ({ children }) => (
      <ClientContextProvider client={client}>{children}</ClientContextProvider>
    );
    let { result, waitForNextUpdate } = renderHook(
      () =>
        useQuery(
          {
            method: 'GET',
            endpoint: '/test',
          },
          Payload,
        ),
      { wrapper },
    );

    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
    expect(result.current.payload).toEqual({
      result: [{ hello: 'world' }],
    });
  });
});
