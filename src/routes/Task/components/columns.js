import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Link } from 'dva/router';
import LazyLoad from 'components/LazyLoad';
import { Tag, Card } from 'antd';


export default (self) => [
  {
    title: '订单号',
    name: 'orderId',
    tableItem: {},
    
  },
  {
    title: '名称',
    name: 'name',
    tableItem: {},
  },
  {
    title: '任务名称',
    name: 'taskName',
    searchItem: {
      group: 'abc'
    }
  },
  {
    title: '分类',
    name: 'categoryName',
    tableItem: {},
    
  },
  {
    title: '概要',
    name: 'summary',
    tableItem: {},
    
  },
  {
    title: '价格',
    name: 'price',
    tableItem: {},
    
  },
  {
    title: '奖励金额',
    name: 'rebatePrice',
    tableItem: {},
    
  },
  {
    title: '折扣',
    name: '奖励百分比',
    tableItem: {},
    
  },
  {
    title: '支付方式',
    name: 'paymentType',
    tableItem: {},
    
  },
  {
    title: '电话',
    name: 'phone',
    tableItem: {},
    
  },
  {
    title: '完成时间',
    name: 'finishTime',
    tableItem: {},
    
  },
  {
    title: '状态',
    name: 'status',
    tableItem: {},
    searchItem: {
      group: 'abc'
    }
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="审核" onClick={e => self.onCheck(record)}>
            <Icon type="file-protect" antd/>
          </Button>
          <Button tooltip="支付" onClick={e => self.onPayment(record)}>
            <Icon type="money-collect" antd/>
          </Button>
          <Button tooltip="关闭" onClick={e => self.onCloseTask(record)}>
            <Icon type="stop" antd/>
          </Button>
          <Button tooltip="完成" onClick={e => self.onFinish(record)}>
            <Icon type="check-circle" antd/>
          </Button>
        </DataTable.Oper>
      )
    }
  }
]