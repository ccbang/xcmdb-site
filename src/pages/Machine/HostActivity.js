import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import numeral from 'numeral';
import { Drawer, Row, Col } from 'antd';
import { MiniArea, ChartCard, Field, WaterWave, TimelineChart } from '@/components/Charts';

@connect(({ monitor, loading }) => ({
  monitor,
  fetching: loading.models.monitor,
}))
class HostActivity extends PureComponent {
  componentDidMount = () => {
    const { dispatch, current = {} } = this.props;
    if (current.id) {
      dispatch({
        type: 'monitor/fetch',
        payload: { id: current.id },
      });
    }
  };

  render() {
    const { fetching, handleCancelDrawer, visible } = this.props;
    const visitData = [];
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
      });
    }
    const chartData = [];
    for (let i = 0; i < 20; i += 1) {
      chartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 1000,
        y2: Math.floor(Math.random() * 100) + 10,
      });
    }
    return (
      <Drawer
        width={600}
        placement="right"
        closable={false}
        onClose={handleCancelDrawer}
        visible={visible}
      >
        <Row>
          <Col>
            <ChartCard
              bordered={false}
              loading={fetching}
              title="内存情况"
              total={numeral(8846).format('0,0')}
              footer={<Field label="当天峰值" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" height={45} data={visitData} />
            </ChartCard>
          </Col>
          <Col>
            <ChartCard
              bordered={false}
              loading={fetching}
              title="swap情况"
              total={numeral(8846).format('0,0')}
              footer={<Field label="当天峰值" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" height={45} data={visitData} />
            </ChartCard>
          </Col>
          <Col>
            <TimelineChart height={200} data={chartData} titleMap={{ y1: '5Min', y2: '10Min' }} />
          </Col>
          <Col>
            <TimelineChart
              height={200}
              data={chartData}
              titleMap={{ y1: 'in流量', y2: 'out流量' }}
            />
          </Col>
          <Col>
            <div style={{ marginTop: 20 }}>
              <WaterWave height={161} title="硬盘情况" percent={34} style={{ paddingTop: 20 }} />
            </div>
          </Col>
        </Row>
      </Drawer>
    );
  }
}

export default HostActivity;
