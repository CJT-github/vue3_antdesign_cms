import { formUtcString } from "@/utils/timeForMate";

const TableConfig = {
  title: "部门列表",
  columns: [
    {
      title: '部门id',
      width: 100,
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      align: 'center'
    },
    {
      title: '部门名称',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      align: 'center'
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
}


export default TableConfig