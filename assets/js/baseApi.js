// 每次调用$.gajax()等请求时会先调用这个函数

$.ajaxPrefilter(option => {
  // 在发起ajax请求时统一路径
  option.url = 'http://big-event-api-t.itheima.net' + option.url

  // console.log(option.url)
  // 给包含my路径的地址添加同意请求头
  // indexOf == -1 则表示不包含
  if(option.url.indexOf('/my/') !== -1) {
    option.headers = {
      Authorization : localStorage.getItem('token') || ''
    }
  }

  //不管是否获取成功都会调用complete这个回调函数
  option.complete = function(res){
    console.log(res)
    const {status,message} = res.responseJSON
    // 判断res.responJSON
    if(status === 1 && message === '身份认证失败！'){
      // 1.强制清空本地token
      localStorage.removeItem('token')
      // 2.强制跳转页面到login.html
      location.href = '/login.html'
    }
  }
})