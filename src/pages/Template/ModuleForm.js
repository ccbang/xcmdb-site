import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const ModuleForm = Form.create()(props => {
  const { moduleList = [], handleSelectChange, form } = props;
  const { getFieldDecorator } = form;
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
  return (
    <Form>
      <FormItem {...formItemLayout} label="模块">
        {getFieldDecorator('module', {
          rules: [{ required: true, message: 'Please select module!' }],
        })(
          <Select
            placeholder="Select a option and change input text above"
            onChange={handleSelectChange}
            style={{ width: '80%', marginRight: 8 }}
          >
            {moduleList.map(item => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
      <FormItem label="name" {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入名称' }],
        })(<Input placeholder="name的值" style={{ width: '80%', marginRight: 8 }} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="模板">
        {getFieldDecorator('template', {
          rules: [{ required: true, message: 'Please enter template!' }],
        })(
          <Input.TextArea
            rows={6}
            style={{ width: '80%', marginRight: 8 }}
            placeholder="不需要 - name:***"
          />
        )}
      </FormItem>

      <FormItem {...formItemLayoutWithOutLabel}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
});

export default ModuleForm;
