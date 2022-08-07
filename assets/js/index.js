$(() => {
  // 调用数据
  getData()

  const layer = layui.layer
  // 退出功能
  $(`#btnLoginout`).on(`click` , function() {
    // 退出询问
    layer.confirm('确定退出？', {icon: 3, title:'提示'}, function(index){
      //do something
      // 1.清空本地存储的token
      localStorage.removeItem('token')
      // 2.跳转到登录页面
      location.href = './login.html'
      
      layer.close(index);
    });
  })


})
  // 封装获取用户基本信息函数
  function getData(){
    // 发起ajax请求
    $.ajax({
      type: "GET",
      url: '/my/userinfo',
      // 设置请求头部信息
      // headers:{
      //   Authorization : localStorage.getItem('token') || ''
      // } ,
      success: function (res) {
        // console.log(res)

        // 解构对象
        const {status , data} =res

        if(status !== 0 ) return layui.layer.msg(`获取用户信息失败！`)

        // 渲染头像函数
        renderAvatar(data)
      },
      
    });

    function renderAvatar(data){
      // 用户有昵称先出现昵称，没有就出现a
      const name = data.nickname ? data.nickname : data.username

      $(`.welcome`).html(`欢迎&nbsp;&nbsp;${name}`)

      // 头像图片
      if(data.user_pic !== null) {
        $('.layui-nav-img').attr('src' ,data.user_pic).show()
        $(`.text-avatar`).hide()
      } else {
        const first = name[0]
        $(`.text-avatar`).html(first).show()
        $('.layui-nav-img').hide()
      }
    }
  }











