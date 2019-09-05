import { routerRedux } from 'dva/router'
import { getLocalStorage, setLocalStorage } from '../../utils/persist'
import { loginIn, getRouteInfo, getRoleList } from '../../services/auth'
import { parse } from 'qs'
export default {
  namespace: 'auth',
  state: {
    userInfo: {
      username: '',
    },
    routeInfo: null,
    roleList: []
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
    },
    setRoleList (state, { payload: roleList }) {
      console.debug('修改角色信息')
      return {
        ...state,
        roleList
      };
    },
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
        const { data, success } = yield call(getRouteInfo, {});
        if (success) {
          setLocalStorage('userInfo', data);
          yield put({
            type: 'setRouteInfo',
            payload: data,
          });
          yield put(routerRedux.push('/'));
        }
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
        // setLocalStorage('userInfo', data);
        yield put({
          type: 'setRouteInfo',
          payload: data,
        });
      }
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
    *getRoleList({ payload }, { call, put }) {
      const { data, success } = yield call(getRoleList, {});
      if (success) {
        yield put({
          type: 'setRoleList',
          payload: data.list
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch,history }) {
      const data = getLocalStorage('userInfo');
      if (data) {
        dispatch({
          type: 'refresh',
          payload: data
        });
      }
    },
  },
};