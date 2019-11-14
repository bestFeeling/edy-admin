import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

export default modelEnhance({
  namespace: 'user',

  state: {
    pageData: PageHelper.create(),
    branchData: PageHelper.create()
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname && pathname.indexOf('/user') > -1) {
          dispatch({
            type: 'getList'
          })
          dispatch({
            type: 'getBranchList',
            payload: {
              id: 0
            }
          })
        }
      })
    }
  },

  effects: {
    // 查询分页
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.user);
      payload.pageNumber = payload.pageNumber || pageData.pageNum || 1
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

    *getBranchList({ payload = {} }, { call, put, select }) {
      const { branchData } = yield select(state => state.user);
      payload.pageNumber = payload.pageNumber || branchData.pageNum || 1
      payload.pageSize = payload.pageSize || branchData.pageSize
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          method: 'GET',
          actionType: 'GET_BRANCH',
          url: `/branch/list`,
          data: payload
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
          url: '/user/save',
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
          url: `/user/${ids}`,
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
          url: `/user/${id}/${val}`
        }
      })
    },
  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      let { pageData } = state
      pageData.total = payload.total
      pageData.pageSize = payload.pageSize
      pageData.pageNum = payload.pageNumber ? payload.pageNumber : 1
      pageData.list = payload.contents

      return { ...state, pageData }
    },

    GET_BRANCH_SUCCESS(state, { payload }) {
      let { branchData } = state
      branchData.total = payload.total
      branchData.pageSize = payload.pageSize
      branchData.pageNum = payload.pageNumber ? payload.pageNumber : 1
      branchData.list = payload.contents

      return { ...state, branchData }
    }
  }
})