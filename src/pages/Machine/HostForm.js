import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const HostForm = Form.create()(props => {
  const { form } = props;
  return (
    <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
      {form.getFieldDecorator('desc', {
        rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
      })(<Input placeholder="请输入" />)}
    </FormItem>
  );
});

export default HostForm;
