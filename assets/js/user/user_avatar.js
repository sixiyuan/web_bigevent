$(() => {
  const layer = layui.layer

  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)


  // 文件上传
  $(`#btnChooseImage`).on(`click`, function () {
    $(`#file`).click()
  })


  // 拿到用户选择的文件
  $(`#file`).on(`change`, function (e) {
    console.log(e.target)  // input 元素
    const filelist = e.target.files

    if (filelist.length === 0) return layer.msg(`请选择文件！`)

    // 1. 拿到用户选择的文件
    const file = e.target.files[0]
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })


  // 更新用户裁剪过的头像
  $(`#btnUpload`).on(`click`, function () {
    // 拿到用户裁剪过的头像
    var dataURL = $image.cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    }).toDataURL('image/png')

    // 上传发送接口
    $.ajax({
      type: "POST",
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        const { status, message } = res

        if (status !== 0) return layer.msg(`${message}`)

        layer.msg(`${message}`)
        // 调用父系方法重新渲染
        window.parent.getData()
      }
    });

  })
})