import React, { Component } from 'react';
import { Card, List, Row, Col, Button } from 'antd';

import LADnD from './LADnD.js';

import styles from './LeaveApplicationList.css';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const listMockDatas = [
  {
    _id: '12312321332sadasfhgf3',
    code: 'I',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Annual Leave'
  },
  {
    _id: '1231431312dsadasfhgf3',
    code: 'Am',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'unpaid Leave'
  },
  {
    _id: '1231256512dsadasfhgf3',
    code: 'Sick',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Emergency Leave'
  },
  {
    _id: '12312328798712dsadasfhgf3',
    code: 'Leave',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Medical Leave'
  },
  {
    _id: '123123213434534sfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Maternity Leave'
  },
  {
    _id: '12312321543465sadasfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Compassionate Leave'
  },
  {
    _id: '12312321317687dasfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Replacement Leave'
  },
  {
    _id: '123123213124645asfhgf3',
    code: 'LL-02-A8',
    startDate: '2019-03-01',
    endDate: '2019-03-29',
    noOfDays: '29',
    leaveType: 'Other Leave'
  }
];

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;
class LeaveApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: listMockDatas
    };
  }
  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(this.state.items, result.source.index, result.destination.index);

    this.setState({
      items
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              <Card className="cards">
                <div className="create-button">
                  <Button href="/leaveForm/create" type="primary">
                    Create
                  </Button>
                </div>
                <List
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={listMockDatas}
                  renderItem={
                    (item, index) => {
                      return <LADnD item={item} index={index} />;
                    }
                    // <List.Item>
                    //   <Card title={item.code} extra={<Link to={"/leaveForm/" + item._id + "/edit"}>Edit</Link>}>
                    //     <Row>
                    //       <Col>
                    //         {item.startDate}- {item.endDate}
                    //       </Col>
                    //       <Col type="flex">
                    //         <h3>Number of Days taken</h3>
                    //         {item.noOfDays}
                    //       </Col>
                    //       <Col>{item.leaveType}</Col>
                    //     </Row>
                    //   </Card>
                    // </List.Item>
                  }
                />
              </Card>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default LeaveApplicationList;
