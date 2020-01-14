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

@connect(({ omen, loading }) => ({
  omen,
  loading: loading.models.omen
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
      type: 'omen/getList',
      payload: {
        ...this.formRef.props.form.getFieldsValue()
      }
    });
  }

  handleDelete = records => {
    const self = this
    this.props.dispatch({
      type: 'omen/remove',
      payload: {
        ids: records.map(r => r.id).join(','),
        success: this.refresh.bind(self)
      }
    });
  };

  setEnable = val => {
    const self = this
    this.props.dispatch({
      type: 'omen/setEnable',
      payload: {
        ...val,
        success: this.refresh.bind(self)
      }
    });
  }

  onUpdate = record => {
    console.log(record)
    this.setState({
      record: {
        ...record,
      },
      visible: true
    });
  };

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
    const { omen, loading, dispatch } = this.props;
    const { omens, pageData } = omen;
    const columns = createColumns(this);
    const { rows, record, visible } = this.state;
    const self = this

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'omen/getList',
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
      // selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'omen/getList',
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
        values["type"] = values["typeName"]
        values["order"] = 1
        delete values.typeName

        let type = record.id ? 'update' : 'save'

        if(type==="update"){
          values["id"] = record.id
        }
        dispatch({
          type: `omen/${type}`,
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
