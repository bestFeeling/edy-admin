import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export default (self) => [
  {
    title: 'ID',
    name: 'id',
    tableItem: {},
    formItem: {
      type: 'hidden'
    },
  },

  {
    title: '分类名称',
    name: 'name',
    tableItem: {},
    formItem: {}
  },

  {
    title: '类型名称',
    name: 'type',
    formItem: {
      type: 'select',
      dict: self.props.category.types.map(o => { return { 'code': o.type, 'codeName': o.name } })
    },
  },

  {
    title: '类型名称',
    name: 'typeName',
    tableItem: {}
  },

  {
    title: '排序',
    name: 'order',
    formItem: {},
    
  },

  {
    title: '是否可用',
    name: 'enable',
    tableItem: {
      render: (v) => v && v == 'true' || v === true ? '可用' : '不可用'
    },
  },

  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="修改" onClick={e => self.onUpdate(record)}>
            <Icon type="edit" />
          </Button>
          {
            record.enable ? (
              <Button tooltip="激活" onClick={e => self.setDataState({ id: record.id, val: !record.enable })}>
                <Icon type="minus-circle" antd />
              </Button>
            ) : (
                <Button tooltip="禁用" onClick={e => self.setDataState({ id: record.id, val: !record.enable })}>
                  <Icon type="plus-circle" antd />
                </Button>
              )
          }
          <Button tooltip="删除" onClick={e => self.onDelete(record)}>
            <Icon type="trash" />
          </Button>
        </DataTable.Oper>
      )
    }
  }
]