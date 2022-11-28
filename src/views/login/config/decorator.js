let validateRulesObj = {
  //自定义校验
  phone: {
      rules: [
          {
              validator: (rule, value, cbfn) => {
                  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
                  if (!reg.test(value)) {
                      cbfn('请输入正确的手机号码')
                  }
                  cbfn()
              },
          },
      ],
  },
  email: {
      rules: [
          {
              validator: (rule, value, cbfn) => {
                  const reg =
                      /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
                  if (!reg.test(value)) {
                      cbfn('请输入正确的邮箱')
                  }
                  cbfn()
              },
          },
      ],
  },
  gphone: {
      rules: [
          {
              validator: (rule, value, cbfn) => {
                  const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/
                  if (!reg.test(value)) {
                      cbfn('请输入正确的固定电话')
                  }
                  cbfn()
              },
          },
      ],
  }
}
export default validateRulesObj