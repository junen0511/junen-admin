import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import LoginContainer from '@src/models/login';
import { Link } from 'react-router-dom';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';
import styles from './Login.module.less';

const { UserName, Password, Submit } = Login;

export default class LoginPage extends Component {
    state = {
        loading: false,
        type: 'account',
        autoLogin: true
    };

    onTabChange = type => {
        this.setState({ type });
    };

    handleSubmit = (err, values, LoginModel) => {
        const { type } = this.state;
        if (!err) {
            LoginModel.login({
                ...values,
                type
            });
        }
    };

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked
        });
    };

    renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
    };

    render() {
        const { autoLogin, loading } = this.state;
        return (
            <Subscribe to={[LoginContainer]}>
                {LoginModel => (
                    <div className={styles.main}>
                        <Login onSubmit={(err, values) => this.handleSubmit(err, values, LoginModel)}>
                            <UserName name="email" placeholder="用户名" />
                            <Password name="password" placeholder="密码" />
                            <div>
                                <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                                    自动登录
                                </Checkbox>
                                <a style={{ float: 'right' }} href="/">
                                    忘记密码
                                </a>
                            </div>
                            <Submit loading={loading}>登录</Submit>
                            <div className={styles.other}>
                                其他登录方式
                                <Icon className={styles.icon} type="alipay-circle" />
                                <Icon className={styles.icon} type="weibo-circle" />
                                <Link className={styles.register} to="/user/register">
                                    注册账户
                                </Link>
                            </div>
                        </Login>
                    </div>
                )}
            </Subscribe>
        );
    }
}
