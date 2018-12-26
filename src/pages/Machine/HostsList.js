import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form, Button, Badge } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import SearchForm from './SearchForm';
import HostForm from './HostForm';

import styles from './TableList.less';

const { Description } = DescriptionList;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = {
  success: '已上线',
  processing: '运行中',
  default: '未分配',
  error: '异常',
  warning: '警告',
};

/* eslint react/no-multi-comp:0 */
@connect(({ hosts, loading }) => ({
  hosts,
  loading: loading.models.hosts,
}))
@Form.create()
class HostsList extends PureComponent {
  state = {
    visible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: 'hostname',
      dataIndex: 'hostname',
    },
    {
      title: '项目',
      dataIndex: 'project',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: statusMap.success,
          value: 'success',
        },
        {
          text: statusMap.default,
          value: 'default',
        },
        {
          text: statusMap.error,
          value: 'error',
        },
        {
          text: statusMap.warning,
          value: 'warning',
        },
        {
          text: statusMap.processing,
          value: 'processing',
        },
      ],
      render(val) {
        return <Badge status={val} text={statusMap[val]} />;
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'modified',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.showEditModal(record)}>配置</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'hosts/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'hosts/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'hosts/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = values => {
    const { dispatch } = this.props;
    this.setState({
      formValues: values,
    });

    dispatch({
      type: 'hosts/fetch',
      payload: values,
    });
  };

  render() {
    const { hosts, loading } = this.props;
    const { selectedRows, expandForm, current = {}, visible } = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <SearchForm
                styles={styles}
                expandForm={expandForm}
                handleSearch={this.handleSearch}
                handleFormReset={this.handleFormReset}
                toggleForm={this.toggleForm}
              />
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.showModal}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>删除</Button>
                  <Button>下线</Button>
                  <Button>分配项目</Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={hosts}
              rowKey="id"
              columns={this.columns}
              expandedRowRender={record =>
                record.variables && record.variables.length > 0 ? (
                  <DescriptionList size="small">
                    {record.variables.map(item => (
                      <Description term={item.name} key={item.name}>
                        {item.value}
                      </Description>
                    ))}
                  </DescriptionList>
                ) : null
              }
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <HostForm visible={visible} current={current} handleCancel={this.handleCancel} />
      </PageHeaderWrapper>
    );
  }
}

export default HostsList;
