import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
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
    title: '分会名称',
    name: 'name',
    tableItem: {},
    formItem: {},
    searchItem: {
      group: 'abc'
    }
  },
  {
    title: '分会负责人电话',
    name: 'phone',
    tableItem: {},
    formItem: {},
    searchItem: {
      group: 'abc'
    }
  },
  {
    title: '分会负责人名称',
    name: 'linkName',
    tableItem: {},
    formItem: {},
    searchItem: {
      group: 'abc'
    }
  },

  {
    title: '地址',
    name: 'address',
    tableItem: {},
    formItem: {}
  },

  {
    title: '区域',
    name: 'directoryId',
    formItem: {
      type: !self.state.record ? 'cascade' : 'hidden',
      options: self.props.branch.areaSelectOption,
      changeOnSelect: true,
      loadData: self.loadSelectData,
    }
  },

  {
    title: '区域',
    name: 'directoryName',
    tableItem: {},
    formItem: {
      type: !self.state.record ? 'hidden' : '',
      disabled: true
    }
  },

  {
    title: 'icons',
    name: 'icons',
    tableItem: {},
    formItem: {}
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
            record.state ? (
              <Button tooltip="取消激活" onClick={e => self.setDataState({ id: record.id, val: !record.state })}>
                <Icon type="down" antd />
              </Button>
            ) : (
                <Button tooltip="激活" onClick={e => self.setDataState({ id: record.id, val: !record.state })}>
                  <Icon type="up" antd />
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