import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Form, Input, TreeSelect } from 'antd';
import { formatTreeData } from '@src/utils/utils';

const FormItem = Form.Item;
const { TextArea } = Input;
class ColumnForm extends PureComponent {
    static propTypes = {
        form: PropTypes.object.isRequired,
        onOk: PropTypes.func,
        modalProps: PropTypes.object
    };

    handleAddOk = () => {
        const { form, onOk, currentItem } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                onOk({
                    id: currentItem.id,
                    ...values
                });
            }
        });
    };

    render() {
        const { form, columnList, submitting, currentItem, ...modalProps } = this.props;
        const { getFieldDecorator } = form;
        const treeDateSource = formatTreeData(columnList);

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 }
            }
        };

        const modalOpts = {
            ...modalProps,
            onOk: this.handleAddOk
        };

        const { pid, name, en_name, detail_info } = currentItem;

        return (
            <Modal {...modalOpts}>
                <Form style={{ marginTop: 8 }}>
                    <FormItem {...formItemLayout} label="上级栏目">
                        {getFieldDecorator('pid', {
                            initialValue: `${pid}`
                        })(
                            <TreeSelect
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={treeDateSource}
                                placeholder="请选择分类"
                                treeDefaultExpandAll
                                onChange={this.onChangeColumn}
                            />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="栏目名称">
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入栏目名称'
                                }
                            ]
                        })(<Input placeholder="栏目名称" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="栏目英文名称">
                        {getFieldDecorator('en_name', {
                            initialValue: en_name
                        })(<Input placeholder="栏目英文名称" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="栏目描述">
                        {getFieldDecorator('detail_info', {
                            initialValue: detail_info
                        })(<TextArea style={{ minHeight: 32 }} placeholder="栏目描述" rows={4} />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({ ...state.column });

export default connect(
    mapStateToProps,
    null
)(Form.create()(ColumnForm));
