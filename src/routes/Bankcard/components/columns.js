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
    title: '用户名称',
    name: 'username',
    tableItem: {}
  },

  {
    title: '真是名称',
    name: 'realName',
    tableItem: {}
  },

  {
    title: '身份证号码',
    name: 'identityCard',
    tableItem: {}
  },

  {
    title: '是否可用',
    name: 'enable',
    tableItem: {
      render: (v) => v && v == 'true' || v === true ? '可用' : '不可用'
    },
  },

  {
    title: '用户名',
    name: 'userName',
    formItem: {
      disabled: true
    }
  },

  {
    title: '用户Id',
    name: 'userId',
    formItem: {
      type: 'hidden'
    }
  },

  {
    title: '银行卡账号',
    name: 'bankAccount',
    formItem: {
    }
  },

  {
    title: '银行',
    name: 'bankId',
    formItem: {
      type: 'select',
      filterOption: (iv, op) => op.props.title.indexOf(iv) > -1,
      showSearch: true,
      dict: self.props.bank.banks.map(item => { return { code: item.id, codeName: item.name } })
    }
  },

  {
    title: '开户行',
    name: 'openingBank',
    formItem: {
    }
  },

]