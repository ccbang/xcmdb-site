import React, { PureComponent } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/yaml/yaml';
import Resizable from 're-resizable';
import { connect } from 'dva';
import { Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect()
class YamlOnline extends PureComponent {
  state = {
    data: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'online/submit',
      payload: { data },
    });
  };

  render() {
    const { data } = this.state;
    return (
      <PageHeaderWrapper>
        <Resizable>
          <CodeMirror
            style={{ minHeight: '100%' }}
            value={data}
            options={{
              mode: 'yaml',
              theme: 'material',
              tabSize: 2,
              indentAuto: true,
              lineNumbers: true,
            }}
            onBeforeChange={({ value }) => {
              this.setState({ data: value });
            }}
          />
          <Button onClick={this.handleSubmit} style={{ marginTop: 20 }}>
            执行
          </Button>
        </Resizable>
      </PageHeaderWrapper>
    );
  }
}

export default YamlOnline;
