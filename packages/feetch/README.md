# feetch · ![npm](https://img.shields.io/npm/v/feetch)

This is a fetching library for REST API. This library wraps `react-fetching-library` for fetching and `runtypes` for checking the type of the data from the server at runtime.

The way you would use `feetch` is similar to `react-fetching-library` but with a slight difference of props in feetch when using `createClient`, `useQuery`, and `useMutation`. There will be an explanation regarding that below.

## Pre-requisites

Install `react-fetching-library`:

```
yarn add react-fetching-library
```

## Installation

After you install the pre-requisite libraries, you can install feetch using npm or yarn.

```
yarn add feetch
```

If you are using TypeScript, feetch is built using TypeScript and we shipped it along with the .d.ts file, so you do not have to install @types/feetch.

## Usage

#### createClient

Creating a `client` is similar to how it is done in `react-fetching-library`. `Feetch` also provides [options](https://marcin-piela.github.io/react-fetching-library/#/?id=available-options) that exists in react-fetching-library.

```tsx
import { createClient } from 'feetch';

const client = createClient(options);
```

`Feetch` also provides an option to use fixtures data so the client will return the fixtures data instead of calling the API.

```tsx
import { createClient } from 'feetch';

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

The usage of `useQuery` is also similar, but `feetch` requires an option called `schema`. The schema is needed by `feetch` to check whether the returned data schema from the API is still valid or not. This way, we can tell whether the schema changes or not during runtime.

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

The usage of `useMutation` is also similar to `useQuery`. `Feetch` also requires a `schema` to use.

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
      // do something with the error
    }

    //success
  };

  return (
    <AddUserForm loading={loading} error={error} onSubmit={handleSubmit} />
  );
};
```
