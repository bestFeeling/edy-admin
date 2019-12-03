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

@connect(({ notice, loading }) => ({
  notice,
  loading: loading.models.notice
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
      type: 'notice/getList',
      payload: {
        ...this.formRef.props.form.getFieldsValue()
      }
    });
  }

  handleDelete = records => {
    const self = this
    this.props.dispatch({
      type: 'notice/remove',
      payload: {
        ids: records.map(r => r.id).join(','),
        success: this.refresh.bind(self)
      }
    });
  };

  setStick = val => {
    const self = this
    this.props.dispatch({
      type: 'notice/setStick',
      payload: {
        ...val,
        success: this.refresh.bind(self)
      }
    });
  }

  setPush = val => {
    const self = this
    this.props.dispatch({
      type: 'notice/setPush',
      payload: {
        ...val,
        success: this.refresh.bind(self)
      }
    });
  }

  onPreview = item => {
    this.setState({
      dataSrc: item,
      maskVisible: true
    });
  };
  onClose = () => {
    this.setState({
      maskVisible: false
    });
  };


  render() {
    const { notice, loading, dispatch } = this.props;
    const { notices, pageData } = notice;
    const columns = createColumns(this);
    const { rows, record, visible } = this.state;
    const self = this

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'notice/getList',
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
          type: 'notice/getList',
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
        if (values.cover && values.cover.length > 0) {
          values.cover = values.cover[0].response.data || ''
        }
        if (!values.cover) {
          normal.error('没有获取到封面图片数据！')
          return
        }

        dispatch({
          type: 'notice/save',
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

        <Mask visible={this.state.maskVisible} onClose={this.onClose} closable>
          <img
            src={this.state.dataSrc}
            alt=""
            style={{
              position: 'absolute',
              margin: 'auto',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              maxHeight: '80%',
            }}
          />
        </Mask>
      </Layout>
    );
  }
}
