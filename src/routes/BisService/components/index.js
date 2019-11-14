
import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm, DetailDrawer } from 'components/Modal';
import createColumns from './columns';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ bisService, loading }) => ({
  bisService,
  loading
}))
export default class extends BaseComponent {
  state = {
    visible: false,
    record: null,
    rows: [],
    drawerVisible: false
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  refresh() {
    this.props.dispatch({
      type: 'bisService/getList',
      payload: {
        ...this.formRef.props.form.getFieldsValue()
      }
    })
  }

  handleDelete = records => {
    const self = this
    this.props.dispatch({
      type: 'bisService/remove',
      payload: {
        ids: records.map(r => r.id).join(','),
        success: this.refresh.bind(self)
      }
    });
  };

  setEnable = val => {
    const self = this
    this.props.dispatch({
      type: 'bisService/setEnable',
      payload: {
        ...val,
        success: this.refresh.bind(self)
      }
    });
  }

  loadDetail = (record) => {
    this.setState({ drawerVisible: true, record })
    this.props.dispatch({
      type: 'bisService/loadDetail',
      payload: {
        record
      }
    })
  }

  onUpdate = record => {
    this.setState({
      record,
      visible: true
    });
  };

  render() {
    const { bisService, loading, dispatch } = this.props;

    const { pageData, detail, detailFileList } = bisService;
    const columns = createColumns(this);
    const { rows, record, visible, drawerVisible } = this.state;
    const self = this

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'bisService/getList',
          payload: {
            ...values,
          }
        });
      }
    };

    const dataTableProps = {
      loading: loading.effects['bisService/getList'],
      columns,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'bisService/checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'bisService/getList',
          payload: {
            pageNumber: pageNum,
            pageSize
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };

    const modalFormProps = {
      loading,
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
        const { directoryId = [] } = values
        values.directoryId = directoryId[directoryId.length - 1]

        dispatch({
          type: 'bisService/save',
          payload: {
            values,
            success: () => {
              this.setState({
                record: null,
                visible: false
              });
              self.refresh()
            }
          }
        });
      }
    };

    const drawerFormProps = {
      loading: loading.effects['bisService/loadDetail'],
      record: detail,
      visible: drawerVisible,
      columns: columns.map(col => {
        if (col.formItem) {
          col.formItem.disabled = true
          col.formItem.placeholder = '　'
        }

        return col
      }),
      onCancel: () => {
        this.setState({
          drawerVisible: false
        });
      },
      footer_btns: [
        {
          name: detail.enable ? '禁用商品服务' : '启用商品服务',
          type: detail.enable ? 'danger' : 'primary',
          loading: loading.effects['bisService/setEnable'],
          callback: () => {
            dispatch({
              type: 'bisService/setEnable',
              payload: {
                id: detail.id,
                val: !detail.enable,
                success: () => {
                  self.props.dispatch({
                    type: 'bisService/loadDetail',
                    payload: {
                      record: detail
                    }
                  })
                }
              }
            });
          }
        }
      ]
    };

    return (
      <Layout className="full-layout crud-page">
        <Header>
          <Toolbar>
            <SearchBar wrappedComponentRef={(inst) => this.formRef = inst} group="abc" {...searchBarProps} />
          </Toolbar>
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...modalFormProps} />

        <DetailDrawer {...drawerFormProps} />
      </Layout>
    );
  }
}