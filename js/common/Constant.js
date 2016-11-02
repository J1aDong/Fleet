'use strict';

var Constant = {};

//是否为稳定版
var isStable = false;

//--------------Http相关---------------------

const stableUrl = "http://api.j1st.io:8080";
const betaUrl = "http://139.196.230.150:8080";

Constant.baseUrl = isStable ? stableUrl : betaUrl;

Constant.LOGIN = Constant.baseUrl + "/user/token"; //登录

Constant.PRODUCTS = Constant.baseUrl + "/user/products"; //获取用户名下的所有product 信息

Constant.AGENTS = (productId) => Constant.baseUrl + "/user/products/" + productId + "/agents";

//--------------Http相关---------------------

//--------------Mqtt相关---------------------
Constant.MqttHost = isStable ? 'broker.j1st.io' : '139.196.230.150';
Constant.MqttPort = 1883;
//--------------Mqtt相关---------------------

export default Constant;