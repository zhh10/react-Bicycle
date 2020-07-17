import axios from 'axios'
import JsonP from 'jsonp'
import { message } from "antd"
export default class Axios {
    // 获取天气
    static async getWeather(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                if(response.status === 'success'){
                    resolve (response.results[0].weather_data[0])
                }else{
                    resolve ("暂停服务")
                }
            })
        })
    }
    // 获取城市管理
    static async getCityData(options){
        let loading = document.getElementById('loading')
        loading.style.display = 'block'
        let baseUrl = 'https://www.easy-mock.com/mock/5f0e22264f989222f243a16c/example'
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,
                params: options.params||""
            }).then(res=>{
                loading.style.display = 'none'
                if(res.status == '200'&&res.data.data.code == '0'){
                    resolve(res.data.data.result)
                }else{
                    message.error('数据请求失败了');
                }
            })
        })
    }

    // 开通城市
    static openCity(options){
        let loading = document.getElementById('loading')
        loading.style.display = 'block'
        let baseUrl = "https://www.easy-mock.com/mock/5f0e22264f989222f243a16c/example/"
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,
                params: options.params||""
            }).then(res=>{
                loading.style.display = 'none'
                if(res.status == '200' && res.data.code == '0'){
                    message.success("开通成功")
                }else{
                    message.error('数据请求失败了')
                }
            })
        })
    }

    // 订单管理数据
    static orderList(options){
        let loading = document.getElementById("loading")
        loading.style.display = 'block'
        let baseUrl = 'https://www.easy-mock.com/mock/5f0e22264f989222f243a16c/example/'
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,
                params: options.params||""
            }).then(res=>{
                loading.style.display='none'
                console.log(res)
                if(res.status == '200' && res.data.code == '0'){
                    
                    resolve(res.data.result)
                   
                }else{
                    message.error("数据请求失败")
                }
            })
        })
    }

    // 获取用户详情数据
    static getDetail(options){
        let loading = document.getElementById('loading')
        loading.style.display='block'
        let baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve,reject)=>{
                axios({
                    url:options.url,
                    method:'get',
                    baseURL:baseUrl,
                    timeout:5000,
                    params: options.params||""
                    }).then(res=>{
                        loading.style.display ='none'
                        if(res.status=='200'&&res.data.code == '0'){
                            resolve(res.data.result)
                            message.success("数据请求成功")
                        }else{
                            message.error("数据请求失败")
                        }
                    })
                    })
        }
        
    // 结束订单
    static closeOrder(options){
        let loading = document.getElementById('loading')
        loading.style.display='block'
        let baseUrl = 'https://www.easy-mock.com/mock/5f0e22264f989222f243a16c/example/';
        return new Promise((resolve,reject)=>{
                axios({
                    url:options.url,
                    method:'get',
                    baseURL:baseUrl,
                    timeout:5000,
                    params: options.params||""
                    }).then(res=>{
                        loading.style.display ='none'
                        if(res.status=='200'&&res.data.code == '0'){
                            
                            message.success("订单删除成功")
                        }else{
                            message.error("订单删除失败")
                        }
                    })
                    })
        }
    
    // 员工管理
    static getStaffData(options){
        let loading = document.getElementById('loading')
        loading.style.display='block'
        let baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,
                params: options.params||""
            }).then(res=>{
                loading.style.display = 'none'
                console.log(res)
                if(res.status == '200' && res.data.code == '0'){
                    resolve(res.data.result)
                }else{
                    message.error("数据请求失败")
                }
            })
        })
    }

    // 获取车辆管理
    static BikeList(options){
        let loading = document.getElementById('loading')
        loading.style.display='block'
        let baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,
                params: options.params||""
            }).then(res=>{
                loading.style.display='none'
                if(res.status=='200'&&res.data.code=='0'){
                    resolve(res.data.result)
                    message.success("数据请求成功")
                }else{
                    message.error("数据请求失败")
                }
            }
            )
        })
    }
}
