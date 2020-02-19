import { navigate, useQueryParams, HookRouter } from 'hookrouter';

export function useNavigation() {
  let [queryParams] = useQueryParams();

  const navigation = {
    navigate: (
      routeName: string,
      params?: HookRouter.QueryParams | undefined,
      _action?: any | undefined, // eslint-disable-line @typescript-eslint/no-explicit-any
      _key?: string | undefined,
    ) => {
      navigate(routeName, false, params);
      return true;
    },

    replace: (
      routeName: string,
      params?: HookRouter.QueryParams | undefined,
      _action?: any | undefined, // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => {
      navigate(routeName, true, params);
      return true;
    },

    goBack: (_routeKey?: string | null | undefined) => {
      history.back();
      return true;
    },

    getParam: (
      paramName: string,
      fallback?: string | number | null | undefined,
    ) => {
      let value = queryParams[paramName];
      if (value === undefined) {
        return fallback === undefined ? null : fallback;
      }
      return value;
    },
  };

  return navigation;
}
