# Fleet
a react native app about fleet

## 环境
> * macOS 10.12
* Android Studio 2.2.2
* WebStorm 2016.2.4
* Xcode 8.0
* react-native 0.35.0

## 安装&运行
> * 参照官网先搭建好react-native的开发环境，确保能顺利运行hello world 
* git clone
* 在根目录下命令行 npm install
* 在ios目录下命令行 pod install
* 在根目录下命令行 react-native link
* 运行ios版本 在根目录下命令行 react-native run-ios
* 运行android版本 在根目录下命令行 react-native run-android

## 参考资料
* [iOS App图标和启动画面尺寸](http://www.jianshu.com/p/adpKye)
* [react native中文网文档](http://reactnative.cn/docs/0.31/getting-started.html)
* [百度地图文档](http://lbsyun.baidu.com/index.php?title=androidsdk/guide/buildproject)
* [安卓Back键的处理·基本+高级篇](http://reactnative.cn/post/480)
* [React/React Native 的ES5 ES6写法对照表](http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8)

## 碰到的问题&对策
###ipad实机没法启动hot reloading来动态进行调试
> 在ios源码的AppDelegate.m中的jsCodeLocation改为``jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.5:8081/index.ios.bundle?platform=ios&dev=true"];``(注意ip对应自己的机子)，并且在info.list中的App Transport Security Settings下添加Allow Arbitrary Loads为YES，确保能加载http的数据

### 安卓上的场景转换特别卡
> 1.注意不要开启chrome调试 2.生成release版本，再安装到手机上，会很流畅

### 有时候提示找不到依赖的第三方包，暂时无从下手
> 参考[链接](https://github.com/facebook/react-native/issues/4968)

### mqtt库报错'MQTTClient/MQTTClient.h' file not found 
> 参考[链接](https://github.com/tuanpmt/react-native-mqtt/issues/8)

### was built for newer is version () then being is linked () 的警告
> 参考[链接](http://blog.csdn.net/liyiyismile/article/details/50434844)


## 使用的第三方库
* [react-native-vector-icons(图标字体库)](https://github.com/oblador/react-native-vector-icons)
* [百度地图](http://lbsyun.baidu.com/)
* [react-native-action-button](https://github.com/mastermoo/react-native-action-button)
* [react-native-qrcode-reader](https://github.com/lazaronixon/react-native-qrcode-reader)
* [react-native-camera](https://github.com/lwansbrough/react-native-camera)
* [react-native-root-toast](https://github.com/magicismight/react-native-root-toast)
* [react-native-drawer-layout](https://github.com/iodine/react-native-drawer-layout)
* [react-native-mqtt](https://github.com/tuanpmt/react-native-mqtt)

## 打包
### 安卓
> * 在webstorm中运行 ``react-native bundle --entry-file index.android.js --bundle-output ./android/app/src/main/assets/index.android.jsbundle --platform android --assets-dest ./android/app/src/main/res/ --dev false``
> * 在MainApplication中添加``protected String getBundleAssetName() {
			return "index.android.jsbundle";
		}``
		
### iOS
> 将`jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];`的注释打开		