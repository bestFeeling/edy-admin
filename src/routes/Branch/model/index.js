import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { getArea } from '../service'

export default modelEnhance({
  namespace: 'branch',

  state: {
    pageData: PageHelper.create(),
    selectCnt: 0,
    areaSelectOption: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname && pathname.indexOf('/branch') > -1) {
          dispatch({
            type: 'getList'
          })
          dispatch({
            type: 'getAreaSelectData',
            payload: {
              id: 0
            }
          })
        }
      })
    }
  },

  effects: {

    // 获取区域数据
    *getAreaSelectData({ payload = {} }, { call, put }) {
      let response = yield call(getArea, payload);
      yield put({
        type: 'GET_AREA_DATA_SUCCESS',
        payload: { data: response.data, nowSelected: payload }
      })
    },
    // 查询分页
    *getList({ payload = {} }, { call, put, select }) {
      const { pageData } = yield select(state => state.branch);
      payload.pageNumber = payload.pageNumber || pageData.pageNum || 1
      payload.pageSize = payload.pageSize || pageData.pageSize
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          method: 'GET',
          actionType: 'GETDATA',
          url: `/branch/list`,
          data: payload
        }
      });
    },
    // 保存 
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      console.log('her?')
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/branch/save',
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
          url: `/branch/${ids}`,
        }
      });
    },

    *update({ payload }, { call, put }) {
      const { values, success } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/branch/update',
          success,
          data: values
        }
      });
    },

    *setState({ payload = {} }, { call, put }) {
      const { id, val, success, } = payload
      yield put({
        type: '@request',
        payload: {
          method: 'put',
          success,
          url: `/branch/stick/${id}/${val}`
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
    },

    GET_AREA_DATA_SUCCESS(state, { payload }) {

      const datFormat = (dat) => dat.map(d => {
        return {
          label: d.name,
          value: d.id,
          isLeaf: d.isLeaf || false,
          ...d
        }
      })

      if (payload && Array.isArray(payload.data)) {
        const { data, nowSelected } = payload
        let dat = datFormat(data)
        if (nowSelected.id == 0) {
          return { ...state, areaSelectOption: dat }
        } else {
          nowSelected.children = dat
        }
      }
      return { ...state, selectCnt: state.selectCnt + 1 }
    },
  }
})