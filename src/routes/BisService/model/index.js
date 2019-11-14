import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { getArea } from '../service'

export default modelEnhance({
  namespace: 'bisService',

  state: {
    pageData: PageHelper.create(),
    detail: {},
    detailFileList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname && pathname.indexOf('/bisService') > -1) {
          dispatch({
            type: 'getList'
          })
        }
      })
    }
  },

  effects: {

    // 查询分页
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.bisService);
      payload.pageNumber = payload.pageNumber || pageData.pageNum || 1
      payload.pageSize = payload.pageSize || pageData.pageSize
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          method: 'GET',
          actionType: 'GETDATA',
          url: `/project/list`,
          data: payload
        }
      });
    },
    *loadDetail({ payload }, { call, put }) {
      const { record, success } = payload
      yield put({ type: 'GET_DETAIL_SUCCESS', payload: {} })
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          method: 'GET',
          actionType: 'GET_DETAIL',
          url: `/project/${record.id}`
        }
      });

      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          method: 'GET',
          actionType: 'GET_DETAILFILELIST',
          url: `/project/${record.id}/files`
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
          url: '/project/save',
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
          url: `/project/${ids}`,
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
          url: `/project/${id}/${val}`
        }
      })
    },
  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      let { pageData } = state
      pageData.total = payload.total
      payload.pageSize
      pageData.pageNum = payload.pageNumber ? payload.pageNumber : 1
      pageData.list = payload.contents

      return { ...state, ...pageData }
    },

    GET_DETAIL_SUCCESS(state, { payload = {} }) {
      return { ...state, ...{ detail: payload } }
    },

    GET_DETAILFILELIST_SUCCESS(state, { payload = [] }) {
      return { ...state, ...{ detailFileList: payload } }
    }
  }
})