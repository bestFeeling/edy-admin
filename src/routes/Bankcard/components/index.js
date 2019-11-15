
import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import Icon from 'components/Icon';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ bank, loading }) => ({
  bank,
  loading
}))
export default class extends BaseComponent {
  state = {
    visible: false,
    record: null,
    rows: []
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  refresh(userId) {

    this.props.dispatch({
      type: 'bank/getDetail',
      payload: {
        id: userId
      }
    })
  }

  handleDelete = records => {
    const fresh = this.refresh.bind(this)
    const userId = records[0].userId
    this.props.dispatch({
      type: 'bank/remove',
      payload: {
        ids: records.map(r => r.id).join(','),
        success: () => {
          fresh(userId)
        }
      }
    });
  };

  setDataState = val => {
    const self = this
    this.props.dispatch({
      type: 'bank/setEnable',
      payload: {
        ...val,
        success: this.refresh.bind(self)
      }
    });
  }

  loadBranchData = (selectedOptions) => {
    this.props.dispatch({
      type: 'bank/getBranchData',
      payload: selectedOptions[selectedOptions.length - 1] || {}
    })
  }

  onUpdate = record => {
    const { dispatch } = this.props;
    record.type = 'update'
    if (record.bankName) {
      let bankInfo = this.props.bank.banks.find(it => it.name === record.bankName)
      if (bankInfo) {
        record.bankId = bankInfo.id
      }
    }
    this.setState({
      record,
      visible: true
    });
  };

  onExpand = (expanded, record) => {
    const { dispatch } = this.props;
    if (!expanded) return
    dispatch({
      type: 'bank/getDetail',
      payload: {
        ...record
      }
    });
  }
  onAdd = (record, isUpdate) => {
    const { dispatch } = this.props;
    let obj = {}
    if (!isUpdate) {
      obj.userName = record.realName
      obj.userId = record.id
    }

    this.setState({
      visible: true,
      record: obj
    })
  }

  render() {
    const { bank, loading, dispatch } = this.props;

    const { pageData, banks } = bank;
    const columns = createColumns(this);
    const { rows, record, visible } = this.state;
    const self = this

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'bank/getList',
          payload: {
            ...values,
          }
        });
      }
    };

    const expandedRowRender = (record, index, indent, expanded) => {
      const innerColumn = [
        {
          title: 'ID',
          name: 'id',
          tableItem: {},
        },

        {
          title: '银行账户',
          name: 'bankAccount',
          tableItem: {}
        },

        {
          title: '银行名称',
          name: 'bankName',
          tableItem: {}
        },

        {
          title: '开户行',
          name: 'openingBank',
          tableItem: {}
        },

        {
          title: '操作',
          tableItem: {
            width: 180,
            render: (text, rec) => {
              rec.userId = record.id
              rec.userName = record.realName
              return (
                <DataTable.Oper>
                  <Button tooltip="修改" onClick={e => self.onUpdate(rec)}>
                    <Icon type="edit" />
                  </Button>
                  <Button tooltip="删除" onClick={e => self.onDelete(rec)}>
                    <Icon type="trash" />
                  </Button>
                </DataTable.Oper>
              )
            }
          }
        }
      ];
      const innerDataTableProps = {
        loading: loading.effects['bank/getDetail'],
        columns: innerColumn,
        rowKey: 'id',
        dataItems: record.details || {},
        showNum: true,
        pagination: false,
        isScroll: true
      };
      return (
        <>
          <Header>
            <Toolbar
              appendLeft={
                <>
                  <Button.Group>
                    <Button type="primary" icon="plus" onClick={() => this.onAdd(record)}>
                      新增银行卡
                    </Button>
                  </Button.Group>
                </>
              }
            >
            </Toolbar>
          </Header>
          <Content>
            <DataTable {...innerDataTableProps} />
          </Content>
        </>
      )
    }

    const dataTableProps = {
      loading: loading.effects['bank/getList'],
      columns,
      rowKey: 'id',
      dataItems: pageData,
      showNum: true,
      isScroll: true,
      expandedRowRender: expandedRowRender,
      onExpand: this.onExpand,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'bank/getList',
          payload: {
            pageNumber: pageNum,
            pageSize
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };

    const modalFormProps = {
      loading: loading.effects['bank/getList'],
      record,
      visible,
      columns,
      modalOpts: {
        width: 700
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        });
      },
      onSubmit: values => {
        const self = this
        delete values['userName']
        let type = values.id ? 'update' : 'save'

        dispatch({
          type: `bank/${type}`,
          payload: {
            values,
            success: () => {
              this.setState({
                record: null,
                visible: false
              });
              self.refresh(values.userId)
            }
          }
        });
      }
    };

    return (
      <Layout className="full-layout crud-page">
        <Header>
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...modalFormProps} />
      </Layout>
    );
  }
}