import {
  useNavigation as useBaseNavigation,
  useRoute,
} from '@react-navigation/native';

export function useNavigation() {
  let { navigate, replace, goBack } = useBaseNavigation();
  let { params } = useRoute();

  let getParam = (
    paramName: string,
    fallback?: string | number | null | undefined,
  ) => {
    let param = (params ?? {}) as Record<
      string,
      string | number | null | undefined
    >;
    let value = param[paramName] ?? fallback;
    if (value === undefined) {
      return fallback === undefined ? null : fallback;
    }
    return value;
  };

  return { navigate, replace, goBack, getParam };
}
