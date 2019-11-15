
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

@connect(({ category, loading }) => ({
  category,
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

  refresh() {
    this.props.dispatch({
      type: 'category/getList',
      payload: {
        ...this.formRef.props.form.getFieldsValue()
      }
    })
  }

  handleDelete = records => {
    const self = this
    this.props.dispatch({
      type: 'category/remove',
      payload: {
        ids: records.map(r => r.id).join(','),
        success: this.refresh.bind(self)
      }
    });
  };

  setDataState = val => {
    const self = this
    this.props.dispatch({
      type: 'category/setEnable',
      payload: {
        ...val,
        success: this.refresh.bind(self)
      }
    });
  }

  loadBranchData = (selectedOptions) => {
    this.props.dispatch({
      type: 'category/getBranchData',
      payload: selectedOptions[selectedOptions.length - 1] || {}
    })
  }

  onUpdate = record => {
    let obj = this.props.category.types.find(o => o.name == record.typeName)
    if (obj) record.type = obj.type
    this.setState({
      record,
      visible: true
    });
  };

  render() {
    const { category, loading, dispatch } = this.props;

    const { pageData, branchData } = category;
    const columns = createColumns(this);
    const { rows, record, visible } = this.state;
    const self = this

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'category/getList',
          payload: {
            ...values,
          }
        });
      }
    };

    const dataTableProps = {
      loading: loading.effects['category/getList'],
      columns,
      rowKey: 'id',
      dataItems: pageData,
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'category/getList',
          payload: {
            pageNumber: pageNum,
            pageSize
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };

    const modalFormProps = {
      loading: loading.effects['category/getList'],
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
        let type = values.id ? 'update' : 'save'
        dispatch({
          type: `category/${type}`,
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