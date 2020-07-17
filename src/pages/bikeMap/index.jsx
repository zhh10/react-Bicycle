import React from "react" 
import Axios from "../../axios" 
import {Card,message} from "antd"
import BikeForm from "../../components/BikeMap"

export default class BikeMap extends React.Component{
    state = {};
    async componentDidMount(){
        const bikeData = await this.requestList()
        
        this.renderMap(bikeData)
    }

    requestList = async ()=>{
        const bikeData = await Axios.BikeList({
            url:'/map/bike_list'
        })
        console.log(bikeData)
        this.setState({
            bikeCount:bikeData.total_count
        })
        return bikeData 
    }
    // 查询数据
    queryBike(value){
        message.success("数据查询成功")
    }

    renderMap = (res)=>{
        let list = res.route_list;
        console.log(list)
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length-1].split(',');
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint,11);

        // let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
        //     imageSize:new window.BMap.Size(36,42),
        //     anchor: new window.BMap.Size(18, 42)
        // })
        // let bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon})
        // this.map.addOverlay(bikeMarkerStart);
        // let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
        //     imageSize: new window.BMap.Size(36, 42),
        //     anchor: new window.BMap.Size(18,42)
        // })
        // let bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon })
        // this.map.addOverlay(bikeMarkerEnd);

        // //绘制车辆行驶路线
        // let routeList = [];
        // list.forEach((item)=>{
        //     let p = item.split(',');
        //     routeList.push(new window.BMap.Point(p[0],p[1]))
        // })

        // let polyLine = new window.BMap.Polyline(routeList,{
        //     strokeColor:'#ef4136',
        //     strokeWeight:2,
        //     strokeOpacity:1
        // })
        // this.map.addOverlay(polyLine);

        //绘制服务区
        let servicePointList = [];
        let serviceList = res.service_list;
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat))
        })
        let polyServiceLine = new window.BMap.Polyline(servicePointList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyServiceLine);

        // 添加地图中的自行车图标
        let bikeList = res.bike_list;
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })
        bikeList.forEach((item)=>{
            let p = item.split(',');
            let point = new window.BMap.Point(p[0],p[1]);
            let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon})
            this.map.addOverlay(bikeMarker);
        })
    }

    render(){
        return (
            <div>
                <Card>
                    <BikeForm queryBike={this.queryBike}/>
                </Card>
                <Card style={{marginTio:10}}>
                    <div>共{this.state.bikeCount}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}