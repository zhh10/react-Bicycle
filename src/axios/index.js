import axios from 'axios'
import JsonP from 'jsonp'
export default class Axios {
    static async getWeather(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                console.log(response)
                if(response.status === 'success'){
                    resolve (response.results[0].weather_data[0])
                }else{
                    resolve ("暂停服务")
                }
            })
        })
    }
}