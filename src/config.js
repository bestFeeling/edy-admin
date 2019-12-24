import React from 'react';
import PageLoading from 'components/Loading/PageLoading';
import { normal } from 'components/Notification';
import store from 'cmn-utils/lib/store';
import $$ from 'cmn-utils';

// 系统通知, 定义使用什么风格的通知，normal或antdNotice
const notice = normal;

/**
 * 应用配置 如请求格式，反回格式，异常处理方式，分页格式等
 */
export default {
  /**
   * HTML的title模板
   */
  htmlTitle: 'DBAdmin - {title}',

  baseUrl: 'http://ydy.cqhtxxkj.com',
  baseApiPrefix: '/api',

  customUpload: config => {
    const data = new FormData();
    let file = config.file
    data.append('files', file);
    $$.post('/fs/upload/images', data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(dat => {
      config.onSuccess(dat)
    }).catch(err => {
      config.onError(err)
    })

  },

  /**
   * 系统通知
   */
  notice,

  // 异步请求配置
  request: {
    // prefix: '/api',
    prefix: process.env.NODE_ENV === 'development' ? '/api' : 'http://ydy.cqhtxxkj.com',

    // 每次请求头部都会带着这些参数
    withHeaders: () => ({
      token: store.getStore("token"),
      'Authorization': $$.getStore('user')
    }),

    /**
     * 因为modelEnhance需要知道服务器反回的数据，
     * 什么样的是成功，什么样的是失败，如
     * {status: true, data: ...} // 代表成功
     * {status: false, message: ...} // 代表失败
     * 实际中应该通过服务端反回的response中的
     * 成功失败标识来进行区分
     */
    afterResponse: response => {
      const { status, message, errorCode, errorMsg } = response;
      // console.log(response)

      // 1008 重新登录
      if (errorCode && errorCode === 1008) {
        window.localStorage.clear()
        window.location.reload()
      }
      if (status || errorCode == 1000) {
        return response;
      } else if (errorCode) {
        throw new Error(errorMsg);
      } else {
        throw new Error(message);
      }
    },
    errorHandle: err => {
      // 请求错误全局拦截
      if (err.name === 'RequestError') {
        notice.error(err.text || err.message);
      } else if (typeof err === 'string') {
        notice.error(err);
      } else {
        notice.error(err);
      }
    }
  },

  // 全局异常
  exception: {
    global: (err, dispatch) => {
      const errName = err.name;
      // RequestError为拦截请求异常
      if (errName === 'RequestError') {
        notice.error(err.message);
      } else {
        console.error(err);
      }
    },
  },

  // 分页助手
  pageHelper: {
    // 格式化要发送到后端的数据
    requestFormat: pageInfo => {
      const { pageNum, pageSize, filters, sorts } = pageInfo;
      return {
        currentPage: pageNum,
        showCount: pageSize,
        sortMap: sorts,
        paramMap: filters
      };
    },

    // 格式化从后端反回的数据
    responseFormat: resp => {
      const {
        currentPage,
        showCount,
        totalResult,
        dataList,
        totalPage
      } = resp.data;
      return {
        pageNum: currentPage,
        pageSize: showCount,
        total: totalResult,
        totalPages: totalPage,
        list: dataList
      };
    }
  },

  // 路由加载效果
  router: {
    loading: <PageLoading loading />
  },

  /**
   * 模拟数据时包装反回数据
   * 因为，后端反回数据时一般都会在外边包装一层状态信息
   * 如成功时：
   * {
   *   status: true,
   *   data: responseData
   * }
   * 或出错时：
   * {
   *   status: false,
   *   code: 500,
   *   message: '用户名或密码错误'
   * }
   * 这里就是配置这两个函数，为了我们模拟数据时可以少写几行代码的 orz...
   */
  mock: {
    toSuccess: response => ({
      status: true,
      data: response
    }),

    toError: message => ({
      status: false,
      message: message
    })
  }
};
