import React from "react" 
import Axios from "../../axios"
import "./index.less"
import { Card,Form,Select,Button,Table,Modal} from 'antd'
import OpenCityModal from "./OpenCityModal.jsx"
import {pagination} from "../../utils"

const FormItem = Form.Item;
const {Option} = Select;
export default class City extends React.Component{
    state = {
            dataSource:null,
            ModalShow:false,
        }
    params = {page:1}
    

    async componentDidMount(){
        this.requestCityData()
    }
    // 请求数据
    requestCityData = async function(){
        let self = this 
        let cityData = await Axios.getCityData({url:'city/list',params:this.params})
        // console.log(cityData)
        cityData.item_list.map((item,index)=>{return item.key = item.id})
        
        this.setState({
            dataSource:cityData.item_list,
            pagination:pagination(cityData,(size)=>{
                self.params.page = size 
                self.requestCityData() 
            })
        })
    }

    // 开通城市
    openCity = ()=>{
        this.setState({
            ModalShow:true
        })
    }
    onOk = async ()=>{
        let value
        this.cityForm.props.form.validateFields((err,fieldsValue) => {
            if(err){
                return 
            }else{
                value = fieldsValue 
            }
        })
        this.setState({ModalShow:false})
        this.cityForm.props.form.resetFields() // 重置
        await Axios.openCity({url:"/openCity",params:value}) //提交数据
        
    }
    onCancel = ()=>{    
        this.setState({ModalShow:false})
    }        
    render(){
        const columns = [{
            title:"城市ID",
            dataIndex:'id'
        },{
            title:"城市",        
            dataIndex:"name"
        },{
            title:"用车模式",
            dataIndex:"car_mode",
            render(car_mode){
                return car_mode === 1?'停车点':'禁停区'
            }
        },{
            title:"营运模式",
            dataIndex:"op_mode",
            render(op_mode){
                return op_mode === 1?'自营':'加盟' 
            }
        },{
            title:"授权加盟商",
            dataIndex:"franchisee_name"
        },{
            title:"城市管理员",
            dataIndex:"city_admins",
            render(arr){
                return arr.map((item)=>{
                    return item.user_name;
                }).join(',');
                // ['a','b'].join(',')
            }
        },{
            title:"城市开通时间",
            dataIndex:'open_time'
        },{
            title:"操作时间",
            dataIndex:"update_time",
        },{
            title:"操作人",
            dataIndex:'sys_user_name'
        }]
        return (
            <div className="CityWrapper">
                <Card>
                    <FormField />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openCity}>开通城市</Button>
                </Card>
                <div>
                    <Table 
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={this.state.pagination}
                    />
                </div>
                <Modal
                title="开通城市"
                visible={this.state.ModalShow}
                onOk={this.onOk}
                onCancel={this.onCancel}
                >
                    <OpenCityModal wrappedComponentRef={(inst)=>{this.cityForm = inst}}/>
                </Modal>
            </div>
        )
    }
}


class FormField extends React.Component{
    // 查询功能
    handleFilter = ()=>{
        this.props.form.validateFields((err,fieldsValue) => {
            if(err){
                return 
            }else{
                console.log(fieldsValue)
            }
        })
    }
    // 重置功能
    resetFilter = ()=>{
        this.props.form.resetFields()
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="inline" >
                <FormItem label="城市" >
                    {getFieldDecorator('city_id')(
                        <Select placeholder="全部" style={{width:100}}>
                            <Option value="0">全部</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">上海市</Option>
                            <Option value="3">广州市</Option>
                            <Option value="4"> 深圳市</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="用车模式" >
                    {getFieldDecorator('car_mode')(
                        <Select placeholder="全部" style={{width:130}}>
                            <Option value="0">全部</Option>
                            <Option value="1">指定停车模式</Option>
                            <Option value="2">禁停区模式</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="营运模式" >
                    {getFieldDecorator('op_mode')(
                        <Select placeholder="自营" style={{width:80}}>
                            <Option value="0">自营</Option>
                            <Option value="1">加盟</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="加盟商授权状态" >
                    {getFieldDecorator('auth_mode')(
                        <Select placeholder="已授权" 
                        style={{width:100}}>
                            <Option value="0">已授权</Option>
                            <Option value="1">未授权</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={
                        this.handleFilter
                    }>查询</Button>
                    <Button onClick={
                        this.resetFilter
                    }>重置</Button>
                </FormItem>

            </Form>
        )
    }
}
FormField = Form.create({})(FormField)


