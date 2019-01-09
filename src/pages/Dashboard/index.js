import React from 'react';
import { connect } from 'react-redux';
const Dashboard = ({ currentUser }) => <h3>您好，{currentUser.name}。欢迎登录</h3>;

const mapStateToProps = state => ({
    ...state.global
});

export default connect(
    mapStateToProps,
    null
)(Dashboard);
