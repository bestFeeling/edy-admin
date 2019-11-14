import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Spin, Button } from 'antd';
import Form from '../Form';
import cx from 'classnames';
import './style/index.less';

class DetailDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible
      })
    }
  }

  onClose = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
      return;
    }
    this.setState({
      visible: false
    });
  };

  render() {
    const {
      title = '明细',
      record,
      columns,
      onSubmit,
      formOpts,
      loading,
      btnLoading,
      preview,
      footer_btns = []
    } = this.props;

    const formProps = {
      ref: 'form',
      columns,
      onSubmit,
      record,
      preview,
      footer: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 }
      },
      ...formOpts
    };
    return (
      <Drawer
        title={title}
        onClose={this.onClose}
        visible={this.state.visible}
        placement="right"
        width={700}
      >
        <Spin spinning={loading}>
          <Form {...formProps} />
          <div
            style={{
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'left',
            }}
          >
            {footer_btns.map((btn, index) =>
              <Button onClick={btn.callback} type={btn.type} key={index} loading={btn.loading} style={{ marginRight: 8 }}>
                {btn.name}
              </Button>
            )}
          </div>

        </Spin>
      </Drawer>
    )
  }
}

export default DetailDrawer