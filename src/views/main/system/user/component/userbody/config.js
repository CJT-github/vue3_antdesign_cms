const columns = [
  {
    title: '商品全称',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '商品描述',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: '原价',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: '现价',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: '描述',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: '预览图',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    slots: {
      customRender: 'action',
    },
  },
];

export default columns