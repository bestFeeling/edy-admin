import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import LazyLoad from 'components/LazyLoad';
import { Tag, Card, Tooltip } from 'antd';
import config from '@/config';
const { baseUrl } = config;





export default (self) => {

  let extra = [
    {
      title: '收费标准价格',
      name: 'price',
      formItem: {}
    },
    {
      title: '分类的说明',
      name: 'summary',
      formItem: {}
    }
  ]


  let defaultCol = [
    {
      title: 'ID',
      name: 'id',
      tableItem: {},

    },
    {
      title: '类型名称',
      name: 'typeName',
      formItem: {
        type: 'select',
        rules: [{
          required: true,
          message: "必填项"
        }],
        dict: self.props.omen.types.map(o => { return { 'code': o.id, 'codeName': o.name } }),
        onSelect: (e) => {
          self.onSelectHandle(e)
        }
      },
      tableItem: {
        render: (text, record) => {
          return (<span>{text === null ? "暂无" : text}</span>)
        }
      },
    },
    {
      title: '名称',
      name: 'name',
      formItem: {
        rules: [{
          required: true,
          message: "必填项"
        }],
      },
      tableItem: {},
      searchItem: {
        group: 'abc'
      }
    },
    {
      title: '收费标准价格',
      name: 'price',
      tableItem: {
        render: (text, record) => {
          return (<span>{text === null ? "0" : text}</span>)
        }
      },
    },

    {
      title: '分类的说明',
      name: 'summary',
      tableItem: {
        render: (text, record) => {
          // return (<span>{text===null ?"暂无":text}</span>)
          return (<Tooltip title={text === null ? "暂无" : text}>
            <span>{text === null ? "暂无" : `${text.slice(0, 6)}...`}
              {
                text === null ? null : <span style={{ color: "#1890ff" }}>更多</span>
              }
            </span>
          </Tooltip>)
        }
      },
    },
    {
      title: '分类修改时间',
      name: 'updateTime',
      tableItem: {
        render: (text, record) => {
          return (<span>{new Date(text).toLocaleString()}</span>)
        }
      },
    },
    {
      title: '分类状态',
      name: 'enable',
      tableItem: {
        render: (item) => {
          return <span>
            {item ? "关闭" : "激活"}
          </span>
        }
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
            <Button tooltip="修改" onClick={e => self.onUpdate(record)}>
              <Icon type="edit" />
            </Button>

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
  ]

  if (!self.state.typeNameState) {
    defaultCol = defaultCol.concat(extra)
  }

  return defaultCol
};
