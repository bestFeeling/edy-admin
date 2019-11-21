import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import LazyLoad from 'components/LazyLoad';
import { Tag, Card, Select, message } from 'antd';
import config from '@/config';
const { Option } = Select;

export default (self) => [
  {
    title: 'ID',
    name: 'id',
    // tableItem: {},
    searchItem: {
      group: 'abc'
    }
  },
  {
    title: '标题',
    name: 'title',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {
      rules: [{
        required: true,
      }],
    }
  },
  {
    title: '内容',
    name: 'content',
    tableItem: {},
    formItem: {
      type: 'textarea',
      rules: [{
        required: true,
      }],
    },
  },
  {
    title: '消息类型',
    name: 'messageType',
    tableItem: {}
  },
  {
    title: '图标',
    name: 'icon',
    tableItem: {},
    formItem: {
      type: 'upload',
      action: '/fs/upload/image',
      max: 1,
      rules: [{
        required: true,
      }],

    }
  },
  {
    title: '推送时间',
    name: 'publishTime',
    tableItem: {}
  },
  {
    title: '消息状态',
    name: 'enable',
    tableItem: {
      render: (text, record) => {
        let val = record.enable ? '是' : '否'
        let col = record.enable ? 'cyan' : 'magenta'
        return (<Tag color={col}>{val}</Tag>)
      }
    },
    searchItem: {
      group: 'abc',
      // type: `select`,
      
    }
  },
  {
    title: '是否推送',
    name: 'isPush',
    tableItem: {
      render: (text, record) => {
        let val = record.isPush ? '是' : '否'
        let col = record.isPush ? 'cyan' : 'magenta'
        return (<Tag color={col}>{val}</Tag>)
      }
    }
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
          {
            record.enable ? (
              <Button tooltip="取消激活" onClick={e => self.setStick({ id: record.id, val: !record.enable })}>
                <Icon type="down" antd />
              </Button>
            ) : (
                <Button tooltip="激活" onClick={e => self.setStick({ id: record.id, val: !record.enable })}>
                  <Icon type="up" antd />
                </Button>
              )
          }
          {
            record.isPush ? (
              <Button tooltip="已推送" onClick={e => self.setPush({ id: record.id })}>
                <Icon type="eye" antd />
              </Button>
            ) : (
                <Button tooltip="推送" onClick={e => message.info("该消息已被推送.")} disable="true">
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
]