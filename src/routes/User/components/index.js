
import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import { b64tohex, hex2b64, RSAKey } from '../../../utils/rsa'
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import './index.less';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ user, loading }) => ({
  user,
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
      type: 'user/getList',
      payload: {
        ...this.formRef.props.form.getFieldsValue()
      }
    })
  }

  handleDelete = records => {
    const self = this
    this.props.dispatch({
      type: 'user/remove',
      payload: {
        ids: records.map(r => r.id).join(','),
        success: this.refresh.bind(self)
      }
    });
  };

  onLink = records => {
    const self = this
    console.log(records)
    this.props.dispatch({
      type: 'user/link',
      payload: {
        id: records.id,
        success: this.refresh.bind(self)
      }
    });
  }

  setDataState = val => {
    const self = this
    this.props.dispatch({
      type: 'user/setEnable',
      payload: {
        ...val,
        success: this.refresh.bind(self)
      }
    });
  }

  loadBranchData = (selectedOptions) => {
    this.props.dispatch({
      type: 'user/getBranchData',
      payload: selectedOptions[selectedOptions.length - 1] || {}
    })
  }

  render() {
    const { user, loading, dispatch } = this.props;

    const { pageData, branchData } = user;
    const columns = createColumns(this);
    const { rows, record, visible } = this.state;
    const self = this

    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'user/getList',
          payload: {
            ...values,
          }
        });
      }
    };

    const dataTableProps = {
      loading: loading.effects['user/getList'],
      columns,
      rowKey: 'id',
      dataItems: pageData,
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'user/getList',
          payload: {
            pageNumber: pageNum,
            pageSize
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };

    const modalFormProps = {
      loading: loading.effects['user/getList'],
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
        const { branchId, facePhoneCard, reversePhoneCard, portrait } = values
        values.branchId = branchId.length > 0 ? branchId[0] : ''
        values.facePhoneCard = facePhoneCard[0].response.data || ''
        values.reversePhoneCard = reversePhoneCard[0].response.data || ''
        values.portrait = portrait[0].response.data || ''

        delete values['password_repeat']
        // 
        const { loginVal } = this.props.user;
        let rsaKey= new RSAKey();
        rsaKey.setPublic(b64tohex(loginVal["modulus"]), b64tohex(loginVal["exponent"]));
        let enPassword = hex2b64(rsaKey.encrypt(values["password"]));
        values["password"] = enPassword;
        values["random"] = loginVal["random"]
        // 
        dispatch({
          type: 'user/rsa'
        })

        dispatch({
          type: 'user/save',
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