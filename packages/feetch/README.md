# feetch · ![npm](https://img.shields.io/npm/v/feetch)

This is a fetching library for REST API. This library wrap `react-fetching-library` for fetching and `runtypes` for checking the type of the data from the server on runtime.

The way how to use `feetch` is similar to `react-fetching-library` but slightly different props in feetch when using `createClient`, `useQuery`, and `useMutation`. There will be an explanation regarding that below.

## Pre-requisites

Install `react-fetching-library`:

```
yarn add react-fetching-library
```

## Installation

After you install the pre-requisites libraries, you can install feetch using npm or yarn.

```
yarn add feetch
```

If you are using TypeScript, feetch is built using TypeScript and we shipped it along with the .d.ts file, so you do not have to install @types/feetch.

## Usage

#### createClient

How to create a `client` is similar to what react-fetching-library has. Feetch also provides [options](https://marcin-piela.github.io/react-fetching-library/#/?id=available-options) that exists in react-fetching-library.

```tsx
import { createClient } from 'feetch';

const client = createClient(options);
```

But feetch provide one more option for using fixtures data so the client will return the fixture data instead of calling the API.

```tsx
import { createClient } from 'react-fetching-library';

const client = createClient({
  ...options,
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
```

#### useQuery

Using `useQuery` also similar but feetch requires an option called `schema`. The schema is needed for feetch to check whether the returned data schema from the API is still valid or not. This way we could know whether the schema is changing or not during runtime.

If the schema of the returned data is different from the schema that we provide, `useQuery` will catch that as an error. So `error` will become `true` and `errorObject` will return the error message.

```tsx
import { useQuery, runtypes } from 'feetch';

const fetchUsersList = {
  method: 'GET',
  endpoint: '/users',
};

let UserSchema = runtypes.Record({
  id: runtypes.String,
  name: runtypes.String,
});

export const UsersListContainer = () => {
  const {
    loading,
    payload,
    error,
    errorObject,
    query,
    reset,
    abort,
  } = useQuery(fetchUsersList, { schema: UserSchema });

  return (
    <UsersList
      loading={loading}
      error={error}
      users={payload}
      onReload={query}
    />
  );
};
```

#### useMutation

Using `useMutation` also similar with `useQuery`. Feetch also requires `schema` to use.

```tsx
import { useMutation, runtypes } from 'feetch';

const addUserAction = (formValues) => ({
  method: 'POST',
  endpoint: '/users',
  body: formValues,
});

let Schema = runtypes.Record({
  id: runtypes.String,
  status: runtypes.Union(runtypes.Literal('success'), runtypes.Literal('fail')),
});

export const AddUserFormContainer = () => {
  const {
    loading,
    payload,
    mutate,
    error,
    errorObject,
    reset,
    abort,
  } = useMutation(addUserAction, { schema: Schema });

  const handleSubmit = async (formValues) => {
    const { error: mutateError } = await mutate(formValues);

    if (mutateError) {
      //show ie. notification
    }

    //success
  };

  return (
    <AddUserForm loading={loading} error={error} onSubmit={handleSubmit} />
  );
};
```
