import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import moment from 'moment';
import { Link } from 'dva/router';
import { Tag } from 'antd';

export default (self) => [
  {
    title: 'ID',
    name: 'id',
    tableItem: {},
    formItem: {
      type: 'hidden'
    },
    searchItem: {
      group: 'abc'
    }
  },
  {
    title: '商品名称',
    name: 'name',
    tableItem: {},
    formItem: {},
    searchItem: {
      group: 'abc'
    }
  },

  {
    title: '是否可用',
    name: 'enable',
    formItem: {
      type: 'radio',
      options: [
        { label: '是', value: true },
        { label: '否', value: false }
      ]

    }
  },

  {
    title: '价格',
    name: 'price',
    formItem: {
    }
  },

  {
    title: '返利点',
    name: 'rebates',
    formItem: {
    }
  },

  {
    title: '任务类型',
    name: 'status',
    formItem: {
    }
  },

  {
    title: '商品星级',
    name: 'level',
    formItem: {
    }
  },
  {
    title: '类型',
    name: 'type',
    tableItem: {},
    formItem: {},
    searchItem: {
      group: 'abc'
    }
  },

  {
    title: '分会',
    name: 'branchNames',
    tableItem: {
      render: (v) => v && v.length ? v.join(',') : v
    },
    formItem: {}
  },

  {
    title: '描述',
    name: 'summary',
    formItem: {}
  },

  {
    title: '创建人',
    name: 'userName',
    tableItem: {},
    formItem: {}
  },
  {
    title: '创建人号码',
    name: 'phone',
    tableItem: {},
    formItem: {}
  },

  {
    title: '申请开始时间',
    name: 'applyStartTime',
    tableItem: {
      render: (t) => t ? moment(t).format('YYYY-MM-DD HH:mm:ss') : t
    },
    formItem: {
      type: 'datetime',
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },

  {
    title: '申请结束时间',
    name: 'applyEndTime',
    tableItem: {
      render: (t) => t ? moment(t).format('YYYY-MM-DD HH:mm:ss') : t
    },
    formItem: {
      type: 'datetime',
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    title: '结束开始时间',
    name: 'finishStartTime',
    tableItem: {
      render: (t) => t ? moment(t).format('YYYY-MM-DD HH:mm:ss') : t
    },
    formItem: {
      type: 'datetime',
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    title: '活动结束时间',
    name: 'finishEndTime',
    tableItem: {
      render: (t) => t ? moment(t).format('YYYY-MM-DD HH:mm:ss') : t
    },
    formItem: {
      type: 'datetime',
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },

  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="查看详情" onClick={e => self.loadDetail(record)}>
            <Icon antd type="right" />
          </Button>

          <Button tooltip="删除" onClick={e => self.onDelete(record)}>
            <Icon type="trash" />
          </Button>
        </DataTable.Oper>
      )
    }
  }
]