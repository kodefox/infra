import {useNavigation as useBaseNavigation} from './helpers/navigation-hooks';

export function useNavigation() {
  let {navigate, replace, goBack, getParam} = useBaseNavigation();
  return {navigate, replace, goBack, getParam};
}
