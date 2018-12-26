import React from 'react';
import { connect } from 'dva';
import { Form, Input, Card, Select, Slider, Modal } from 'antd';

import TableForm from './TableForm';

const FormItem = Form.Item;
const { Option } = Select;

@connect()
@Form.create()
class HostForm extends React.PureComponent {
  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
      current = {},
      handleCancel,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (error) return;
      dispatch({
        type: 'hosts/submit',
        payload: { ...current, ...values },
      });
      handleCancel();
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      allProject = [],
      current = {},
      visible,
      handleCancel,
    } = this.props;
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
    const marks = {
      5: '50GB',
      20: '200GB',
      40: '500GB',
      60: '1TB',
      80: '2TB',
      100: {
        style: {
          color: '#f50',
        },
        label: <strong>4TB</strong>,
      },
    };
    return (
      <Modal
        title={current.id ? '修改机器信息' : '添加机器'}
        width={640}
        destroyOnClose
        visible={visible}
        okText="添加"
        onOk={this.validate}
        onCancel={handleCancel}
      >
        <Card bordered={false}>
          <Form>
            <FormItem label="hostname" {...formItemLayout}>
              {getFieldDecorator('hostname', {
                rules: [{ required: true, message: '请填写机器ip或者域名' }],
                initialValue: current.hostname,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="所属项目" {...formItemLayout}>
              {getFieldDecorator('project', {
                initialValue: current.project,
              })(
                <Select placeholder="请选择项目" style={{ width: '100%' }}>
                  {allProject.map(item => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="uuid" {...formItemLayout}>
              {getFieldDecorator('uuid', {
                rules: [{ required: true, message: '请填写机器uuid' }],
                initialValue: current.uuid,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="硬盘容量" {...formItemLayout}>
              {getFieldDecorator('capacity', {
                initialValue: current.capacity || 37,
              })(<Slider marks={marks} tipFormatter={null} step={null} />)}
            </FormItem>
            <FormItem label="cpu线程数" {...formItemLayout}>
              {getFieldDecorator('cpu', {
                rules: [{ required: true, message: '请选择cpu核心数' }],
                initialValue: current.cpu,
              })(
                <Select placeholder="请选择cpu核心数" style={{ width: '100%' }}>
                  <Option value={2}>2核</Option>
                  <Option value={4}>4核</Option>
                  <Option value={8}>8核</Option>
                  <Option value={16}>16核</Option>
                  <Option value={32}>32核</Option>
                  <Option value={64}>64核</Option>
                  <Option value={128}>128核</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="内存大小" {...formItemLayout}>
              {getFieldDecorator('mem_capacity', {
                rules: [
                  { required: true, message: '请填写机器内存大小(数字)', pattern: /^[0-9]+$/ },
                ],
                initialValue: current.mem_capacity,
              })(<Input placeholder="请输入" addonAfter="MB" />)}
            </FormItem>
            <FormItem label="描述" {...formItemLayout}>
              {getFieldDecorator('description', {
                initialValue: current.description,
              })(<Input.TextArea placeholder="请输入" rows={3} />)}
            </FormItem>
            {getFieldDecorator('variables', {
              initialValue: current.variables || [],
            })(<TableForm />)}
          </Form>
        </Card>
      </Modal>
    );
  }
}

export default HostForm;
