// 每次调用$.gajax()等请求时会先调用这个函数

$.ajaxPrefilter(option => {
  // 在发起ajax请求时统一路径
  option.url = 'http://www.liulongbin.top:3007' + option.url

  console.log(option.url)
})