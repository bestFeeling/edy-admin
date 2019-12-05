import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { getArea } from '../service'

export default modelEnhance({
  namespace: 'task',

  state: {
    pageData: PageHelper.create(),
    taskData: [],
    status: [
      {
        code: 0,
        type: "报名中"
      },
      {
        code: 1,
        type: "进行中"
      },
      {
        code: 2,
        type: "验收"
      },
      {
        code: 3,
        type: "待付款"
      },
      {
        code: 4,
        type: "已付款"
      },
      {
        code: 5,
        type: "确认付款"
      },
      {
        code: 6,
        type: "已完成"
      },
    ]
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
      const { orderId,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/acceptance/${orderId}`
        }
      })
    },

    // 确认审核
    *setComfirmCheck({ payload = {} }, { call, put }) {
      const { orderId,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/sponsor/${orderId}/true`
        }
      })
    },

    // 支付
    *setPayment({ payload = {} }, { call, put }) {
      const { orderId,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/pay/${orderId}`
        }
      })
    },

    // 确认支付
    *setComfirmPayment({ payload = {} }, { call, put }) {
      const { orderId,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/confirmPayment/${orderId}`
        }
      })
    },

    // 关闭
    *setClose({ payload = {} }, { call, put }) {
      const { orderId,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/close/${orderId}`
        }
      })
    },

     // 完成任务
     *setFinish({ payload = {} }, { call, put }) {
      const { orderId,success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/task/commit/${orderId}`
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