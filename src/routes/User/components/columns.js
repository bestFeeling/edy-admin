import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Link } from 'dva/router';
import { Tag } from 'antd';


const innerColumns = [
  {
    title: 'id',
    name: 'id',
    tableItem: {}
  },
  {
    title: '名称',
    name: 'name',
    tableItem: {}
  },
]
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
    title: '用户名称',
    name: 'username',
    tableItem: {},
    formItem: {}
  },

  {
    title: '密码',
    name: 'password',
    formItem: {
      type: 'password',
      repeat: true,
    }
  },

  {
    title: '分会名称',
    name: 'branchName',
    tableItem: {},
  },

  {
    title: '是否可用',
    name: 'enable',
    tableItem: {
      render: (v) => v && v == 'true' || v === true ? '可用' : '不可用'
    },
  },


  {
    title: '昵称',
    name: 'nickName',
    tableItem: {},
    formItem: {}
  },
  {
    title: '性别',
    name: 'gender',
    tableItem: {},
    formItem: {
      type: 'select',
      dict: [{
        code: '1',
        codeName: '男'
      },
      {
        code: '2',
        codeName: '女'
      }]
    },
  },

  {
    title: '地址',
    name: 'address',
    formItem: {},
  },

  {
    title: '身份证Id',
    name: 'idCardNumber',
    tableItem: {},
    formItem: {},
  },

  {
    title: '真实姓名',
    name: 'realName',
    tableItem: {},
    formItem: {}
  },

  {
    title: '头像',
    name: 'portrait',
    formItem: {
      rules: [{
        required: true,
      }],
      type: 'upload',
      action: '/fs/upload/image',
      max: 1
    }
  },

  {
    title: '身份证正面照',
    name: 'facePhoneCard',
    formItem: {
      rules: [{
        required: true,
      }],
      type: 'upload',
      action: '/fs/upload/image',
      max: 1
    }
  },

  {
    title: '身份证反面照',
    name: 'reversePhoneCard',
    formItem: {
      rules: [{
        required: true,
      }],
      type: 'upload',
      action: '/fs/upload/image',
      max: 1
    }
  },

  {
    title: '分会',
    name: 'branchId',
    formItem: {
      type: 'table',
      rowKey: 'id',
      titleKey: 'name',
      max: 1,
      dataSource: self.props.user.branchData,
      columns: innerColumns,
      loadData: self.loadBranchData,
    }
  },

  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
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