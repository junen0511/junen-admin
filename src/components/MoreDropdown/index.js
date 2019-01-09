import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Icon } from 'antd';

const MoreDropdown = ({ onMenuClick, menuOptions = [] }) => {
    const menu = menuOptions.map(({ key, label }) => (
        <Menu.Item key={key}>
            <span className="link-btn">{label}</span>
        </Menu.Item>
    ));

    return (
        <Dropdown overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}>
            <span className="link-btn">
                更多 <Icon type="down" />
            </span>
        </Dropdown>
    );
};

MoreDropdown.propTypes = {
    onMenuClick: PropTypes.func,
    menuOptions: PropTypes.array.isRequired
};

export default MoreDropdown;
