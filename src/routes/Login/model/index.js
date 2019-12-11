import { routerRedux } from 'dva/router';
import { login, rsas } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {},
    loginVal: {}
  },

  subscriptions: {

    
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        
        
        if (pathname.indexOf('/sign/login') !== -1) {

          dispatch({
            type: 'rsa'
          });

          $$.removeStore('user');
        }
      });
    }
  },

  effects: {

        // 获取Rsa
        *rsa({ payload = {} }, { call, put, select }) {

          const { status, message, data, errorCode, errorMsg } = yield call(rsas, payload);
          
          yield put({
            type: 'getDetailSuccess',
            payload: data
          });
        },


    *login({ payload }, { call, put }) {
      try {
        const { status, message, data, errorCode, errorMsg } = yield call(login, payload);
        if (errorCode === 1000) {
          $$.setStore('user', data);
          yield put(routerRedux.replace('/'));
        } else {
          yield put({
            type: 'loginError',
            payload: { errorMsg }
          });
        }
      } catch (err) {
      }
    },
    *logout(_, { put }) { }
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message
      };
    },

    getDetailSuccess(state, { payload }) {
      return {
        ...state,
        loginVal: payload
      };
    },

  }
};
