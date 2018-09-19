import {sequelize} from '../sql.js'
import moment from 'moment'

//获取用户总量
let getUseAllCount =async(ctx,next)=>{
    let res = await (sequelize.query("select count(*) as count  from user",{
        type: sequelize.QueryTypes.SELECT
    }))

    return ctx.response.body={
        "code":0,
        "count":res[0].count,
    }
}

//获取用户某日总量
let getUserDayCount =async(ctx,next)=>{
    let day = ctx.params.day
    let dayBegin = moment(day).format('YYYY-MM-DD 00:00:00');
    let dayEnd = moment(day).format('YYYY-MM-DD 23:59:59');
    let res = await (sequelize.query("select count(*) as count  from user where  create_time BETWEEN '"+dayBegin+"' AND '"+dayEnd+"' ",{
        type: sequelize.QueryTypes.SELECT
    }))

    return ctx.response.body={
        "code":0,
        "count":res[0].count,
    }
}

//获取到店订单总量
let getorderAllCount =async(ctx,next)=>{
    let res = await (sequelize.query("select count(*) as count  from `order` where model=0",{
        type: sequelize.QueryTypes.SELECT
    }))

    return ctx.response.body={
        "code":0,
        "count":res[0].count,
    }
}

//获取到店订单某日总量
let getorderDayCount =async(ctx,next)=>{
    let day = ctx.params.day
    let dayBegin = moment(day).format('YYYY-MM-DD 00:00:00');
    let dayEnd = moment(day).format('YYYY-MM-DD 23:59:59');
    let res = await (sequelize.query("select count(*) as count  from `order`  where  model =0 AND time BETWEEN '"+dayBegin+"' AND '"+dayEnd+"' ",{
        type: sequelize.QueryTypes.SELECT
    }))

    return ctx.response.body={
        "code":0,
        "count":res[0].count,
    }
}

//获取预约订单总量
let getAppointAllCount =async(ctx,next)=>{
    let res = await (sequelize.query("select count(*) as count  from `order` where model=1",{
        type: sequelize.QueryTypes.SELECT
    }))

    return ctx.response.body={
        "code":0,
        "count":res[0].count,
    }
}

//获取预约订单某日总量
let getAppointDayCount =async(ctx,next)=>{
    let day = ctx.params.day
    let dayBegin = moment(day).format('YYYY-MM-DD 00:00:00');
    let dayEnd = moment(day).format('YYYY-MM-DD 23:59:59');
    let res = await (sequelize.query("select count(*) as count  from `order` where model =1  AND  time BETWEEN '"+dayBegin+"' AND '"+dayEnd+"' ",{
        type: sequelize.QueryTypes.SELECT
    }))

    return ctx.response.body={
        "code":0,
        "count":res[0].count,
    }
}

module.exports = {
    'GET /v1/users/count':getUseAllCount,//获取用户总量
    'GET /statis/user/:day/count':getUserDayCount, //获取用户某日总量
    'GET /v1/order/count':getorderAllCount,//获取订单总量
    'GET /statis/order/:day/count':getorderDayCount, //获取订单某日总量
    'GET /v1/appoint/count':getAppointAllCount,//获取预约总量
    'GET /statis/appoint/:day/count':getAppointDayCount, //获取预约某日总量
}