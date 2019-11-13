import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import config from '@/config.js';

let LOADED = false;

export default modelEnhance({
  namespace: 'admin',

  state: {
    pageData: PageHelper.create(),
    admins: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/admin' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'init'
          });
        }
      });
    }
  },

  effects: {

    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'getList'
      });
    },

    // 保存 之后查询分页
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          admin: true,
          url: '/admin/save',
          success,
          data: values
        }
      });
    },

    //激活 
    *setEnable({ payload = {} }, { call, put }) {
      const { id, val, success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/admin/${id}/${val}`
        }
      })
    },



    // 获取列表
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.admin);
      payload.pageNumber = payload.pageNumber || pageData.pageNum
      payload.pageSize = payload.pageSize || pageData.pageSize
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'admins',
          method: 'GET',
          actionType: 'GETDATA',
          url: `/admin/list`,
          data: payload
        }
      });
    }

  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      console.log(state);
      console.log(payload);
      let { pageData } = state
      pageData.total = payload.total
      payload.pageSize
      pageData.pageNum = payload.pageNumber ? payload.pageNumber : 1
      pageData.list = payload.contents

      return { ...state, ...pageData }
    }
  }


})