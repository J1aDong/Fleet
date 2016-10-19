# Fleet
a react native app about fleet

## 参考资料
* [iOS App图标和启动画面尺寸](http://www.jianshu.com/p/adpKye)
* [react native中文网文档](http://reactnative.cn/docs/0.31/getting-started.html)

## 碰到的问题&对策
###ipad实机没法启动hot reloading来动态进行调试
> 在ios源码的AppDelegate.m中的jsCodeLocation改为``jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.5:8081/index.ios.bundle?platform=ios&dev=true"];``(注意ip对应自己的机子)，并且在info.list中的App Transport Security Settings下添加Allow Arbitrary Loads为YES，确保能加载http的数据

## 使用的第三方库
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)