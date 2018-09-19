/**
 * Created by lupeng on 18/5/20.
 */
//********************//
//******优惠券逻辑*****//
//*******************//

import {sequelize} from '../sql.js'

var qn = require('qn');
var rp = require('request-promise')
var moment = require('moment')
var client = qn.create({
    accessKey: 'MIn8z_veB2LIAFvJtTw5lwUQQxo2Otq8lk8w724r',
    secretKey: 'j02Smy4yGfggacjF1DE-Q5vl4Ae9pN3ovhLWP6F1',
    bucket: 'handsomebird',

});




//获取用户可领取的优惠券列表
let getUserCanUseReductionList =async(ctx,next)=>{
    //获取所有优惠活动
    let res = await (sequelize.query("select * from `reduction` where status = 1",{
        type: sequelize.QueryTypes.SELECT
    }));
    //获取用户是否领取过
    for(let i=0;i<res.length;i++){
        res[i].endDate=moment(res[i].endDate).format('YYYY-MM-DD');
        let isR = await (sequelize.query("select * from `mycut` where reduction='"+res[i].id+"' and openid='"+ctx.query.openid+"'",{
            type: sequelize.QueryTypes.SELECT
        }));
        // 如果已经领过
        if(isR.length>0){
            res[i].isR=1
        }else{
            res[i].isR=0
        }
    }

    return ctx.response.body={
        "code":0,
        "msg":res,
    }
}
//领取优惠券
let getCut =async(ctx,next)=>{
    //接受的参数
    let crb=ctx.query;
    let time = moment().format('YYYY-MM-DD HH:mm:ss')
    let res = await (sequelize.query("INSERT INTO `mycut` (`openid`,`reduction`,`status`,`getTime`) VALUES ('"+crb.openid+"','"+crb.reduction+"',0,'"+time+"')",{
        type: sequelize.QueryTypes.INSERT
    }))

    return ctx.response.body={
        "code":0,
        "msg":res,
    }
}


//用户所有优惠券列表
let getCutList =async(ctx,next)=>{
    let box=[]
    let time_now =moment().format('YYYY-MM-DD HH:mm:ss')
    //获取我的所有优惠券
    let res = await (sequelize.query("select * from `mycut` where openid = '"+ctx.query.openid+"'",{
        type: sequelize.QueryTypes.SELECT
    }));
    for(let i=0;i<res.length;i++){
        let iuy = await (sequelize.query("select * from `reduction` where id = '"+res[i].reduction+"' and endDate >'"+time_now+"'",{
            type: sequelize.QueryTypes.SELECT
        }));
        for(let i=0;i<iuy.length;i++){
            if(iuy[i].type==2){
                let result =  await (sequelize.query("select * from `foods` where id='"+iuy[i].rule+"'",{
                    type: sequelize.QueryTypes.SELECT
                }));
                iuy[i].name=result[0].name
                iuy[i].img='http://cdn.handsomebird.xin/t'+result[0].type+'-'+result[0].img+'.jpg?imageView2/2/w/144/h/144/format/png/q/75|watermark/2/text/5aWI6Iy25rC05bOw/font/5a6L5L2T/fontsize/240/fill/I0ZGRkZGRg==/dissolve/100/gravity/NorthEast/dx/5/dy/5|imageslim'
            }
        }
        console.log("changdu",iuy.length)
        if(iuy.length>0){
            iuy[0].endDate=moment(iuy[0].endDate).format('YYYY-MM-DD');
            res[i].detail= iuy[0]
            box.push(res[i])
        }else{
            res.splice(i,1)
        }
    }

    return ctx.response.body={
        "code":0,
        "msg":box,
    }
};
//使用优惠券
let  useCut= async(ctx,next)=>{
    let time = moment().format('YYYY-MM-DD HH:mm:ss')
    let res = await (sequelize.query("UPDATE  `mycut` SET `status`=1, `useTime`='"+time+"'  where id='"+ctx.query.id+"'",{
        type: sequelize.QueryTypes.UPDATE
    }))
    return ctx.response.body={
        "code":0,
        "msg":"更改成功",
        "data":res
    }
};
//后台获取所有优惠活动列表
let getAllReduction= async(ctx,next)=>{
    //获取所有优惠活动
    let res = await (sequelize.query("select * from `reduction` order by id desc",{
        type: sequelize.QueryTypes.SELECT
    }));

    for(let i=0;i<res.length;i++){
        let all = await (sequelize.query("select count(*) as count  from `mycut` where reduction='"+res[i].id+"'",{
            type: sequelize.QueryTypes.SELECT
        }))
        let use = await (sequelize.query("select count(*) as count  from `mycut` where reduction='"+res[i].id+"' and status=1",{
            type: sequelize.QueryTypes.SELECT
        }))
        res[i].all=all[0].count
        res[i].use=use[0].count
        if(res[i].type==2){
         let result =  await (sequelize.query("select * from `foods` where id='"+res[i].rule+"'",{
                type: sequelize.QueryTypes.SELECT
            }));
            res[i].rule=result[0].name
            console.log(result[0].name)
            res[i].img='http://cdn.handsomebird.xin/t'+result[0].type+'-'+result[0].img+'.jpg?imageView2/2/w/144/h/144/format/png/q/75|watermark/2/text/5aWI6Iy25rC05bOw/font/5a6L5L2T/fontsize/240/fill/I0ZGRkZGRg==/dissolve/100/gravity/NorthEast/dx/5/dy/5|imageslim'
        }
    }



    return ctx.response.body={
        "code":0,
        "msg":res,
    }
};
//添加优惠活动
let addReduction= async(ctx,next)=>{
    //接受的参数
    let crb=ctx.request.body;
    console.log(crb);
    let timeF = function (t) {
       return moment(t).format('YYYY-MM-DD HH:mm:ss')
    }


    if(crb.type==1){
        //如果是全场满减
        //检查当前是否还有未结束的满减活动
        let res = await (sequelize.query("select * from `reduction` where type='"+crb.type+"' and  status=1",{
            type: sequelize.QueryTypes.SELECT
        }));
        if(res.length>0){
            return ctx.response.body={
                "code":-2,
                "msg":"当前全场满减活动未结束，请先手动关闭上一个活动",
            }
        }else{
            let addReduction = await (sequelize.query("INSERT INTO `reduction` (`type`,`typeDes`,`rule`,`cut`,`startDate`,`endDate`,`status`,`img`) VALUES " +
                "('"+crb.type+"','"+crb.name+"','"+crb.rule+"','"+crb.cut+"','"+timeF(crb.timeRange[0])+"','"+timeF(crb.timeRange[1])+"',0,'"+crb.imageUrl+"')",{
                type: sequelize.QueryTypes.INSERT
            }))
            return ctx.response.body={
                "code":0,
                "msg":addReduction,
            }
        }
    }else{
        //如果是单品立减
        //检查当前是否还有未结束的满减活动
        let res = await (sequelize.query("select * from `reduction` where type='"+crb.type+"' and status=1",{
            type: sequelize.QueryTypes.SELECT
        }));
        if(res.length>1){
            return ctx.response.body={
                "code":-2,
                "msg":"单品满减活动请不要超过2个",
            }
        }else{
            let addReduction = await (sequelize.query("INSERT INTO `reduction` (`type`,`typeDes`,`rule`,`cut`,`startDate`,`endDate`,`status`,`img`) VALUES " +
                "('"+crb.type+"','"+crb.name+"','"+crb.rule+"','"+crb.cut+"','"+timeF(crb.timeRange[0])+"','"+timeF(crb.timeRange[1])+"',0,'"+crb.imageUrl+"')",{
                type: sequelize.QueryTypes.INSERT
            }))
            return ctx.response.body={
                "code":0,
                "msg":addReduction,
            }
        }
    }


};
//更改优惠活动状态
let opReduction= async(ctx,next)=>{
    let res = await (sequelize.query("UPDATE  `reduction` SET `status`='"+ctx.query.status+"'  where id='"+ctx.query.id+"'",{
        type: sequelize.QueryTypes.UPDATE
    }))
    return ctx.response.body={
        "code":0,
        "msg":"删除成功",
    }
};


module.exports = {
    'GET /getUserCanUseReductionList':getUserCanUseReductionList,//获取用户可领取的优惠券列表
    'GET /getCut':getCut, //领取优惠券
    'GET /getCutList':getCutList, //用户所有优惠券列表
    'GET /useCut':useCut, //使用优惠券
    'GET /getAllReduction':getAllReduction, //后台获取所有优惠活动列表
    'POST /addReduction':addReduction, //添加优惠活动
    'GET /opReduction':opReduction, //更改优惠活动状态
}