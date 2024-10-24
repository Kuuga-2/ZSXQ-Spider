function setupREM() {

  function fontFlex(min, max, mid) {
    let size = window.innerWidth / mid
    if (size < min) {
      size = min
    }
    if (size > max) {
      size = max
    }
    document.documentElement.style.fontSize = size + 'px'
  }

  fontFlex(10, 20, 50)
  // window.addEventListener('resize', () => fontFlex(10, 20, 50));
}

setupREM();

// -------SDK--------
/**
 * 知识星球 APP JS SDK V1.0
 *
 * 对应交互协议 API 版本: v1.10.41
 *
 * 前端外部通过 zsxq_js.xxx(...) 访问 APP 提供的接口
 *
 * 接口列表:
 *     (0) zsxq_js.checkJsApi(funcName);
 *     (1) zsxq_js.showToast(text);
 *     (2) zsxq_js.closeWindow();
 *     (3) zsxq_js.previewImage(data_obj);
 *     (4) zsxq_js.updateWeChatMessageShareData(data_obj);
 *     (5) zsxq_js.updateWeChatTimelineShareData(data_obj);
 *     (6) zsxq_js.giveupParseBookTitle(data_obj);
 *     (7) zsxq_js.setWebView(data_obj);
 */
;(function(__global) {
  /**
   * 检查是否有注册交互接口对象, 该函数只供内部使用。
   *
   * APP 在 WebView 浏览器中注册一个名称为 "__zsxq_js" 的全局 JS 对象,
   * 即把 __zsxq_js 注册为浏览器 window 对象的一个属性。
   *
   * WebView 注册接口示例(Android): mWebView.addJavascriptInterface(mApiObj, "__zsxq_js");
   *
   * 在浏览器环境中, 此函数的 __global 参数值即为 window 对象, APP 注册完后将有对象: __global.__zsxq_js
   *
   * JS对象(__zsxq_js) 与 APP对象(mApiObj) 相映射, 两个对象中添加名称和参数列表均相同的方法,
   * 以实现 JS 调用 APP, 即: zsxq_js.xxx(...) -> mApiObj.xxx(...)
   *
   * @namespace __global.__zsxq_js
   */
  const __checkAppXqInterface = function() {
    if (typeof __global.__zsxq_js === 'undefined') {
      // console.log("__zsxq_js  undefined");
      return false
    }
    return true
  }

  /**
   * 外部调用使用的对象: zsxq_js
   * 外部通过 zsxq_js.xxx(...) 访问 APP 提供的接口
   */
  __global.zsxq_js = {
    /**
     * 0. 校验 APP 提供的指定 API 是否可用, 可用返回 true, 不可用返回 false
     *
     *    外部使用接口前, 须通过该函数判断接口是否存在, 即判断是否是 APP 内置浏览器环境 或 当前版本 APP 是否已实现该接口
     *
     *    PS: 该接口 APP 不需要实现
     *
     * 示例:
     *     zsxq_js.checkJsApi("showToast");
     */
    checkJsApi: function(funcName) {
      if (!__checkAppXqInterface()) {
        return false
      }
      // 该接口 APP 不需要实现
      return typeof __global.__zsxq_js[funcName] !== 'undefined'
    },

    /**
     * 1. 显示 Toast
     *
     *    该接口主要用于测试 APP 和 WebView 能否正常交互（WebView 传递数据到 APP）
     *
     * 示例:
     *     zsxq_js.showToast("Hello");
     */
    showToast: function(text) {
      if (!__checkAppXqInterface()) {
        return
      }
      // APP: mApiObj.showToast(String text);
      __global.__zsxq_js.showToast('' + text)
    },

    /**
     * 2. 关闭当前网页窗口接口
     *
     * 示例:
     *     zsxq_js.closeWindow();
     */
    closeWindow: function() {
      if (!__checkAppXqInterface()) {
        return
      }
      // APP: mApiObj.closeWindow();
      __global.__zsxq_js.closeWindow()
    },

    /**
     * 3. 调用 APP 的预览图片
     *
     * 示例:
     *     zsxq_js.previewImage({
     *         current: '',         // 当前显示图片的http链接
     *         urls: []             // 需要预览的图片http链接列表
     *     });
     */
    previewImage: function(data_obj) {
      if (!data_obj || !__checkAppXqInterface()) {
        return
      }
      // APP: mApiObj.previewImage(String current, String[] urls);
      __global.__zsxq_js.previewImage(data_obj.current, data_obj.urls)
    },

    /**
     * 4. 设置分享到 微信好友 的数据
     *
     *    PS: 在 Native 端保存该数据 和 对应的当前页面的 URL,
     *        Native 分享时需判断当前页面的 URL 与之前保存
     *        数据时的 URL 是否相同。
     *
     * 示例:
     *     zsxq_js.updateWeChatMessageShareData({
     *         title: '',           // 分享标题
     *         desc: '',            // 分享描述
     *         link: '',            // 分享链接, 该链接域名必须与当前页面域名的顶级域名名称相同
     *         imgUrl: '',          // 分享图标
     *     });
     */
    updateWeChatMessageShareData: function(data_obj) {
      if (!data_obj || !__checkAppXqInterface()) {
        return
      }
      // APP: mApiObj.updateWeChatMessageShareData(String title, String desc, String link, String imgUrl);
      __global.__zsxq_js.updateWeChatMessageShareData(
        data_obj.title,
        data_obj.desc,
        data_obj.link,
        data_obj.imgUrl
      )
    },

    /**
     * 5. 设置分享到 微信朋友圈 的数据
     *
     *    PS: 在 Native 端保存该数据 和 对应的当前页面的 URL,
     *        Native 分享时需判断当前页面的 URL 与之前保存
     *        数据时的 URL 是否相同。
     *
     * 示例:
     *     zsxq_js.updateWeChatTimelineShareData({
     *         title: '',           // 分享标题
     *         link: '',            // 分享链接, 该链接域名必须与当前页面域名的顶级域名名称相同
     *         imgUrl: '',          // 分享图标
     *     });
     */
    updateWeChatTimelineShareData: function(data_obj) {
      if (!data_obj || !__checkAppXqInterface()) {
        return
      }
      // APP: mApiObj.updateWeChatTimelineShareData(String title, String link, String imgUrl);
      __global.__zsxq_js.updateWeChatTimelineShareData(
        data_obj.title,
        data_obj.link,
        data_obj.imgUrl
      )
    },

    /**
     * 6. 放弃匹配图书标题
     *
     * 示例:
     *     zsxq_js.giveupParseBookTitle({
     *         topic_id: 12345678,
     *         title: '图书标题'
     *     });
     */
    giveupParseBookTitle: function(data_obj) {
      if (!data_obj || !__checkAppXqInterface()) {
        return
      }
      // APP: mApiObj.giveupParseBookTitle(long topicId, String title);
      __global.__zsxq_js.giveupParseBookTitle(data_obj.topic_id, data_obj.title)
    },
    /**
     * 6. 设置 WebView, 目前仅支持设置高度 height
     *
     * 示例:
     *     zsxq_js.updateWebViewHeight({
     *        height: 300
     *     });
     */
    updateWebViewHeight: function(data_obj) {
      if (!data_obj || !__checkAppXqInterface()) {
        return
      }
      __global.__zsxq_js.updateWebViewHeight(data_obj.height)
    }
  }
})(typeof window !== 'undefined' ? window : this)