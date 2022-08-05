$(() => {
  // 去注册帐号链接
  $(`#link_reg`).on(`click`, () => {
    $(`.login-box`).hide()
    $(`.reg-box`).show()
  })


  // 去登录链接
  $(`#link_login`).on(`click`, () => {
    $(`.login-box`).show()
    $(`.reg-box`).hide()
  })


  // 导入layiu就有一个对象
  const form = layui.form
  // 导入layer对象
  const layer = layui.layer

  // 设置根路径
  // const baseUrl = 'http://www.liulongbin.top:3007'

  // 自定义表单规则
  form.verify({
    // 定义叫pwd的校验规则
    'pwd': [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    'repwd': function (value) {

      // value 拿到的是确认密码框的数据
      // 通过属性选择器还签到密码框的数据
      // 两者比较，如果不一样就return出去
      const pwd = $(`.reg-box [name=password]`).val()
      if (pwd !== value) return '两次密码输入不一致'
    }
  })

  // 注册页发起请求
  // 监听表单默认提交事件
  $(`#reg-form`).on(`submit`, e => {
    //阻止默认提交行为
    e.preventDefault()
    // 获取参数
    const data = { username: $(`.reg-box [name=username]`).val(), password: $(`.reg-box [name=password]`).val() }
    // 发起ajax请求
    $.ajax({
      type: "POST",
      url:'/api/reguser',
      data,
      success: function (res) {
        // 对象解构
        const { status, message } = res
        // 判断是否注册成功
        if (status !== 0) return layer.msg(message)
        // 注册成功
        layer.msg(`注册成功，请登录`)
        // 模拟去登录行为
        $(`#link_login`).click()
      }
    });
  })


  // 登录页发起请求
  $(`#login-form`).submit(function(e) {
    e.preventDefault()

    // 获取表单数据
    const data = $(this).serialize()

    //发起请求
    $.ajax({
      type: "POST",
      url: '/api/login',
      data,
      success: function (res) {
        const {status , message , token} = res
        if(status !== 0 ) return layer.msg(message)

        // 成功
        layer.msg(`登录成功！`)

        // 将 token 存储本地
        localStorage.setItem('token' , token)

        // 进行页面跳转
        location.href = './index.html'
      }
    });
  })



})