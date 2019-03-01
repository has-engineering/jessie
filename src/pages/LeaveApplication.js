import React, { Component } from 'react';
import { Form, Input, DatePicker, Button, Select, Upload, Card, Row, Col, Icon } from 'antd';
import { getLeave, createLeave } from '../apis/leave';
import moment from 'moment';

import styles from './LeaveApplication.css';

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

const { RangePicker } = DatePicker;
class LeaveApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leave: {},
      leaveTypes: []
    };
  }

  getNumberOfWorkingDays = () => {
    const { form } = this.props;
    const dateRange = form.getFieldValue('dateRange');
    if (!dateRange) {
      return 0;
    }
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    return endDate.diff(startDate, 'days') + 1;
  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    getLeave(id).then(response => {
      const dateRange = [moment(response.data.startDate, 'YYYY-MM-DD'), moment(response.data.endDate, 'YYYY-MM-DD')];
      this.setState({ leave: { ...response.data, dateRange } });
    });

    const leaveTypes = ['Sick', 'Visa', 'Personal', 'Wash Car'];
    this.setState({
      leaveTypes
    });
  }

  handleOnSubmit = e => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const saveObj = {
          leaveType: values.leaveType,
          startDate: values.dateRange[0].format('YYYY-MM-DD'),
          endDate: values.dateRange[1].format('YYYY-MM-DD'),
          remarks: values.remarks
        };
        console.log('saveObj :', saveObj);
        const res = createLeave(saveObj);
        console.log('res :', res);
      }
    });
  };

  render() {
    const { leave, leaveTypes } = this.state;
    const {
      form: { getFieldDecorator }
    } = this.props;
    const numWorkingDays = this.getNumberOfWorkingDays();
    return (
      <Row>
        <Col>
          <Card title="Leave Application Form">
            <Form onSubmit={this.handleOnSubmit}>
              <Row>
                <Col span={12}>
                  <FormItem className="side-by-side">
                    {getFieldDecorator('leaveType', {
                      initialValue: leave.type,
                      rules: [
                        {
                          required: true,
                          message: 'Please select your leave type!'
                        }
                      ]
                    })(
                      <Select disabled={false} showSearch placeholder="Select a type" optionFilterProp="children" onBlur={this.handleOnSubmit}>
                        {leaveTypes.map(leaveType => (
                          <Option value={leaveType} key={leaveType}>
                            {leaveType}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem className="side-by-side">
                    {getFieldDecorator('remarks', { initialValue: leave.remarks })(
                      <Input placeholder="Please tell us the reason why you want to take leave. (Optional)" onBlur={this.handleOnSubmit} />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem className="side-by-side">
                    {getFieldDecorator('dateRange', {
                      initialValue: leave.dateRange,
                      rules: [
                        {
                          type: 'array',
                          required: true,
                          message: 'Please select Start Date and End Date!'
                        }
                      ]
                    })(<RangePicker onBlur={this.handleOnSubmit} />)}
                  </FormItem>
                </Col>
                {/* <FormItem>
                {getFieldDecorator("attachments", {
                  initialValue: leave.dateRange
                })(
                  <Dragger name="attachments" multiple={true} className="imgUpload-container" onBlur={this.handleOnSubmit}>
                    <p className="imgUpload-icon">
                      <Icon type="inbox" />
                    </p>
                    <p>Click or drag file to this area to upload</p>
                  </Dragger>
                )}
              </FormItem> */}
                <Col span={12}>
                  <h3>Leave Days:</h3>
                  <p>{numWorkingDays} Days </p>
                </Col>
              </Row>
              <div className="button">
                <Button type="primary">Save</Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(LeaveApplication);
