import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Checkbox, Alert, Icon } from 'antd';
import { login } from '../actions';
import Login from 'components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

class LoginPage extends Component {
    state = {
        type: 'account',
        autoLogin: true
    };

    onTabChange = type => {
        this.setState({ type });
    };

    handleSubmit = (err, values) => {
        const { type } = this.state;
        const { dispatch } = this.props;
        if (!err) {
            dispatch(
                login({
                    ...values,
                    type
                })
            );
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
        const { autoLogin } = this.state;
        const { login } = this.props;
        return (
            <div className={styles.main}>
                <Login onSubmit={this.handleSubmit}>
                    {login.status === false &&
                        login.type === 'account' &&
                        !login.loading &&
                        this.renderMessage(login.message)}
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
                    <Submit loading={login.loading}>登录</Submit>
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
        );
    }
}

const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
