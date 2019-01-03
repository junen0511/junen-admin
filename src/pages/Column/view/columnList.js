import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Table, Divider, Button, Popconfirm } from 'antd';
import { getColumnList, addColumn, editInitialColumn, editColumn, delColumn } from '../actions';
import AddModalForm from './AddModalForm';
import EditModalForm from './EditModalForm';
import styles from './columnList.module.less';

class ColumnList extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getColumnList());
    }

    state = {
        editModalVisible: false,
        addModalVisible: false
    };

    handleAddColumn = e => {
        e.preventDefault();
        this.setState({ addModalVisible: true });
    };

    handleEditColumn = (editItem, e) => {
        const { dispatch } = this.props;
        e.preventDefault();
        dispatch(editInitialColumn(editItem));
        this.setState({ editModalVisible: true });
    };

    handleDelColumn = (id, e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(delColumn({ id }));
    };

    render() {
        const { columnList, dispatch } = this.props;

        const renderColumnList = columnList.map(item => ({ ...item, key: item.id }));

        const tableColumns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '上级栏目',
                dataIndex: 'pid',
                key: 'pid'
            },
            {
                title: '栏目名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '栏目英文名称',
                dataIndex: 'en_name',
                key: 'en_name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: (text, record) => moment(text).format('YYYY-MM-DD HH:mm')
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <a href="#/" onClick={e => this.handleEditColumn(record, e)}>
                            编辑
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm title="确认删除该栏目？" onConfirm={e => this.handleDelColumn(record.id, e)}>
                            <a href="#/">删除</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];

        const extraContent = (
            <div>
                <Button type="primary" onClick={this.handleAddColumn} icon="plus">
                    添加栏目
                </Button>
            </div>
        );

        const { addModalVisible, editModalVisible } = this.state;

        const addModalProps = {
            title: '新增栏目',
            visible: addModalVisible,
            maskClosable: false,
            onOk: async data => {
                await dispatch(addColumn(data));
                dispatch(getColumnList());
                this.setState({ addModalVisible: false });
            },
            onCancel: () => {
                this.setState({ addModalVisible: false });
            }
        };

        const editModalProps = {
            visible: editModalVisible,
            maskClosable: false,
            title: '编辑栏目',
            onOk: async data => {
                await dispatch(editColumn(data));
                dispatch(getColumnList());
                this.setState({ editModalVisible: false });
            },
            onCancel: () => {
                this.setState({ editModalVisible: false });
            }
        };

        return (
            <div className={styles.tableContent}>
                <Card title="栏目列表" extra={extraContent} bordered={false}>
                    <Table columns={tableColumns} dataSource={renderColumnList} />
                </Card>
                {addModalVisible && <AddModalForm {...addModalProps} />}
                {editModalVisible && <EditModalForm {...editModalProps} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state.column });

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ColumnList);
