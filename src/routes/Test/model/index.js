import modelEnhance from '@/utils/modelEnhance';

let LOADED = false;
export default modelEnhance({
  namespace: 'test',

  state: {
    testData: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/test' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'init'
          });
        }
      });
    }
  },

  effects: {

  },

  reducers: {
    
  }


});