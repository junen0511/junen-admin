import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Card, Form, Input, TreeSelect, Button } from 'antd';
import PageHeaderLayout from '@src/layouts/PageHeaderLayout';
import { formatTreeData, getPageQuery } from '@src/utils/utils';
import { getArticleInfo, editArticle } from '../actions';
import { actions as columnActions } from '@src/pages/Column';

const FormItem = Form.Item;
const { TextArea } = Input;

class AddArticle extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        const params = getPageQuery();
        const { getColumnList } = columnActions;
        dispatch(getColumnList());
        dispatch(getArticleInfo(params));
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch, articleInfo } = this.props;
        form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                await dispatch(editArticle({ ...articleInfo, ...values }));
                dispatch(push('/article/list'));
            }
        });
    };
    render() {
        const { form, columnList, articleInfo } = this.props;
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

        return (
            <PageHeaderLayout>
                <Card title="编辑文章" bordered={false}>
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                        <FormItem {...formItemLayout} label="分类">
                            {getFieldDecorator('type_id', {
                                initialValue: articleInfo.type_id || '0'
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
                                initialValue: articleInfo.title,
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
                                initialValue: articleInfo.short_title,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入简标题'
                                    }
                                ]
                            })(<Input placeholder="简标题" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="描述">
                            {getFieldDecorator('description', { initialValue: articleInfo.description })(
                                <TextArea style={{ minHeight: 32 }} placeholder="描述" rows={4} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="排序">
                            {getFieldDecorator('order', {
                                initialValue: articleInfo.order || 1,
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
                                initialValue: articleInfo.tag,
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
                                initialValue: articleInfo.body,
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
