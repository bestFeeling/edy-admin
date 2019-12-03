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
    tableItem: {
      render: (text, record) =>{
        switch (text) {
          case 0:
            return <span>报名中</span>;
            case 1:
            return <span>进行中</span>;
            case 2:
            return <span>验收</span>
            case 3:
            return <span>待付款</span>
            case 4:
            return <span>已付款</span>
            case 5:
            return <span>确认付款</span>
            case 6:
            return <span>已完成</span>
            case 7:
            return <span>已关闭</span>
          default:
            break;
        }
      }
    },
    searchItem: {
      group: 'abc'
    }
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => {
        let statusName = "", type = -1;
        switch (record.status) {
          case 0:
              statusName = "报名中";
              type = "";
            break;
            case 1:
                statusName = "审核";
                type = "setCheck";
                break;
            case 2:
                statusName = "确认审核";
                type = "setComfirmCheck";
                break;
            case 3:
                statusName = "支付";
                type = "setPayment"; //支付
                break;
            case 4:
                statusName = "确认支付";
                type = "setComfirmPayment"; //确认支付
                break;
            case 5:
                statusName = "完成任务";
                type = "setFinish"; //完成
                break;
            case 6:
                statusName = "关闭任务";
                type = "setClose"; //关闭
                break;
            case 7:
                statusName = "已关闭";
                type = "";
                break;
          default:
              statusName = "";
            break;
        }

        return (
          <DataTable.Oper>
          <Button tooltip={statusName} onClick={e => self.onSetting(record,type)}>
            <Icon type="file-protect" antd/>
          </Button>
          {/* <Button tooltip="审核" onClick={e => self.onCheck(record)}>
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
          </Button> */}
        </DataTable.Oper>
        )
      }
    }
  }
]