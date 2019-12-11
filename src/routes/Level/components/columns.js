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
    formItem: {}
  },
  {
    title: '最小积分',
    name: 'minLevelInteger',
    tableItem: {},
    formItem: {}
  },
  {
    title: '最大积分',
    name: 'maxLevelInteger',
    tableItem: {},
    formItem: {}
 
  }
]