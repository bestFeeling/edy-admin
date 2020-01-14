import React, { Component } from 'react';
import { b64tohex, hex2b64, RSAKey } from '../../../utils/rsa'
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Layout, Button, Icon, Input, Checkbox, Spin } from 'antd';
import logoImg from 'assets/images/logo1.png';
import './index.less';
const { Content } = Layout;
const FormItem = Form.Item;


// console.log(rsaKey.setPublic());



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

        const { loginVal } = this.props.login;
        let rsaKey= new RSAKey();
        rsaKey.setPublic(b64tohex(loginVal["modulus"]), b64tohex(loginVal["exponent"]));
        let enPassword = hex2b64(rsaKey.encrypt(values["password"]));
        values["password"] = enPassword;
        values["random"] = loginVal["random"]
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
                <b>易渡缘</b>
                <span>后台管理系统</span>
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
