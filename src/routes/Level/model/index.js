import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import config from '@/config.js';

let LOADED = false;

export default modelEnhance({
  namespace: 'level',

  state: {
    pageData: PageHelper.create(),
    levels: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/level' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'getList'
          })
        }
      });
    }
  },

  effects: {

    // 保存 之后查询分页
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          url: '/system/level/save',
          success,
          data: values
        }
      });
    },

    // 获取列表
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.level);
      payload.pageNumber = payload.pageNumber ? payload.pageNumber : 1
      payload.pageSize = payload.pageSize || pageData.pageSize
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'levels',
          method: 'GET',
          actionType: 'GETDATA',
          url: `/system/level/list`,
          data: payload
        }
      });
    }

  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      console.log(state);
      console.log(payload);
      payload.map((item,index)=>{
        item["key"] = index;
      })
      let { pageData } = state
      pageData.total = payload.total
      payload.pageSize
      pageData.pageNum = payload.pageNumber ? payload.pageNumber : 1
      pageData.list = payload

      return { ...state, ...pageData }
    }
  }


})