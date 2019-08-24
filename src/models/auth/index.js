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
  };