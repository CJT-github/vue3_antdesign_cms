const searchConfig = {
  columns: [
    {
      item_name:'name',
      label: '部门名称',
      rules: [{}],
      placeholder: "请输入部门名称"
    },
    {
      item_name:'createAt',
      label: '创建时间',
      rules: [{}],
      timePicker: true,
      placeholder: ["开始时间","结束时间"]
    },
    {
      item_name:'updateAt',
      label: '更新时间',
      rules: [{}],
      timePicker: true,
      placeholder: ["开始时间","结束时间"]
    }
  ]
}


export default searchConfig