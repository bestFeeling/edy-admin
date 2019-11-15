import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { getDetail } from '../service'

export default modelEnhance({
  namespace: 'bank',

  state: {
    pageData: PageHelper.create(),
    banks: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname && pathname.indexOf('/bankCard') > -1) {
          dispatch({
            type: 'getList'
          })
          dispatch({
            type: 'getBanks'
          })
        }
      })
    }
  },

  effects: {
    // 查询分页
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.bank);
      payload.pageNumber = payload.pageNumber || pageData.pageNumber
      payload.pageSize = payload.pageSize || pageData.pageSize

      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          method: 'GET',
          actionType: 'GETDATA',
          url: `/user/list`,
          data: payload
        }
      });
    },

    *getBanks({ payload = {} }, { call, put, select }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          method: 'GET',
          actionType: 'GET_BANK',
          url: `/bank/list`,
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
          url: '/bank/save',
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
          url: '/bank/update',
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
          url: `/bank/${ids}`,
        }
      });
    },

    *getDetail({ payload = {} }, { call, put }) {
      let response = yield call(getDetail, payload)

      yield put({
        type: 'setDetail',
        payload: {
          parent: payload,
          data: response.data || []
        }
      })
    },
  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      let { pageData } = state
      pageData.total = payload.total
      pageData.pageSize = payload.pageSize
      pageData.pageNum = payload.pageNumber + 1
      pageData.list = payload.contents

      return { ...state, pageData }
    },

    GET_BANK_SUCCESS(state, { payload }) {
      return { ...state, ...{ banks: payload } }
    },


    setDetail(state, { payload }) {
      const { parent, data } = payload
      let index = state.pageData.list.findIndex(it => it.id == parent.id)
      if (index != -1) {
        let p = PageHelper.create()
        p.list = data
        state.pageData.list[index]['details'] = p
      }
      return { ...state }
    }
  }
})