import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Card, Form, Input, TreeSelect, Button } from 'antd';
import PageHeaderLayout from '@src/layouts/PageHeaderLayout';
import { formatTreeData, getPageQuery } from '@src/utils/utils';
import { addArticle } from '../actions';
import { actions as columnActions } from '@src/pages/Column';

const FormItem = Form.Item;
const { TextArea } = Input;

class AddArticle extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        const { getColumnList } = columnActions;
        dispatch(getColumnList());
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch } = this.props;
        form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                await dispatch(addArticle(values));
                dispatch(push('/article/list'));
            }
        });
    };
    render() {
        const { columnList } = this.props;
        const { form } = this.props;
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

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 }
            }
        };

        const { id } = getPageQuery();

        return (
            <PageHeaderLayout>
                <Card title={id ? '编辑文章' : '添加文章'} bordered={false}>
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                        <FormItem {...formItemLayout} label="分类">
                            {getFieldDecorator('type_id', {
                                initialValue: '0'
                            })(
                                <TreeSelect
                                    allowClear={true}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={treeDateSource}
                                    placeholder="请选择分类"
                                    treeDefaultExpandAll
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="标题">
                            {getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入标题'
                                    }
                                ]
                            })(<Input placeholder="标题" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="简标题">
                            {getFieldDecorator('short_title', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入简标题'
                                    }
                                ]
                            })(<Input placeholder="简标题" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="描述">
                            {getFieldDecorator('description', {})(
                                <TextArea style={{ minHeight: 32 }} placeholder="描述" rows={4} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="排序">
                            {getFieldDecorator('order', {
                                initialValue: 1,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入排序号'
                                    }
                                ]
                            })(<Input placeholder="排序" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="标签">
                            {getFieldDecorator('tag', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入标签'
                                    }
                                ]
                            })(<Input placeholder="标签" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="内容">
                            {getFieldDecorator('body', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入内容'
                                    }
                                ]
                            })(<TextArea style={{ minHeight: 32 }} placeholder="内容" rows={4} />)}
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderLayout>
        );
    }
}

const mapStateToProps = state => ({ ...state.article, ...state.column });

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(AddArticle));
