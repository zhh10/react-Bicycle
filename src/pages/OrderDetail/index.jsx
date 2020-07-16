import React from "react" 
import './index.less'
import {Row,Card} from "antd"
import Axios from "../../axios"
import DetailHeader from "../../components/DetailHeader"
export default class OrderDetail extends  React.Component{
    state = {
        DetailData:{},
    }

    async componentDidMount(){
        const id = this.props.match.params.id 
        const DetailData = await Axios.getDetail({url:"/order/detail",params:{id:id}})
        this.setState({
            DetailData:DetailData,
        })
        this.renderMap(DetailData)
    }

    //renderMap 渲染地图
    renderMap = (DetailData)=>{
       this.map = new window.BMap.Map("orderDetailMap")
        // 创建地图实例
       // 调用地图控件
       this.addMapControl() 
       // 调用路线图绘制方法
       this.drawBikeRoute(DetailData.position_list)
       // 调用服务区绘制方法
       this.drawServiceArea(DetailData.area)

    }

    // 添加地图控件 addMapControl
    addMapControl = ()=>{
        let map = this.map 
        // 添加比例尺控件
        map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}))
        map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}))
    }

    // 绘制用户的行驶路线 drawBikeRoute 
    drawBikeRoute = (positionList)=>{
        let startPoint = ''
        let endPoint = ''
        if(positionList.length>2){
            let first = positionList[0];
            let last = positionList[positionList.length - 1]
            startPoint = new window.BMap.Point(first.lon,first.lat);
            let startIcon=new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor:new window.BMap.Size(18,42)
            })

            let startMarker = new window.BMap.Marker(startPoint,{icon:startIcon})
            this.map.addOverlay(startMarker)

            endPoint = new window.BMap.Point(last.lon,last.lat)
            let endIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor:new window.BMap.Size(18,42)
            })
            let endMarker = new window.BMap.Marker(endPoint,{icon:endIcon})
            this.map.addOverlay(endMarker)

            let trackPoint = [];
            for(let i=0;i<positionList.length;i++){
                let point = positionList[i] 
                trackPoint.push(new window.BMap.Point(point.lon,point.lat))
            }

            // 连接路线图
            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:'#1869ad',
                strokeWeight:3,
                strokeOpacity:1
            })

            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint,11);

        }
    }

    // 绘制服务区 drawServiceArea
    drawServiceArea = (positionList)=>{
        // 连接路线图
        let trackPoint = [];
        for(let i = 0;i<positionList.length;i++){
            let point = positionList[i]
            trackPoint.push(new window.BMap.Point(point.lon,point.lat))
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint,{
            strokeColor:"#ce0000",
            strokeWeight:4,
            strokeOpacity:1,
            fillColor:'#ff8605',
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon)
    }


    render(){
        console.log(this.state.DetailData)
        return (
            <div id="orderDetail">
                <Row>
                    <DetailHeader />
                </Row>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                </Card>
                <Card>
                    <h3>基础信息</h3>
                    <ul>
                        <li>
                            <div className="itemTitle">用车模式</div>
                            <div>{this.state.DetailData.mode === 1?'指定停车点模式':'禁停区模式'}</div>
                        </li>
                        <li>
                            <div className="itemTitle">订单编号</div>
                            <div>{this.state.DetailData.order_sn}</div>
                        </li>
                        <li>
                            <div className="itemTitle">车辆编号</div>
                            <div>{this.state.DetailData.bike_sn}</div>
                        </li>
                        <li>
                            <div className="itemTitle">手机号码</div>
                            <div>{this.state.DetailData.mobile}</div>
                        </li>
                        <li>
                            <div className="itemTitle">用户姓名</div>
                            <div>{this.state.DetailData.user_name}</div>
                        </li>
                    </ul>
                </Card>
                <Card>
                    <h3>行驶轨迹</h3>
                    <ul>
                        <li>
                            <div className="itemTitle">行程起点</div>
                            <div>{this.state.DetailData.start_location}</div>
                        </li>
                        <li>
                            <div className="itemTitle">行程终点</div>
                            <div>{this.state.DetailData.end_location}</div>
                        </li>
                        <li>
                            <div className="itemTitle">行程里数</div>
                            <div>{this.state.DetailData.distance/1000}公里</div>
                        </li>
                    </ul>
                </Card>
            </div>
        )
    }
}