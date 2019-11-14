import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Mask from 'components/Mask';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import { normal, antdNotice } from 'components/Notification';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;



@connect(({ admin, loading }) => ({
  admin,
  loading: loading.models.admin
}))

export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: [],
    maskVisible: false,
    dataSrc: null
  };

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  refresh() {
    this.props.dispatch({
      type: 'admin/getList',
      payload: {
        ...this.formRef.props.form.getFieldsValue()
      }
    });
  }

  setEnable = val => {
    const self = this
    this.props.dispatch({
      type: 'admin/setEnable',
      payload: {
        ...val,
        success: this.refresh.bind(self)
      }
    });
  }

  render() {
    const { admin, loading, dispatch } = this.props;
    const columns = createColumns(this);
    const { admins, pageData } = admin;

    const { rows, record, visible } = this.state;
    const self = this

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'admin/getList',
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
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'admin/getList',
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
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: values => {
        const self = this
        console.log(values)
        

        dispatch({
          type: 'admin/save',
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
                {/* <Button
                  disabled={!rows.length}
                  onClick={e => this.onDelete(rows)}
                  icon="delete"
                >
                  删除
                </Button> */}
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

        <ModalForm {...modalFormProps} />

        <Footer>
          xxx
        </Footer>

      </Layout>
    );
  }


}