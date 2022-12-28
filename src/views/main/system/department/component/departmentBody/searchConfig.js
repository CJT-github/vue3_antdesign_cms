const searchConfig = {
  columns: [
    {
      item_name:'department_name',
      label: '部门名称',
      rules: [{}]
    },
    {
      item_name:'department_built',
      label: '创建时间',
      rules: [{}],
      timePicker: true
    },
    {
      item_name:'department_update',
      label: '更新时间',
      rules: [{}],
      timePicker: true
    }
  ]
}


export default searchConfig