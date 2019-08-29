import { getLocalStorage, setLocalStorage } from '../../utils/persist'
import { getHeaderMenuList, getSideMenuList } from '../../services/page'
import { parse } from 'qs'
export default {
    namespace: 'page',
    state: {
        headerMenuList: [],
        sideMenuList: [],
    },
    reducers: {
      setHeaderMenuList(state, { payload: headerMenuList }) {
        return {
            ...state,
            headerMenuList
        };
      },
      setSideMenuList(state, { payload: sideMenuList }) {
        return {
            ...state,
            sideMenuList
        };
      },
    },
    effects: {
      *getHeaderMenuList({ payload }, { call, put }) {
        const { data, success } = yield call(getHeaderMenuList, parse(payload));
        if (success) {
          setLocalStorage('headerMenuList', data.list);
          yield put({
            type: 'setHeaderMenuList',
            payload: data.list,
          });
        }
      },
      *getSideMenuList({ payload }, { call, put }) {
        const { data, success } = yield call(getSideMenuList, parse(payload));
        if (success) {
          setLocalStorage('sideMenuList', data.list);
          yield put({
            type: 'sideMenuList',
            payload: data.list,
          });
        }
      }
    },
    subscriptions: {
      setup({ dispatch }) {
        const headerMenuList = getLocalStorage('headerMenuList');
        const sideMenuList = getLocalStorage('sideMenuList');
        if (headerMenuList && headerMenuList.length != 0) {
            dispatch({
                type: 'setHeaderMenuList',
                payload: headerMenuList
            });
        } else {
            dispatch({
                type: 'getHeaderMenuList',
                payload: {}
            });
        }
        if (sideMenuList && sideMenuList.length != 0) {
            dispatch({
                type: 'setSideMenuList',
                payload: sideMenuList
            });
        } else {
            dispatch({
                type: 'getSideMenuList',
                payload: {}
            });
        }
      },
    },
  };