import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { Component } from 'react';
import { Card, List, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const grid = 8;

class LADnD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item, index } = this.props;
    return (
      <Draggable key={item._id} draggableId={item._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          >
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
          </div>
        )}
      </Draggable>
    );
  }
}

export default LADnD;
