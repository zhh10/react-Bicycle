import React from "react" 
import {Row,Col} from "antd"
import {handleDate} from "../../utils" // 处理时间的函数
import Axios from "../../axios" 
import {connect} from "react-redux"
import './index.less'
import {withRouter} from "react-router-dom" 
class Headers extends React.Component{
    state = {
        localDate:null,weather:null,picture:null,
    }
    componentWillMount(){
        this.props.history.listen(function(location){
            // 在这里修改 首页名
        })
        // 每隔一秒修改时间
        setInterval(()=>{
            let localDate = handleDate(new Date())
            this.setState({localDate})
        },1000)
        this.getWeather()
    }
    async getWeather(){
        let options = {} 
        let city = "广州"
        options.url = 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        const weatherData = await Axios.getWeather(options)
        const {weather,dayPictureUrl} = weatherData
        this.setState({weather,picture:dayPictureUrl})
    }
    render(){
        return (
            <div className="headers">
                <Row className="firstHeader">
                    <Col span={24}>
                        <span>欢迎你 admin</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="secondHeader">
                    <Col span={4} className="secondHeadertitle">
                        {this.props.title}
                    </Col>
                    <Col span={20} className="secondHeaderContext">
                        <span className="date">{this.state.localDate}</span>
                        <span className="weatherImg">
                            <img src={this.state.picture} alt=""/>
                        </span>
                        <span className="weatherText">{this.state.weather}</span>
                    </Col>
                </Row>
                
            </div>
        )
    }
}
function mapStateToProp(state){
    return {title:state}
}

export default withRouter(connect(mapStateToProp)(Headers))
