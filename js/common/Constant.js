'use strict';

var Constant = {};

Constant.baseUrl = 'http://api.j1st.io:8080';

Constant.LOGIN = Constant.baseUrl + "/user/token"; //登录

Constant.PRODUCTS = Constant.baseUrl + "/user/products"; //获取用户名下的所有product 信息

Constant.AGENTS = (productId) => Constant.baseUrl + "/user/products/" + productId + "/agents";

export default Constant;