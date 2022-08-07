$(() => {
  const form = layui.form
  const layer = layui.layer

  form.verify({
    nickname:function(value){
      if(value.length > 6) return '昵称长度必须在1~6个字符之间！'
    }
  })



  userInfo()
  // 初始化用户的基本信息
  function userInfo(){
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        // 解构对象
        const {status , message ,data} = res
        if(status != 0) return layer.msg(`${message}`)
        
        // 调用form.val()快速微表单赋值
        form.val('userInfo', data)
      }
    });
  }


  // 重置用户表单信息
  $(`#btnReset`).on(`click` , function(e){
    // 阻止表单默认重置行为
    e.preventDefault()
    // 再次获取数据
    userInfo()
  })


  // 修改用户信息
  // 监听表单提交事件
  $(`.layui-form`).on(`submit` , function(e){
    // 阻止表单默认提交事件
    e.preventDefault()

    // 发送ajax请求
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        const {status , message} = res
        if(status !== 0) return layer.msg(`${message}`)
        // 请求成功
        layer.msg(`${message}`)
        // 调用父系的方法，重新渲染用户头像和信息
        window.parent.getData()

      }
    });
  })











})