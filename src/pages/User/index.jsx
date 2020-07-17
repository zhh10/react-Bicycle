import React from "react"
import UserForm from "../../components/User/UserForm"
import AddUser from "../../components/User/addUser"
import EditUser from "../../components/User/editUser"

import { Card,Button,Modal,message,Table,Form} from "antd"
import Axios from "../../axios"

const FormItem = Form.Item
export default class User extends React.Component{
    state = {
        addStaffShow:false,
        deleteStaffShow:false,
        editStaffShow:false,
        detailStaffShow:false,
        staffData:[],
        selectedRowKeys:[],
        selectedItem:{},
    }
    params = {
        page:1
    }
    // 查询员工 
    queryStaff = (fieldsValue)=>{
        console.log(fieldsValue)
    }
    // 创建员工函数
    addStaffCallback = ()=>{
        let value 
        this.addStaff.props.form.validateFields((err,fieldsValue)=>{
            if(err){
                message.error("发生未知错误")
            }else{
                value = fieldsValue
            }
        })
        message.success("创建成功")
        this.setState({addStaffShow:false})
        this.addStaff.props.form.resetFields() 
    }
    // 员工详情
    detailStaffCallback = ()=>{
        if(Object.keys(this.state.selectedItem).length==0){
            message.error("请选择一名员工")
        }else{
            this.setState({
                detailStaffShow:true
            })
        }
    }

    // 删除员工
    deleteStaffCallback = ()=>{
        if(Object.keys(this.state.selectedItem).length==0){
            message.error("请选择一名员工")
        }else{
            this.setState({
                deleteStaffShow:true
            })
        }
    }

    // 编辑员工
    editStaffCallback=()=>{
        if(Object.keys(this.state.selectedItem).length==0){
            message.error("请选择一名员工")
        }else{
            this.setState({
                editStaffShow:true
            })
        }
    }

    componentDidMount(){
        this.requestData()
    }

    async requestData(){
        const staffData = await Axios.getStaffData({url:'/user/list',params:this.params})
        staffData.item_list.map((item,index)=>{
            return item.key = item.id
        })
        this.setState({
            staffData:staffData.item_list
        })
    }

    render(){
        const columns = [{
            title:'id',
            dataIndex:'id',
            key:'id'
        },{
            title:"用户名",
            dataIndex:'username',
            key:"username"
        },{
            title:"性别",
            dataIndex:'sex',
            render(sex){
                return sex==1?'男':'女'
            }
        },{
            title:"状态",
            dataIndex:'state',
            render(state){
                return {
                    '1':'终身会员',
                    '2':'季度会员',
                    '3':'新人用户',
                    '4':'普通用户',
                    '5':'欠费用户'
                }[state]
            }
        },{
            title:'生日',
            dataIndex:'birthday'
        },{
            title:'联系地址',
            dataIndex:'address'
        }]

        const rowSelection = {
            type:'radio',
            selectedRowKeys:this.state.selectedRowKeys
        }

        return (
            <div>
                <Card>
                    <UserForm queryStaff={this.queryStaff}/>
                </Card>
                <Card>
                    <Button style={{margin:"0 10px"}} type="primary" icon="plus" 
                    onClick={()=>{
                        this.setState({addStaffShow:true})
                    }}>创建员工</Button>
                    <Button style={{margin:"0 10px"}} type="primary" icon="edit"
                    onClick={this.editStaffCallback}
                    >编辑员工</Button>
                    <Button style={{margin:"0 10px"}} type="primary" icon="profile"
                    onClick={this.detailStaffCallback}
                    >员工详情</Button>
                    <Button style={{margin:"0 10px"}} type="primary" icon="delete"
                    onClick={this.deleteStaffCallback}
                    >删除员工</Button>
                </Card>
                <Table
                columns={columns}
                dataSource={this.state.staffData}
                rowSelection={rowSelection}
                onRow={(record,index)=>{
                    let selectKey = [index+1]
                    return {
                        onClick:()=>{
                            this.setState({
                                selectedRowKeys:selectKey,
                                selectedItem:record
                            })
                        }
                    }
                }}
                >

                </Table>
                <Modal
                title="创建员工"
                visible={this.state.addStaffShow}
                onOk={this.addStaffCallback}
                onCancel={()=>{this.setState({addStaffShow:false});this.addStaff.props.form.resetFields()}}
                >
                    <AddUser wrappedComponentRef={(inst)=>{this.addStaff = inst}}/>
                </Modal>

                <Modal
                title="删除员工"
                visible={this.state.deleteStaffShow}
                onCancel={()=>{this.setState({deleteStaffShow:false})}}
                onOk={()=>{message.success("删除成功");this.setState({deleteStaffShow:false})}}
                >   
                    确定删除吗？
                </Modal>

                <Modal
                title="编辑员工"
                visible={this.state.editStaffShow}
                onCancel={()=>{this.setState({editStaffShow:false})}}
                onOk={()=>{message.success("修改成功");this.setState({editStaffShow:false})}}
                >   
                    <EditUser UserData={this.state.selectedItem}/>
                </Modal>
                
                <Modal
                title="员工详情"
                visible={this.state.detailStaffShow}
                onCancel={()=>{this.setState({detailStaffShow:false})}}
                footer={null}
                >
                    <Form>
                        <FormItem label="姓名">{this.state.selectedItem.username}</FormItem>
                        <FormItem label="生日">{this.state.selectedItem.birthday}</FormItem>
                        <FormItem label="性别">{this.state.selectedItem.sex=='1'?'男':"女"}</FormItem>
                        <FormItem label="地址">{this.state.selectedItem.address}</FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}