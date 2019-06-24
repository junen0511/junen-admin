import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { List, Card, Button, Avatar, Modal } from 'antd';
import MoreDropdown from 'components/MoreDropdown';
import PageHeaderLayout from '@src/layouts/PageHeaderLayout';
import styles from './articleList.less';
import { getArticleList, delArticle } from '../actions';

const confirm = Modal.confirm;

const ListContent = ({ data: { ower, create_time } }) => (
    <div className={styles.listContent}>
        <div className={styles.listContentItem}>
            <span>作者</span>
            <p>{ower}</p>
        </div>
        <div className={styles.listContentItem}>
            <span>创建时间</span>
            <p>{moment(create_time).format('YYYY-MM-DD HH:mm')}</p>
        </div>
    </div>
);

class ArticleList extends PureComponent {
    state = {
        typeId: 0,
        current: 1,
        pageSize: 10
    };
    componentDidMount() {
        this.filterArticleList();
    }

    filterArticleList = () => {
        const { dispatch } = this.props;
        const { typeId, current, pageSize } = this.state;
        dispatch(getArticleList({ typeId, current, pageSize }));
    };

    handleMenuClick = (id, e) => {
        const { key } = e;
        const { dispatch } = this.props;

        switch (key) {
            case '1':
                dispatch(push(`/article/edit?id=${id}`));
                break;
            case '2':
                confirm({
                    title: '确认要删除该条文章吗？',
                    content: '文章删除后不可恢复',
                    onOk() {
                        dispatch(delArticle({ id }));
                    }
                });
                break;
            default:
        }
    };

    render() {
        const { articleList, total } = this.props;
        const { current, pageSize } = this.state;

        const paginationProps = {
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条`,
            current,
            pageSize,
            total,
            onChange: async (current, size) => {
                await this.setState({
                    current
                });
                this.filterArticleList();
            },
            onShowSizeChange: async (page, pageSize) => {
                await this.setState({
                    pageSize
                });
                this.filterArticleList();
            }
        };

        const extraContent = (
            <div className={styles.extraContent}>
                <Button href="/article/add" type="primary" icon="plus">
                    新建文章
                </Button>
            </div>
        );

        return (
            <PageHeaderLayout>
                <div className={styles.standardList}>
                    <Card title="文章列表" extra={extraContent} bordered={false}>
                        <List
                            size="large"
                            rowKey="id"
                            // loading={loading}
                            pagination={paginationProps}
                            dataSource={articleList}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <MoreDropdown
                                            onMenuClick={e => this.handleMenuClick(item.id, e)}
                                            menuOptions={[{ key: '1', label: '编辑' }, { key: '2', label: '删除' }]}
                                        />
                                    ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.logo} shape="square" size="large" />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </PageHeaderLayout>
        );
    }
}

const mapStateToProps = state => ({
    ...state.article
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList);
