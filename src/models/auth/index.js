import { getLocalStorage, setLocalStorage } from '../../utils/persist'
import { loginIn } from '../../services/auth'
import { parse } from 'qs'
export default {
    namespace: 'auth',
    state: {
        userInfo: {
            username: '',
        }
    },
    reducers: {
      'setUserInfo'(state, { payload: userInfo }) {
        return {
            ...state,
            userInfo
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
            payload: data,
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
      }
    },
    subscriptions: {
      setup({ dispatch }) {
        const data = getLocalStorage('userInfo');
        if (data) {
          dispatch({
            type: 'setUserInfo',
            payload: data
          });
        }
      },
    },
  };