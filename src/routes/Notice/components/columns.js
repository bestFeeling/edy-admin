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
    title: '推送状态',
    name: 'isPush',
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
    formItem: {}
  },
  {
    title: '封面',
    name: 'cover',
    tableItem: {
      render: (item) => {
        return (
          <Card
            hoverable
            style={{ display: 'inherit' }}
            bodyStyle={{ padding: 0 }}
            cover={
              <LazyLoad
                dataSrc={item}
                style={{ height: '120px', width: 'auto' }}
                onClick={e => self.onPreview(item)}
              />
            }
          >
          </Card>
        )
      }
    },
    formItem: {
      type: 'upload',
      action: '/fs/upload/image',
      max: 1

    }
  },
  {
    title: '内容',
    name: 'content',
    formItem: {
      type: 'textarea'
    },
  },
  {
    title: '概要',
    name: 'summary',
    formItem: {}
  },
  {
    title: '失效时间',
    name: 'expireTime',
    formItem: {
      type: 'date'
    }
  },

  {
    title: '是否置顶',
    name: 'isStick',
    tableItem: {
      render: (text, record) => {
        let val = record.isStick ? '是' : '否'
        let col = record.isStick ? 'cyan' : 'magenta'
        return (<Tag color={col}>{val}</Tag>)
      }
    },

  },

  {
    title: '是否上架',
    name: 'isPush',
    tableItem: {
      render: (text, record) => {
        let val = record.isPush ? '是' : '否'
        let col = record.isPush ? 'cyan' : 'magenta'
        return (<Tag color={col}>{val}</Tag>)
      }
    },
  },

  {
    title: '作者',
    name: 'authorName',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {}
  },
  {
    title: '排序',
    name: 'order',
    formItem: {
      type: 'number'
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
            record.isStick ? (
              <Button tooltip="取消置顶" onClick={e => self.setStick({ id: record.id, val: !record.isStick })}>
                <Icon type="down" antd />
              </Button>
            ) : (
                <Button tooltip="置顶" onClick={e => self.setStick({ id: record.id, val: !record.isStick })}>
                  <Icon type="up" antd />
                </Button>
              )
          }
          {
            record.isPush ? (
              <Button tooltip="下架" onClick={e => self.setPush({ id: record.id, val: !record.isPush })}>
                <Icon type="minus-circle" antd />
              </Button>
            ) : (
                <Button tooltip="上架" onClick={e => self.setPush({ id: record.id, val: !record.isPush })}>
                  <Icon type="plus-circle" antd />
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
