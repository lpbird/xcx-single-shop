/**
 * Created by lupeng on 18/5/5.
 */

import {sequelize} from '../sql.js'




//获取菜品列表
let getfoodList =async(ctx,next)=>{
    let meun = await (sequelize.query("select * from menu",{
        type: sequelize.QueryTypes.SELECT
    }))
    let list =[]

    for(let i=0;i<meun.length;i++){
        let item ={}
        item.name=meun[i].type
        item.foods = await (sequelize.query("select * from foods where type='"+meun[i].id+"' and status =1",{
            type: sequelize.QueryTypes.SELECT
        }));
        item.foods.forEach(item=>{
            console.log(item)
            if(!item.size){
                item.size=[{
                    "specs":"常规",
                    "packing_fee":1,
                    "price":0
                }]
            }else{
                item.size=JSON.parse(item.size)
                if(item.size.length===0){
                    item.size=[{
                        "specs":"常规",
                        "packing_fee":1,
                        "price":0
                    }]
                }
            }
            if(!item.tem){
                item.tem=[{
                    "specs":"常规",
                    "packing_fee":0,
                    "price":0
                }]
            }else{
                item.tem=JSON.parse(item.tem)
                if(item.tem.length===0){
                    item.tem=[{
                        "specs":"常规",
                        "packing_fee":0,
                        "price":0
                    }]
                }
            }
        });
        list.push(item)

    }
    return ctx.response.body={
        "code":0,
        "data":list,
    }
}

//获取营业时间

let getShopTime =async(ctx,next)=>{
    let meun = await (sequelize.query("select * from shoptime where id = 1",{
        type: sequelize.QueryTypes.SELECT
    }))
    let list =[];
    let openTime=9;
    let closeTime=22;
    if(meun.length>0){
        openTime=meun[0].open
        closeTime = meun[0].close
    }
    return ctx.response.body={
        "code":0,
        "data":{
            "openTime":openTime,
            "closeTime":closeTime
        },
    }
};

//后台更改营业时间
let updateShopTime=async(ctx,next)=>{
    let res = await (sequelize.query("UPDATE  `shoptime` SET `open`='"+ctx.query.open+"' , `close`='"+ctx.query.close+"'  WHERE `id` = 1",{
        type: sequelize.QueryTypes.UPDATE
    }))
    return ctx.response.body={
        "code":0,
    }
}


module.exports = {
    'GET /getfoodList':getfoodList,
    'GET /getShopTime':getShopTime,
    'GET /updateShopTime':updateShopTime,
};