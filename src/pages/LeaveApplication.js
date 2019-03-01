import React, { Component } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Select,
  Upload,
  Card,
  Row,
  Col,
  Icon
} from "antd";
import { getLeave } from "../apis/leave";
import moment from "moment";

import styles from "./LeaveApplication.css";

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
    const dateRange = form.getFieldValue("dateRange");
    if (!dateRange) {
      return 0;
    }
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    return endDate.diff(startDate, "days") + 1;
  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    getLeave(id).then(response => {
      const dateRange = [
        moment(response.data.startDate, "YYYY-MM-DD"),
        moment(response.data.endDate, "YYYY-MM-DD")
      ];
      this.setState({ leave: { ...response.data, dateRange } });
    });

    const leaveTypes = ["Sick", "Visa", "Personal", "Wash Car"];
    this.setState({
      leaveTypes
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
    const { leave, leaveTypes } = this.state;
    const {
      form: { getFieldDecorator }
    } = this.props;
    const numWorkingDays = this.getNumberOfWorkingDays();
    return (
      <Row>
        <Col xl={4} md={6} sm={4}>
          Side Bar
        </Col>
        <Col xl={20} md={18} sm={20}>
          <Card title="Leave Application Form">
            <Form onSubmit={this.handleOnSubmit}>
              <FormItem className="side-by-side">
                {getFieldDecorator("type", {
                  initialValue: leave.type,
                  rules: [
                    {
                      required: true,
                      message: "Please select your leave type!"
                    }
                  ]
                })(
                  <Select
                    disabled={false}
                    showSearch
                    placeholder="Select a type"
                    optionFilterProp="children"
                    onBlur={this.handleSubmit}
                    // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {leaveTypes.map(leaveType => (
                      <Option value={leaveType} key={leaveType}>
                        {leaveType}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem className="side-by-side">
                {getFieldDecorator("remarks", { initialValue: leave.remarks })(
                  <Input placeholder="Please tell us the reason why you want to take leave. (Optional)" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("dateRange", {
                  initialValue: leave.dateRange,
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select Start Date and End Date!"
                    }
                  ]
                })(<RangePicker />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("dateRange", {
                  initialValue: leave.dateRange,
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select Start Date and End Date!"
                    }
                  ]
                })(
                  <Dragger
                    name="attachments"
                    multiple={true}
                    className="imgUpload-container"
                  >
                    <p className="imgUpload-icon">
                      <Icon type="inbox" />
                    </p>
                    <p>Click or drag file to this area to upload</p>
                  </Dragger>
                )}
              </FormItem>
              <h3>Leave Days:</h3>
              <p>{numWorkingDays} Days </p>

              <Button type="submit">Save</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(LeaveApplication);
