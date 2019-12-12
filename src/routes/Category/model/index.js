import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

export default modelEnhance({
  namespace: 'category',

  state: {
    pageData: PageHelper.create(),
    types: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname && pathname.indexOf('/category') > -1) {
          dispatch({
            type: 'getList'
          })
          dispatch({
            type: 'getTypes'
          })
        }
      })
    }
  },

  effects: {
    // 查询分页
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.category);
      payload.pageNumber = payload.pageNumber || pageData.pageNum

      payload.pageSize = payload.pageSize || pageData.pageSize
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          method: 'GET',
          actionType: 'GETDATA',
          url: `/category/list`,
          data: payload
        }
      });
    },

    *getTypes({ payload = {} }, { call, put, select }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          method: 'GET',
          actionType: 'GET_TYPE',
          url: `/category/types`,
        }
      });
    },

    // 保存 
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/category/save',
          success,
          data: values
        }
      });
    },

    *update({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/category/update',
          success,
          data: values
        }
      });
    },

    // 删除
    *remove({ payload }, { call, put, select }) {
      const { ids, success } = payload
      yield put({
        type: '@request',
        payload: {
          notice: true,
          method: 'delete',
          success,
          url: `/category/${ids}`,
        }
      });
    },

    *setEnable({ payload = {} }, { call, put }) {
      const { id, val, success, } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/category/${id}/${val}`
        }
      })
    },
  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      let { pageData } = state
      pageData.total = payload.total
      pageData.pageSize = payload.pageSize
      pageData.pageNum = payload.pageNumber
      pageData.list = payload.contents

      return { ...state, pageData }
    },

    GET_TYPE_SUCCESS(state, { payload }) {
      return { ...state, ...{ types: payload } }
    }
  }
})