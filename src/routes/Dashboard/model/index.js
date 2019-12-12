import modelEnhance from '@/utils/modelEnhance';

export default modelEnhance({
  namespace: 'dashboard',

  state: {
    bar1: [],
    bar2: [],
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/dashboard') !== -1) {
          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: {
              valueField: 'bar1',
              
              method: 'GET',
              url: '/statistics/level',
            }
          });
          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: {
              valueField: 'bar2',
              actionType: 'GETDATA',
              method: 'GET',
              url: '/statistics/task',
            }
          });
        }
      });
    }
  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      console.log(state);
      const data = [];
      Object.keys(payload).map((item,index)=>{
        data.push({
          item: item,
          count: payload[item],
        })
      })
      return { ...state, bar2: data }
    }
  }


});