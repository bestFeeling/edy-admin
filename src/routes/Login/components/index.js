import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Layout, Button, Icon, Input, Checkbox, Spin } from 'antd';
import logoImg from 'assets/images/logo1.png';
import './index.less';
const { Content } = Layout;
const FormItem = Form.Item;

import JSEncrypt from 'jsencrypt/bin/jsencrypt'

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login
}))
class Login extends Component {
  handleSubmit = e => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {

        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwJHItn9QttBux+PR2rkzBM3sN
        miG0VR/fRKXiuQqietyLMPCld3KY7+P6WS2ov9s04NDCNzmMG4Vj8YgGRBENQUMn
        a12QKkUb07YwOWCbb/XEtqQx3qHGRWOBtaPPT0lqEuOTAu4ly2vOL7jmjgNqdAGG
        r3Flt5QBIkXe0KqX4wIDAQAB
        -----END PUBLIC KEY-----
        `);
        // values["password"] = encrypt.encrypt(values["password"]);// 加密后的字符串
        console.log( encrypt.encrypt(values["password"]),values["password"])
        dispatch({
          type: 'login/login',
          payload: values
        });
      }
    });
  };

  render() {
    const { loading, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Layout className="full-layout login-page">
        <Content>
          <Spin tip="登录中..." spinning={!!loading}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="user-img">
                <img src={logoImg} alt="logo" />
                <b>LANIF</b>
                <span>Admin</span>
              </div>
              <FormItem>
                {getFieldDecorator('username', {
                  initialValue: 'admin',
                  rules: [{ required: true, message: '请输入您的用户名，示例admin' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" />}
                    placeholder="用户名"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  initialValue: 'admin',
                  rules: [{ required: true, message: '请输入您的密码，示例admin' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="密码"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>记住我</Checkbox>)}
                <Link className="login-form-forgot" to="#">
                  忘记密码
                </Link>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                <div className="new-user">
                  新用户？<Link to="/sign/register">现在注册</Link>
                </div>
              </FormItem>
            </Form>
          </Spin>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Login);
