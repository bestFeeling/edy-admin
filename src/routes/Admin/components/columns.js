import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import LazyLoad from 'components/LazyLoad';
import { Tag, Card } from 'antd';
import config from '@/config';

export default (self) => [
  {
    title: 'ID',
    name: 'id',
    tableItem: {},
    searchItem: {
      group: 'abc'
    }
  },
  {
    title: '账号',
    name: 'username',
    tableItem: {},
    searchItem: {
      
    },
    formItem: {
      rules: [{
        required: true, 
        message: '请输入字典值' 
      }, {
        pattern: /^[a-zA-Z0-9_]{1,20}$/,
        message: '字典类型不允许输入特殊字符'
      }]
    }
  },
  {
    title: '密码',
    name: 'password',
    formItem: {
      type: "password",
      rules: [{
        required: true, 
        message: '请输入密码' 
      }]
    }
  },
  {
    title: '电话',
    name: 'phone',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {
      type: "number",
      rules: [{
        required: true, 
        message: '请输入电话' 
      }]
    }
  },
  {
    title: '状态',
    name: 'enable',
    tableItem: {
      render: (item) => {
        return <span>
          { item ? "激活":"关闭"}
        </span>
      }
    },
  },
  {
    title: '是否内建',
    name: 'isBuild',
    tableItem: {
      render: (item) => {
        return <span>
          { item ? "是":"否"}
        </span>
      }
    },
  },
  {
    title: '创建时间',
    name: 'createTime',
    tableItem: {},
  },
  {
    title: '更新时间',
    name: 'updateTime',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          {/* <Button tooltip="修改" onClick={e => self.onUpdate(record)}>
            <Icon type="edit" />
          </Button> */}
          {/* {
            record.isStick ? (
              <Button tooltip="取消置顶" onClick={e => self.setStick({ id: record.id, val: !record.isStick })}>
                <Icon type="down" antd />
              </Button>
            ) : (
                <Button tooltip="置顶" onClick={e => self.setStick({ id: record.id, val: !record.isStick })}>
                  <Icon type="up" antd />
                </Button>
              )
          } */}
          {
            record.enable ? (
              <Button tooltip="关闭" onClick={e => self.setEnable({ id: record.id, val: !record.enable })}>
                <Icon type="eye-invisible" antd />
              </Button>
            ) : (
                <Button tooltip="激活" onClick={e => self.setEnable({ id: record.id, val: !record.enable })}>
                  <Icon type="eye" antd />
                </Button>
              )
          }

          <Button tooltip="删除" onClick={e => self.onDelete(record)}>
            <Icon type="trash" />
          </Button>

          {/* <Button tooltip="跳转到新路由">
            <Link to={"/crud/detail?id=" + record.id}>
              <Icon type="link" antd />
            </Link>
          </Button> */}
        </DataTable.Oper>
      )
    }
  }
];
