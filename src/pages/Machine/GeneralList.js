import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Select, Button, Modal, Popconfirm, Badge, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['processing', 'error'];
const status = ['使用中', '禁用'];

/* eslint react/no-multi-comp:0 */
@connect(({ general, loading }) => ({
  general,
  loading: loading.models.general,
}))
@Form.create()
class GeneralList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: '',
    visible: false,
    done: false,
  };

  columns = [
    {
      title: '变量名称',
      dataIndex: 'name',
    },
    {
      title: '变量值',
      dataIndex: 'value',
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
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.showEditModal(record)}>配置</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除这个变量么？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => this.handleDelete(record)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'general/fetch',
    });
  }

  handleDelete = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'general/submit',
      payload: { id: item.id },
    });
  };

  handleListAction = key => {
    const { selectedRows } = this.state;
    const { dispatch } = this.props;
    const dType = key === 'delete' ? 'general/removeBluk' : 'general/disable';
    if (selectedRows.length > 0) {
      dispatch({
        type: dType,
        payload: { key: selectedRows.map(item => item.id) },
      });
    }
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

  handleDone = () => {
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

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
      search: formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'general/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'general/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  handleSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'general/fetch',
      payload: { search: value },
    });
    this.setState({
      formValues: value,
    });
  };

  render() {
    const { general, loading, form } = this.props;
    const { selectedRows, visible, done, current = {} } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };
    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="变量名">
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入变量名！', pattern: /^[a-zA-Z_]+$/ }],
              initialValue: current.name,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="变量值">
            {form.getFieldDecorator('value', {
              rules: [{ required: true, message: '请输入变量值！' }],
              initialValue: current.value,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
            {form.getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
              initialValue: current.description,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
            {form.getFieldDecorator('status', {
              rules: [{ required: true, message: '请选择状态！' }],
              initialValue: current.status || '0',
            })(
              <Select style={{ width: '100%' }}>
                <Option value="0">使用中</Option>
                <Option value="1">禁用</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.showModal()}>
                新建
              </Button>
              <Input.Search
                style={{ width: 300, marginRight: 10 }}
                onSearch={val => this.handleSearch(val)}
              />
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={() => this.handleListAction('delete')}>删除</Button>
                  <Button onClick={() => this.handleListAction('disable')}>禁用</Button>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              rowKey="id"
              loading={loading}
              data={general}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title={done ? null : `全局变量${current.id ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default GeneralList;
