import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { getArea } from '../service'

export default modelEnhance({
  namespace: 'task',

  state: {
    pageData: PageHelper.create(),
    taskData: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname && pathname.indexOf('/task') > -1) {
          dispatch({
            type: 'getList'
          })
        }
      })
    }
  },

  effects: {

    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'getList'
      });
    },

    // 获取列表
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.task);
      payload.pageNumber = payload.pageNumber ? payload.pageNumber - 1 : 1
      payload.pageSize = payload.pageSize || pageData.pageSize
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'taskData',
          method: 'GET',
          actionType: 'GETDATA',
          url: `/task/list`,
          data: payload
        }
      });
    },
  
    //审核
    *setCheck({ payload = {} }, { call, put }) {
      const { id,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/acceptance/${id}`
        }
      })
    },

    // 确认审核
    *setComfirmCheck({ payload = {} }, { call, put }) {
      const { id,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/sponsor/${id}/false`
        }
      })
    },

    // 支付
    *setPayment({ payload = {} }, { call, put }) {
      const { id,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/pay/${id}`
        }
      })
    },

    // 确认支付
    *setComfirmPayment({ payload = {} }, { call, put }) {
      const { id,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/confirmPayment/${id}`
        }
      })
    },

    // 关闭
    *setClose({ payload = {} }, { call, put }) {
      const { id,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/close/${id}`
        }
      })
    },

     // 关闭
     *setFinish({ payload = {} }, { call, put }) {
      const { id,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/commit/${id}`
        }
      })
    },

  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      let { pageData } = state
      pageData.total = payload.total
      pageData.pageSize
      pageData.pageNum = payload.pageNumber ? payload.pageNumber - 1 : 1
      pageData.list = payload.contents

      return { ...state, ...pageData }
    }
  }


})