import React, { Component } from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import { getLeave } from '../apis/leave';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
class LeaveApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leave: {}
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
  }

  handleOnSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // postLeaveForm(values)
      }
    });
  };

  render() {
    const { leave } = this.state;
    const {
      form: { getFieldDecorator }
    } = this.props;
    const numWorkingDays = this.getNumberOfWorkingDays();
    return (
      <div>
        <h1>Leave Application Form</h1>
        <Form onSubmit={this.handleOnSubmit}>
          <FormItem>
            {getFieldDecorator('type', { initialValue: leave.type, rules: [{ required: true, message: 'Please select your leave type!' }] })(
              <Input placeholder="Type of Leave" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remarks', { initialValue: leave.remarks })(
              <Input placeholder="Please tell us the reason why you want to take leave. (Optional)" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('dateRange', {
              initialValue: leave.dateRange,
              rules: [{ type: 'array', required: true, message: 'Please select Start Date and End Date!' }]
            })(<RangePicker />)}
          </FormItem>
          <p>{numWorkingDays} Days </p>
          <FormItem>
            {getFieldDecorator('status', { initialValue: leave.status, rules: [{ required: true, message: 'Please select your leave type!' }] })(
              <Input placeholder="Type of Leave" />
            )}
          </FormItem>
          <Button type="submit">Save</Button>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LeaveApplication);
