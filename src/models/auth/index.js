import { routerRedux } from 'dva/router'
import { getLocalStorage, setLocalStorage } from '../../utils/persist'
import { loginIn, getRouteInfo } from '../../services/auth'
import { parse } from 'qs'
export default {
  namespace: 'auth',
  state: {
    userInfo: {
      username: '',
    },
    routeInfo: {}
  },
  reducers: {
    setUserInfo (state, { payload: userInfo }) {
      console.debug('设置用户信息', state);
      return {
        ...state,
        userInfo
      };
    },
    setRouteInfo (state, { payload: routeInfo }) {
      console.debug('修改路由信息')
      return {
        ...state,
        routeInfo
      };
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.debug('触发登陆', payload);
      const { data, success } = yield call(loginIn, parse(payload));
      console.debug('登陆结果', data);
      if (success) {
        setLocalStorage('userInfo', data);
        yield put({
          type: 'setUserInfo',
          payload: payload.userInfo,
        });
      }
    },
    *logout({ payload }, { call, put }) {
      let empty = {
        username: '',
      }
      setLocalStorage('userInfo', empty);
      yield put({
        type: 'setUserInfo',
        payload: empty,
      });
      yield put(routerRedux.push('/login'));
    },
    *getRouteInfo({ payload }, { call, put }) {
      console.debug('获取权限路由信息', arguments);
      const { data, success } = yield call(getRouteInfo, {});
      if (success) {
        setLocalStorage('userInfo', data);
        yield put({
          type: 'setRouteInfo',
          payload: data,
        });
      }
    },
    *loginFlow ({ payload }, { call, put }) {
      yield put({
        type: 'login',
        payload
      });
      yield put({
        type: 'getRouteInfo',
        payload
      });
      yield put(routerRedux.push('/'));
    },
    *refresh ({ payload }, { call, put }) {
      yield put({
        type: 'setUserInfo',
        payload
      });
      yield put({
        type: 'getRouteInfo',
        payload
      });
      console.debug('refresh')
    },
  },
  subscriptions: {
    setup({ dispatch,history }) {
      const data = getLocalStorage('userInfo');
      if (data) {
        dispatch({
          type: 'refresh',
          payload: data
        });
      } else {
        dispatch({
          type: 'init',
          payload: data
        });
      }
    }
  },
};