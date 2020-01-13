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
  namespace: 'omen',

  state: {
    pageData: PageHelper.create(),
    omens: [],
    types: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/omen' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'init'
          });

          dispatch({
            type: 'getTypes'
          })
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

//  绑定
    *link({ payload }, { call, put }) {

      const { values, success } = payload;
      
      console.log(values)
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'omens',
          method: 'GET',
          url: `/notice/info`,
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
          url: '/omenCategory/save',
          success,
          data: values
        }
      });
    },

    // // 修改
    // *update({ payload }, { call, put }) { },

    // 删除 之后查询分页
    *remove({ payload }, { call, put, select }) {
      const { ids } = payload
      yield put({
        type: '@request',
        payload: {
          notice: true,
          method: 'delete',
          url: `/omenCategory/${ids}`,
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
          url: `/omenCategory/${id}/${val}`
        }
      })
    },

    // 获取列表
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.omen);
      payload.pageNumber = payload.pageNumber || pageData.pageNum
      payload.pageSize = payload.pageSize || pageData.pageSize
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'omens',
          method: 'GET',
          actionType: 'GETDATA',
          url: `/omenCategory/list`,
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
          url: `/omenCategory/parent`,
        }
      });
    },

  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      let { pageData } = state
      pageData.total = payload.total
      pageData.pageSize = payload.pageSize
      pageData.pageNum = payload.pageNumber
      pageData.list = payload.contents

      return { ...state, ...pageData }
    },

    GET_TYPE_SUCCESS(state, { payload }) {
      payload.unshift({
        id: 0,
        name: "请选择"
      })
      return { ...state, ...{ types: payload } }
    }
  }
});
