import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import config from '@/config.js';
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;

export default modelEnhance({
  namespace: 'push',
  state: {
    pageData: PageHelper.create(),
    pushes: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/push' && !LOADED) {
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

    // 获取列表
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.push);
      payload.pageNumber = payload.pageNumber || pageData.pageNum
      payload.pageSize = payload.pageSize || pageData.pageSize
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'pushes',
          method: 'GET',
          actionType: 'GETDATA',
          url: `/message/list`,
          data: payload
        }
      });
    },

        // 保存 之后查询分页
        *save({ payload }, { call, put, select, take }) {
          const { values, success } = payload;
          yield put.resolve({
            type: '@request',
            payload: {
              notice: true,
              url: '/message/save',
              success,
              data: values
            }
          });
        },

    // 激活
    *setStick({ payload = {} }, { call, put }) {
      const { id, val, success, } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/message/${id}/${val}`
        }
      })
    },
    
        // 删除 之后查询分页
        *remove({ payload }, { call, put, select }) {
          const { ids } = payload
          yield put({
            type: '@request',
            payload: {
              notice: true,
              method: 'delete',
              url: `/message/${ids}`,
            }
          });
        },

    
    //推送
    *setPush({ payload = {} }, { call, put }) {
      const { id, success } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/message/${id}`
        }
      })
    },

  },
  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      let { pageData } = state
      pageData.total = payload.total
      payload.pageSize
      pageData.pageNum = payload.pageNumber ? payload.pageNumber - 1 : 1
      pageData.list = payload.contents

      return { ...state, ...pageData }
    }
  }
})