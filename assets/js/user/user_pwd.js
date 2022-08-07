$(() => {

  const form = layui.form
  const layer = layui.layer 

  // 表单校验
  form.verify({
    pwd:[ /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      // value获取的是新密码框的内容
      if(value === $(`[name=oldPwd]`).val()) return '新旧密码不能一样！'
    },
    rePwd:function(value) {
      // value获取的是再次确认密码框的内容
      if(value !== $(`[name=newPwd]`).val()) return '两次密码不一致！'
    }

  })


  // 发送密码重置请求
  $(`.layui-form`).on(`submit` , function(e){
    e.preventDefault()

    // 发起请求
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        const {status,message} = res
        if(status !== 0) return layer.msg(`${message}`)

        layer.msg(`${message}`)

        // 重置表单 -- 原生方法
        $(`.layui-form`)[0].reset()
      }
    });
  })


})