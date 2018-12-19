import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Icon, Button, Modal, Divider, Table, Popconfirm } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';

import styles from './GroupList.less';

const { Description } = DescriptionList;
const FormItem = Form.Item;

let id = 0;

@connect(({ group, loading }) => ({
  group,
  fetching: loading.models.group,
}))
@Form.create()
class GroupList extends PureComponent {
  state = {
    visible: false,
  };

  columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: '描述', dataIndex: 'description' },
    { title: '机器数量', dataIndex: 'machine' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: record => (
        <span>
          <a onClick={() => this.showEditModal(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="是否删除这个组？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => this.handleDelete(record)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'group/fetch',
    });
  };

  handleDelete = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'group/submit',
      payload: { id: item.id },
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  handleSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'group/fetch',
      payload: { search: value },
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

  removeFormItem = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  addFormItem = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat((id += 1));
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    const { form, dispatch } = this.props;
    const { current } = this.state;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      dispatch({
        type: 'group/submit',
        payload: { id: current.id, ...values },
      });
    });
  };

  render() {
    const {
      group: { list },
      fetching,
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { visible, current = {} } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    getFieldDecorator('keys', {
      initialValue: current.variables ? current.variables.map((i, index) => index) : [],
    });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '组参数' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`variables[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: '请填写正确的参数.',
            },
          ],
          initialValue: current.variables
            ? `${current.variables[k].name}=${current.variables[k].value}`
            : '',
        })(<Input placeholder="name=value" style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className={styles.formDeleteButton}
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.removeFormItem(k)}
          />
        ) : null}
      </FormItem>
    ));
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div style={{ paddingBottom: 20 }}>
            <Button icon="plus" type="primary" onClick={() => this.showModal()}>
              新建
            </Button>
            <Input.Search
              style={{ width: 300, marginRight: 10, marginLeft: 10 }}
              onSearch={val => this.handleSearch(val)}
            />
          </div>
          <Table
            dataSource={list}
            rowKey="id"
            loading={fetching}
            columns={this.columns}
            expandedRowRender={record => (
              <DescriptionList size="small">
                {record.variables.map(item => (
                  <Description term={item.name} key={item.name}>
                    {item.value}
                  </Description>
                ))}
              </DescriptionList>
            )}
          />
          <Modal
            title={current.id ? '修改组' : '添加组'}
            width={640}
            destroyOnClose
            visible={visible}
            okText="添加"
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
          >
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="组名称" {...formItemLayout}>
                {getFieldDecorator('name', {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写组名称.',
                    },
                  ],
                  initialValue: current.name,
                })(<Input placeholder="请输入" />)}
              </FormItem>
              <FormItem label="组描述" {...formItemLayout}>
                {getFieldDecorator('description', {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请填写组描述.',
                    },
                  ],
                  initialValue: current.description,
                })(<Input.TextArea placeholder="请输入" rows={4} />)}
              </FormItem>

              {formItems}
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.addFormItem} style={{ width: '60%' }}>
                  <Icon type="plus" /> 添加组参数
                </Button>
              </FormItem>
            </Form>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default GroupList;
