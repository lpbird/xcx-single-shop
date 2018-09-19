# xcx-single-shop
全栈点餐小程序(单店版，包含支付，后台)
## 写在前面
本项目是微信点餐类小程序全栈代码(包含支付，实时通知，打印等逻辑)，后端使用koa2 数据库mysql 仅做交流学习使用
## 项目效果
<div>
  <img src="https://github.com/lpbird/xcx-single-shop/raw/master/screenshot/WechatIMG36.jpeg" width="150" height="300" alt="首页"/>
  <img src="https://github.com/lpbird/xcx-single-shop/raw/master/screenshot/WechatIMG38.jpeg" width="150" height="300" alt="列表"/>
  <img src="https://github.com/lpbird/xcx-single-shop/raw/master/screenshot/wechatIMG39.jpg" width="150" height="300" alt="结算"/>
  <img src="https://github.com/lpbird/xcx-single-shop/raw/master/screenshot/WechatIMG50.jpeg" width="150" height="300" alt="订单详情"/>
  <img src="https://github.com/lpbird/xcx-single-shop/raw/master/screenshot/WechatIMG52.jpeg" width="150" height="300" alt="订单列表"/>
</div>
<div>更多预览图片请前往本项目screenshot目录下查看</div>
## 项目配置与说明
1.配置后端配置文件（如是个人小程序则无法使用支付功能）
 1）server/config/wxConfig.js  此文件中填入appid appsecert Mch_id(商户id) Mch_key(商户key) 并将controllers目录下的wx_pay 下的三个证书换成自己的（微信支付平台证书下载）
 2）七牛云（暂时不开源后台关系，也可不配置，后期会陆续上传） 由于后台管理中需要对商品进行管理 用到了图片上传接口，这边使用的是七牛云的文件平台，配置了cdn与水印 大家自己申请账号后（免费的）在server/controller/index.js 下配置
 3）mysql 数据库 server/sql.js 中进行数据库配置 创建 名为rest的数据库后倒入本项目中的 rest.sql（数据库结构＋测试数据） 可直接本地测试
2.小程序端配置
小程序端根目录下的app.js下 apiHost 为所有接口baseUrl统一配置  
## 回答大家私信最多的问题：无服务器，如何手机预览本项目？
1.进入server 目录 执行以下命令：
 npm i 
 node app.js 
 成功启动本地服务（先确保mysql数据库服务成功启动）
2.手机开启热点 电脑端连接  查看电脑端ip 将小程序的apiHost替换成http://+电脑ip+:7002  
此时即可手机预览小程序

希望大家随手star下哈～ 后面会把后台管理端也放上来
微信交流群：<img src="https://github.com/lpbird/xcx-single-shop/raw/master/screenshot/IMG_1739.JPG" width="150" height="300" alt="订单列表"/>

