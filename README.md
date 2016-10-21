# Fleet
a react native app about fleet

## 参考资料
* [iOS App图标和启动画面尺寸](http://www.jianshu.com/p/adpKye)
* [react native中文网文档](http://reactnative.cn/docs/0.31/getting-started.html)
* [百度地图文档](http://lbsyun.baidu.com/index.php?title=androidsdk/guide/buildproject)
* [安卓Back键的处理·基本+高级篇](http://reactnative.cn/post/480)

## 碰到的问题&对策
###ipad实机没法启动hot reloading来动态进行调试
> 在ios源码的AppDelegate.m中的jsCodeLocation改为``jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.5:8081/index.ios.bundle?platform=ios&dev=true"];``(注意ip对应自己的机子)，并且在info.list中的App Transport Security Settings下添加Allow Arbitrary Loads为YES，确保能加载http的数据

### 安卓上的场景转换特别卡
> 1.注意不要开启chrome调试 2.生成release版本，再安装到手机上，会很流畅

## 使用的第三方库
* [react-native-vector-icons(图标字体库)](https://github.com/oblador/react-native-vector-icons)
* [百度地图](http://lbsyun.baidu.com/)
* [react-native-action-button](https://github.com/mastermoo/react-native-action-button)

## 打包
### 安卓
> * 在webstorm中运行 ``react-native bundle --entry-file index.android.js --bundle-output ./android/app/src/main/assets/index.android.jsbundle --platform android --assets-dest ./android/app/src/main/res/ --dev false``
> * 在MainApplication中添加``protected String getBundleAssetName() {
			return "index.android.jsbundle";
		}``