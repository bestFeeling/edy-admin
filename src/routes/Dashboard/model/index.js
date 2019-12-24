import modelEnhance from '@/utils/modelEnhance';

export default modelEnhance({
  namespace: 'dashboard',

  state: {
    bar1: [],
    bar2: [],
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    line1Data: {
      chargeItems: [],
      payItems: []
    },
    line2Data: {
      chargeItems: [],
      payItems: []
    }
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
              actionType: 'DATABAR',
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

          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: {
              valueField: 'line1Data',
              actionType: 'LINE1',
              method: 'GET',
              url: '/statistics/push',
            }
          });

          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: {
              valueField: 'line2Data',
              actionType: 'LINE2',
              method: 'GET',
              url: '/statistics/commit',
            }
          });
        }
      });
    }
  },

  reducers: {
    GETDATA_SUCCESS(state, { payload }) {
      const data = [];
      Object.keys(payload).map((item,index)=>{
        let name = "";
        if(item==="commitChangeTaskNumber"){
          name = "完成付费任务的数量";
        }else
        if(item==="commitPayTaskNumber"){
          name = "完成收费任务的数量";
        }else
        if(item==="pushChangeTaskNumber"){
          name = "发布收付的任务的数量";
        }else
        if(item==="pushPayTaskNumber"){
          name = "发表付费任务的数量";
        }
        data.push({
          item: name,
          count: payload[item],
        })
      })
      return { ...state, bar2: data }
    },

    DATABAR_SUCCESS(state, { payload }){
        // console.log(payload["0"].count)
        let level1 = 0,level2 = 0,level3 = 0,level4 = 0,level5 = 0;
        payload.map((item,index)=>{
          if(item["level"]===1){
            level1 = item["count"];
          }
          if(item["level"]===2){
            level2 = item["count"];
          }
          if(item["level"]===3){
            level3 = item["count"];
          }
          if(item["level"]===4){
            level4 = item["count"];
          }
          if(item["level"]===5){
            level5 = item["count"];
          }
        })
        return { ...state,level1,level2,level3,level4,level5 }
    },

    LINE1_SUCCESS(state, {payload}){
      // console.log(payload)

      return { ...state, line1Data: payload }
    },

    LINE2_SUCCESS(state, {payload}){
      // console.log(payload)

      return { ...state, line2Data: payload }
    }
  }


});