import React from "react" 
import Axios from "../../axios"
import { Card,Form,Select,Modal,message,Button,Table} from "antd"
import OrderHeader from "../../components/order"

const FormItem = Form.item 
const {Option} = Select 
export default class Order extends React.Component{
    state = {
        selectedRowKeys:[],
        selectedItem:null,
        dataSource:[],
        ModalShow:false,
    }
    params = {
        page:1
    }
    async componentDidMount(){
        this.requestData()
    }

    // 请求数据
    requestData = async function(){
        let self = this 
        let orderData = await Axios.orderList({
            url:"order/list",
            params:this.params
        })
        orderData.item_list.map((item,index)=>{
            return item.key = item.id
        })
        console.log(orderData.item_list)
        this.setState({
            dataSource:orderData.item_list
        })
       
    }

    // 查询数据
    queryOrder(value){
        console.log(value)
    }

    // 删除订单
    closeOrder=()=>{
        if(!this.state.selectedItem){
            message.error('请选择一条订单')
        }else{
            const {order_sn} = this.state.selectedItem
            Axios.closeOrder({url:"closeOrder",params:{id:order_sn}})
        }
    }

    // 订单详情
    queryDetail=()=>{
        if(!this.state.selectedItem){
            message.error("请选择一条订单")
        }else{
            this.props.history.push("/order/detail/"+this.state.selectedItem.order_sn)
        }
    }
    render(){
        const columns = [{
            title:"订单编号",
            dataIndex:'order_sn',
            key:"order_sn"
        },{
            title:"车辆编号",
            dataIndex:"bike_sn",
            key:"bike_sn"
        },{
            title:"用户名",
            dataIndex:"user_name",
            key:"user_name"
        },{
            title:"手机号",
            dataIndex:"mobile",
            key:"mobile"
        },{
            title:"里程",
            dataIndex:"distance",
            key:"distance",
            render(distance){
                return distance/1000+"公里"
            }
        },{
            title:"状态",
            dataIndex:"status",
            key:"status"
        },{
            title:"开始时间",
            dataIndex:"start_time",
            key:"start_time"
        },{
            title:"结束时间",
            dataIndex:"end_time",
            key:"end_time"
        },{
            title:"订单金额",
            dataIndex:"total_fee",
            key:"total_fee"
        },{
            title:"实付金额",
            dataIndex:"user_pay",
            key:"user_pay"
        }]
        
        const rowSelection = {
            type:"radio",
            selectedRowKeys:this.state.selectedRowKeys
        }
        
        return (
            <div>
                <Card>
                    <OrderHeader queryOrder={this.queryOrder}/>
                </Card>
                <Card>
                    <Button style={{marginRight:20}} type="primary"
                    onClick={this.queryDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.closeOrder}>结束订单</Button>
                </Card>
                <div>
                    <Table 
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    onRow={(record,index)=>{
                        let selectKey = [index+1];
                        return {
                            onClick:()=>{
                                this.setState({
                                    selectedRowKeys:selectKey,
                                    selectedItem:record
                                })

                            }
                        }
                    }}
                    />
                </div>
                
            </div>
        )
    }
}

