import { formUtcString } from "@/utils/timeForMate";

const TableConfig = {
  title: "用户列表",
  columns: [
  {
    title: '用户名',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'center'
  },
  {
    title: '真实姓名',
    width: 100,
    dataIndex: 'realname',
    key: 'realname',
    fixed: 'left',
    align: 'center'
  },
  {
    title: '手机号码',
    dataIndex: 'cellphone',
    key: 'cellphone',
    width: 150,
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'enable',
    key: 'enable',
    width: 150,
    align: 'center',
    dataIndex: 'enable'
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    key: 'createAt',
    width: 150,
    customRender: (createAt) => {return formUtcString(createAt.value,null)},
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'updateAt',
    key: 'updateAt',
    width: 150,
    customRender: (updateAt) => {return formUtcString(updateAt.value,null)},
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 150,
    align: 'center'
  }
],
scrollXY: {x:1500,y:1000},
rowKeyId: 'id',
rowSelectionBl: true
};

export default TableConfig