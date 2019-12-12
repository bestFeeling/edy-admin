import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import LazyLoad from 'components/LazyLoad';
import { Tag, Card } from 'antd';
import config from '@/config';

export default (self) => [
  {
    title: '星级名称',
    name: 'levelName',
    tableItem: {},
    formItem: {
      disabled: true
    }
  },
  {
    title: '最小积分',
    name: 'minLevelInteger',
    tableItem: {},
    formItem: {
      type: "number",
    }
  },
  {
    title: '最大积分',
    name: 'maxLevelInteger',
    tableItem: {},
    formItem: {
      type: "number",
    }
 
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
        </DataTable.Oper>
      )
    }
  }
]