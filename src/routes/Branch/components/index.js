
import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ branch, loading }) => ({
  branch,
  loading: loading.models.branch
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

  refresh() {
    this.props.dispatch({
      type: 'branch/getList',
      payload: {
        ...this.formRef.props.form.getFieldsValue()
      }
    })
  }

  handleDelete = records => {
    const self = this
    this.props.dispatch({
      type: 'branch/remove',
      payload: {
        ids: records.map(r => r.id).join(','),
        success: this.refresh.bind(self)
      }
    });
  };

  setDataState = val => {
    const self = this
    this.props.dispatch({
      type: 'branch/setState',
      payload: {
        ...val,
        success: this.refresh.bind(self)
      }
    });
  }

  loadSelectData = (selectedOptions) => {
    this.props.dispatch({
      type: 'branch/getAreaSelectData',
      payload: selectedOptions[selectedOptions.length - 1] || {}
    })
  }

  onUpdate = record => {
    this.setState({
      record,
      visible: true
    });
  };

  render() {
    const { branch, loading, dispatch } = this.props;

    const { pageData } = branch;
    const columns = createColumns(this);
    const { rows, record, visible } = this.state;
    const self = this

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'branch/getList',
          payload: {
            ...values,
          }
        });
      }
    };

    const dataTableProps = {
      loading,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'branch/checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'branch/getList',
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
          type: 'branch/save',
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

    return (
      <Layout className="full-layout crud-page">
        <Header>
          <Toolbar
            appendLeft={
              <Button.Group>
                <Button type="primary" icon="plus" onClick={this.onAdd}>
                  新增
                </Button>
                <Button
                  disabled={!rows.length}
                  onClick={e => this.onDelete(rows)}
                  icon="delete"
                >
                  删除
                </Button>
              </Button.Group>
            }
            pullDown={<SearchBar type="grid" {...searchBarProps} />}
          >
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
      </Layout>
    );
  }
}