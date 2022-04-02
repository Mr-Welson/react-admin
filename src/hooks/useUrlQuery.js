import { useMemo } from "react"
import { useLocation, useHistory } from 'react-router-dom';
import Utils from '@/utils';

const useUrlQuery = (initialState, action = 'replace') => {

  const location = useLocation();
  const history = useHistory();

  const urlQuery = useMemo(() => {
    return Utils.queryToObject(location.search);
  }, [location.search]);

  const query = useMemo(() => ({
    ...initialState,
    ...urlQuery
  }), [urlQuery])

  const setUrlQuery = (state) => {
    const newQuery = typeof state === 'function' ? state(query) : state;
    const search = Utils.objectToQuery({ ...urlQuery, ...newQuery }, false);
    history[action]({ ...location, search })
  }

  return [query, setUrlQuery];
}

export default useUrlQuery;