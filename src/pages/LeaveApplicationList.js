import React, { Component } from 'react';
import LeaveApplication from './LeaveApplication';
import { Card, List, Row, Col, Button } from 'antd';
import { getLeave } from '../apis/leave';
import moment from 'moment';
import { Link } from 'react-router-dom';

import styles from './LeaveApplicationList.css';

const listMockDatas = [
  {
    _id: '12312321312dsadasfhgf3',
    code: 'AL-01-ST',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Annual Leave'
  },
  {
    _id: '12312321312dsadasfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'unpaid Leave'
  },
  {
    _id: '12312321312dsadasfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Emergency Leave'
  },
  {
    _id: '12312321312dsadasfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Medical Leave'
  },
  {
    _id: '12312321312dsadasfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Maternity Leave'
  },
  {
    _id: '12312321312dsadasfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Compassionate Leave'
  },
  {
    _id: '12312321312dsadasfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Replacement Leave'
  },
  {
    _id: '12312321312dsadasfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Other Leave'
  }
];

class LeaveApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card className="cards">
        <div className="create-button">
          <Button href="/leaveForm/create" type="primary">
            Create
          </Button>
        </div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={listMockDatas}
          renderItem={item => (
            <List.Item>
              <Card title={item.code} extra={<Link to={'/leaveForm/' + item._id + '/edit'}>Edit</Link>}>
                <Row>
                  <Col>
                    {item.startDate}- {item.endDate}
                  </Col>
                  <Col type="flex">
                    <h3>Number of Days taken</h3>
                    {item.noOfDays}
                  </Col>
                  <Col>{item.leaveType}</Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default LeaveApplicationList;
