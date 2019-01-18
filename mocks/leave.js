module.exports = {
  path: '/leaves/:leaveId',
  template: {
    id: params => params.leaveId,
    userId: () => 'A01000',
    type: () => 'Annual Leave',
    startDate: () => '2019-01-01',
    endDate: () => '2019-01-03',
    remarks: () => 'Let me have a holiday bitch',
    attachments: () => ['http://pxrnhub.com/hello.jpg', 'http://facebook.com/gay/pictureofmyself.jpeg'],
    status: () => 'Pending'
  }
};
